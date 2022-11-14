const sqlite3 = require('sqlite3').verbose();
const path=require('path');


export default function handler(req, res) {

    if (req.method === 'POST') {
        // Process a POST request
        let data = req.body;

        if (data.length === 0) {
            res.status(200).json({message : "No record found"})
        }

        let dbPath=path.join(__dirname, '../../../../salary.db');
        let db = new sqlite3.Database(dbPath)

        let insertSql = `INSERT INTO salary (id, login, name, salary)  VALUES (?, ?, ?, ?)`
        let updateSql = `UPDATE salary SET login = ?, name = ?, salary = ? WHERE id = ?`
        let selectSql = `SELECT * FROM salary WHERE id = ? OR login = ?`
        let updateLoginSQL = `UPDATE salary SET login = ? WHERE id = ?`

        db.serialize(function () {

            for (let i = 0; i < data.length; i++) {
                if (data[i] === null) continue
                if (data[i].length < 4) continue
                if (data[i].id === null) continue
                if (data[i].login === null) continue
                if (data[i].salary < 0.0) continue

                db.all(selectSql, [data[i].id], (err, rows) => {
                    if (err) {
                        throw err
                    }

                    if (rows.length === 0) {
                        db.run(insertSql,
                            [data[i].id, data[i].login, data[i].name, data[i].salary],
                            (err) => {
                            if (err) {
                                throw err
                            }
                        })
                    } else {
                        let updateAll = rows.filter(sal => sal.id === data[i].id)
                        let updateLogin = rows.filter(sal => sal.id !== data[i].id && sal.login === data[i].login)

                        let loginId = updateAll[0].login

                        db.run(updateSql, [updateAll.login, updateAll.name, updateAll.salary, updateAll.id],
                            (err) => {
                                if (err) {
                                    throw err
                                }
                        })

                        db.run(updateLoginSQL, [updateLogin.login, updateLogin.id],
                            (err) => {
                                if (err) {
                                    throw err
                                }
                        })
                    }
                })
            }
        });

        db.close()


        res.status(200).json({message : "Success!"})
        
    } else if (req.method === 'GET') {
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
      } else {
      }

}

