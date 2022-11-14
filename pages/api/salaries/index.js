const sqlite3 = require('sqlite3').verbose();
const path=require('path');

export default function handler(req, res) {

    if (req.method === 'POST') {
        // Process a POST request
        let data = req.body;
        let processed = 0
        let discarded = 0

        if (data.length === 0) {
            res.status(200).json({message : "No record found"})
        }

        const dbPath=path.join(__dirname, '../../../../salary.db');
        const db = new sqlite3.Database(dbPath)

        const insertSql = `INSERT INTO salary (id, login, name, salary)  VALUES (?, ?, ?, ?)`
        const updateSql = `UPDATE salary SET login = ?, name = ?, salary = ? WHERE id = ?`
        const selectSql = `SELECT * FROM salary WHERE id = ? OR login = ?`
        const deleteSql = `DELETE FROM salary WHERE id = ?`

        for (let i = 0; i < data.length; i++ && data[i] !== null) {
            if (data[i] === null) continue
            if (data[i].length < 4 || data[i].id === null || 
                data[i].login === null || data[i].name == null || data[i].salary < 0) {
                discarded += 1
                continue
            }

            processed += 1

            db.all(selectSql, [data[i].id, data[i].login], (err, rows) => {
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

                    if (updateLogin.length > 0) {
                        db.run(deleteSql, [updateLogin[0].id],
                            (err) => {
                                if (err) {
                                    throw err
                                }
                        })
                    }

                    db.run(updateSql, [updateAll[0].login, updateAll[0].name, updateAll[0].salary, updateAll[0].id],
                        (err) => {
                            if (err) {
                                throw err
                            }

                            
                    })

                    if (updateLogin.length > 0) {

                        inserted += 1

                        db.run(insertSql, [[updateLogin[0].id, loginId, updateLogin[0].name, updateLogin[0].salary]],
                            (err) => {
                                if (err) {
                                    throw err
                                } 
                        })

                        
                    }
                }
            })
        }
        db.close()

        res.status(200).json({message : "Successfully saved records", discarded, processed})

        
    } else if (req.method === 'GET') {
        let dbPath=path.join(__dirname, '../../../../salary.db');
        let db = new sqlite3.Database(dbPath)

        let sql =  `SELECT id, login, name, salary FROM salary ORDER BY id`

        db.all(sql, [], (err, rows) => {
            if (err) {
                throw err
            }
            res.status(200).json(rows)
        })

        db.close()
      } else {
      }

}

