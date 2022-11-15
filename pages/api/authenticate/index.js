const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'ThisIsVerySecretive2022';

const saltRounds = 10;

function authenticateUser(userId, password, hash, callback) {
  bcrypt.compare(password, hash, callback);
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    //login

    const userId = req.body.login
    const password = req.body.password

    // const dbPath=path.join(__dirname, '../../../salary.db');
    const dbPath = './data/salary.db'
    const db = new sqlite3.Database(dbPath)

    const sql = "SELECT id, password FROM user where id = ?"

    db.all(sql, [userId], (err, row) => {
        if (err) {
            res.status(500).json({error: true, message: 'Cannot locate user'});
            return;
          }

          if (row.length === 0) {
            res.status(404).json({error: true, message: 'User not found'});
            return;
          } else {

            authenticateUser(userId, password, row[0].password, function(err, success) {
            
              if (err) {
                res.status(500).json({error: true, message: 'User Authentication Failed'});
              }
              
              if (success) {

                const token = jwt.sign(
                    {userId: row[0].id},
                    jwtSecret,
                    {
                    expiresIn: 3000, //50 minutes
                    },
                );

                res.status(200).json({token});

                return;

              } else {
                  res.status(401).json({error: true, message: 'User Authentication Failed'});
                  return;
              }
          });
          }
    })

  } else {
    // Handle any other HTTP method
    res.statusCode = 401;
    res.end();
  }
};
