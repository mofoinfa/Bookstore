let db = require('../db/index')


exports.get = (req, res) => {
    var sql = 'select SQL_CALC_FOUND_ROWS * from book  limit ?,?;select FOUND_ROWS() as num';
    // var sql = 'select SQL_CALC_FOUND_ROWS * from book CONCAT(IFNULL(isbn,''),IFNULL(title,''),IFNULL(author,''),IFNULL(publisher,''),IFNULL(publication_year,''),IFNULL(author,''),IFNULL(price,''),IFNULL(cell,'')) LIKE ‘%关键字%’  limit ?,?;select FOUND_ROWS() as num';
    db.query(sql,[parseInt(req.query.page),parseInt(req.query.size)], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.getcount = (req, res) => {
    var sql = 'select count(1) num from book';
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
// SELECT * FROM book WHERE CONCAT(IFNULL(`title`,''),IFNULL(`tag`,''),IFNULL(`description`,'')) LIKE ‘%关键字%’
