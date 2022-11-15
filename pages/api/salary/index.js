const sqlite3 = require('sqlite3').verbose();
const path=require('path');

export default function handler(req, res) {

    // const dbPath=path.join(__dirname, '../../../salary.db');
    const dbPath='./data/salary.db'

    if (req.method === 'POST') {
        // Process a POST request
        let data = req.body.salary;

        if (data.length === 0) {
            res.status(200).json({message : "No record given!"})
        }

        const db = new sqlite3.Database(dbPath)

        const insertSql = `INSERT INTO salary (id, login, name, salary)  VALUES (?, ?, ?, ?)`
        const updateSql = `UPDATE salary SET login = ?, name = ?, salary = ? WHERE id = ?`
        const selectSql = `SELECT * FROM salary WHERE id = ?`

        db.all(selectSql, [data.id], (err, rows) => {
            if (err) {
                throw err
            }

            if (rows.length === 0) {
                db.run(insertSql,
                    [data.id, data.login, data.name, data.salary], (err) => {
                    if (err) {
                        throw err
                    }
                })
            } else {
                db.run(updateSql, [data.login, data.name, data.salary, data.id],(err) => {
                    if (err) {
                        throw err
                    }
                })
            }
        })

        res.status(200).json({message : "Successfully saved records"})

        db.close()

    } else if (req.method === 'DELETE') {
        // Process a POST request
        let data = req.body.salary;

        if (data.length === 0) {
            res.status(200).json({message : "No record given!"})
        }

        const db = new sqlite3.Database(dbPath)

        const insertSql = `INSERT INTO salary (id, login, name, salary)  VALUES (?, ?, ?, ?)`
        const updateSql = `UPDATE salary SET login = ?, name = ?, salary = ? WHERE id = ?`
        const selectSql = `SELECT * FROM salary WHERE id = ?`
        const deleteSql = `DELETE FROM salary WHERE id = ?`

        db.all(selectSql, [data.id], (err, rows) => {
            if (err) {
                throw err
            }

            if (rows.length === 0) {
                res.status(401).json({message : "Record not found"})
            } else {
                db.run(deleteSql, [data.id],(err) => {
                    if (err) {
                        throw err
                    }
                })
            }
        })

        res.status(200).json({message : "Successfully deleted records"})

        db.close()

    }
    else if (req.method === 'GET') {

        let db = new sqlite3.Database(dbPath)

        let sql =  `SELECT id, login, name, salary FROM salary ORDER BY id`

        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err
            }

            res.status(200).json(rows)
        })
        
    } else {
        res.status(200).json({message : "Success"})
    }

}

