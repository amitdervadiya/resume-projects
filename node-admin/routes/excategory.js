const express = require('express')
const route = express.Router()
const passport = require('../middleware/passport')
const excategoryhandler = require('../controller/excategoryhandler')


route.get('/addexcat',excategoryhandler.addexcat)
route.get('/viewexcat',excategoryhandler.viewexcat)
route.get('/editexcat',excategoryhandler.editexcat)
route.post('/addexcategory',excategoryhandler.addextracategory)
route.post('/updateexcat',excategoryhandler.updateexcat)
module.exports = route