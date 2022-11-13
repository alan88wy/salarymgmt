const sqlite3 = require('sqlite3').verbose();
const path=require('path');


export default function handler(req, res) {

    let dbPath=path.join(__dirname, '../../../../salary.db');
    let db = new sqlite3.Database(dbPath)

    let sql =  `SELECT id, login, name, salary FROM salary`
 
    db.serialize(function () {
        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err
            }
    
            res.status(200).json(rows)
        })
    });

    db.close()
    
}

