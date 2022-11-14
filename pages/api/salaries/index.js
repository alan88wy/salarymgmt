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

        // db.serialize(function() {

        //     var stmt = db.prepare("INSERT INTO users VALUES (?,?)");
        //     for (var i = 0; i < 10; i++) {
        //         stmt.run("user " + i, "email " + i);
        //     }
        //     stmt.finalize();
          
        //     stmt = db.prepare("SELECT * FROM users WHERE id=?");
        //     stmt.each(userId, function(err, row) {
        //         console.log(row.name, row.email);
        //     }, function(err, count) {
        //         stmt.finalize();
        //     });
          
        //   });

        let insertSql = `INSERT INTO salary (id, login, name, salary)  VALUES (?, ?, ?, ?)`
        let updateSql = `UPDATE salary SET login = ?, name = ?, salary = ? WHERE id = ?`
        let selectSql = `SELECT * FROM salary WHERE id = ? OR login = ?`
        let updateLoginSql = `UPDATE salary SET login = ? WHERE id = ?`
        let deleteSql = `DELETE FROM salary WHERE id = ?`

        db.serialize(function () {

            for (let i = 0; i < data.length; i++ && data[i] !== null) {
                if (data[i] === null) continue
                if (data[i].length < 4) continue
                if (data[i].id === null) continue
                if (data[i].login === null) continue
                if (data[i].salary < 0.0) continue

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
                            let loginId = updateAll[0].login

                            console.log()
    
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

