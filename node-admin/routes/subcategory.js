const express = require('express')
const route = express.Router()
const passport = require('../middleware/passport')
const subcategoryhandler = require('../controller/subcategoryhandler')
const upload = require('../middleware/uploadcatimg')

route.get('/addsubcat',subcategoryhandler.addsubcat)
route.get('/viewsubcatgory',subcategoryhandler.viewsubcatgory)
route.post('/addsubcategory',subcategoryhandler.addsubcategory)
route.get('/editsubcat',subcategoryhandler.editsubcat)
route.get('/deletesubcat',subcategoryhandler.deletesubcat)
route.post('/updatesubcat',subcategoryhandler.updatesubcat)
module.exports = route