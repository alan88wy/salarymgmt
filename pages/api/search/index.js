const sqlite3 = require('sqlite3').verbose();
const path=require('path');

export default function handler(req, res) {

    // const dbPath=path.join(__dirname, '../../../salary.db');
    const dbPath='./data/salary.db'
    let selectSql = `SELECT * FROM salary `

    const startSalary = req.query.startSalary ? req.query.startSalary : NaN
    const endSalary = req.query.endSalary ? req.query.endSalary : NaN

    console.log(" end ", endSalary)
    
    if (!isNaN(startSalary)) {
        selectSql += ` WHERE salary >= ${startSalary}`
    }

    if (!isNaN(endSalary) && endSalary > 0) {
        if (!isNaN(startSalary)) {
            selectSql += ` AND salary <= ${endSalary}`
        } else {
            selectSql += ` WHERE salary <= ${endSalary}`
        }
        
    }

    console.log(selectSql)

    const db = new sqlite3.Database(dbPath)

    db.all(selectSql, [], (err, rows) => {
        if (err) {
            throw err
        }

        if (rows.length === 0) {
            res.status(404).json({error: true, message : "Record not found"})
        } else {
            let salaries = rows;
            
            res.status(200).json({success: true, salaries: salaries, message : "Successfully deleted records"})
        }
    })

    // res.status(200).json({success: true, salary: [], message : "Success"})

}

