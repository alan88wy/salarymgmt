const sqlite3 = require('sqlite3').verbose();
const assert = require('assert');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = 'ThisIsVerySecretive2022';

export default function handler(req, res) {

    // const dbPath=path.join(__dirname, '../../../salary.db');
    const dbPath = './data/salary.db'
    const db = new sqlite3.Database(dbPath)
    const saltRounds = 10

    if (req.method === 'GET') {

        const sql =  `SELECT id from user`
    
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err
            }
    
            res.status(200).json(rows)
        })
       

        
    } else if (req.method === 'POST') {
        const user = req.body

        try {
            assert.notEqual(null, user.login, 'User id is required');
            assert.notEqual(null, user.password, 'Password is required');
        } catch (bodyError) {
            res.status(403).json({error: true, message: bodyError.message});
            return
        }

        const sql = `SELECT id, password from user where id = ?`

        db.all(sql, [user.login], (err, rows) => {
            if (err) {
                throw err
            }

            if (rows.length > 0) {
                res.status(403).json({error: true, message: "Cannot create user. User already exists!"})
                return
            } else {
                bcrypt.hash(user.password, saltRounds, function(err, hash) {
                    const sql = `INSERT INTO user (id, password) values (?, ?)`
                    const db = new sqlite3.Database(dbPath)

                    db.run(sql, [user.login, hash], (err) => {
                        if (err) {
                            throw err
                        }

                        const token = jwt.sign (
                            {userId: user.login},
                            jwtSecret,
                            {
                              expiresIn: 3000, //50 minutes
                            },
                        )

                        res.status(200).json({ token })

                        return
                    })
                })
            }
            
        })
           

        
    }

    db.close()

    // res.status(200).json({message: "None"})
    
}

