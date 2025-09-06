const express = require('express')
const route = express.Router()
const passport = require('../middleware/passport')
const categoryhandler = require('../controller/categoryhandler')
const upload = require('../middleware/uploadcatimg')

route.get('/addcat', categoryhandler.addcat)
route.post('/addcategory', upload, categoryhandler.addcategory)
route.get('/viewcategory',categoryhandler.viewcategory)
route.get('/updatecategory',categoryhandler.viewcategory)
route.get('/deletecat', categoryhandler.deletecat)
route.get('/editcat', categoryhandler.editcat)
route.post('/updatecat',upload, categoryhandler.updatecat)


module.exports = route