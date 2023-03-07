let express = require('express')
let router = express.Router()
let user = require('./api/user')
let book = require('./api/book')

router.get('/user', user.get)
router.get('/book/booklist', book.get)
router.get('/book/num', book.getcount)

module.exports = router
