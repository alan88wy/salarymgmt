const sqlite3 = require('sqlite3').verbose();
const path=require('path');


export default function handler({ query: { id } }, res) {

    const dbPath=path.join(__dirname, '../../../../../salary.db');
    const db = new sqlite3.Database(dbPath)
    const sql =  `SELECT id, login, name, salary FROM salary WHERE ID = ?`
    
    db.serialize(function () {
        db.get(sql, [id], (err, row) => {
            if (err) {
                throw err
            }
    
            res.status(200).json(row)
        })
    });

    db.close()
    
}
