const express = require('express')
const port = 2005
const route = require('./routes/route')
const path = require('path')
const database = require('./config/database')
const cookie = require('cookie-parser')
const passport = require('./middleware/passport')
const session = require('express-session')
const nodemailer = require('./middleware/nodemailer')
const categoryroute = require("./routes/category")
const subcategoryroute = require('./routes/subcategory')
const excategoryroute = require("./routes/excategory")
const productroute = require('./routes/product')

const app = express()
app.set('view engine', 'ejs')
app.use(express.urlencoded())
app.use(cookie())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/category',express.static(path.join(__dirname, 'public')))
app.use('/subcategory',express.static(path.join(__dirname, 'public')))
app.use('/excategory',express.static(path.join(__dirname, 'public')))
app.use('/product',express.static(path.join(__dirname, 'public')))
app.use('/upload', express.static(path.join(__dirname, 'upload')))
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('public/', express.static(path.join(__dirname, 'public')))


app.use(session({
    secret: 'rnw',
    resave: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure:true,
        maxAge: 100 * 100 * 60
    }

}))
app.use(passport.initialize())
app.use(passport.session())
app.use(passport.checkauthrise)
app.use('/', route)
app.use('/category', categoryroute )
app.use('/subcategory', subcategoryroute )
app.use('/excategory', excategoryroute )
app.use('/product', productroute )

app.listen(port, (err) => err ? console.log(err) : console.log('Server Started...'))