const sqlite3 = require('sqlite3').verbose();
const path=require('path');


export default function handler({ query: { id } }, res) {

    let dbPath=path.join(__dirname, '../../../../../salary.db');
    let db = new sqlite3.Database(dbPath)

    console.log(dbPath)
    let sql =  `SELECT id, login, name, salary FROM salary WHERE ID = '${id}'`
    
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
