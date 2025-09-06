const express = require('express');
const port = process.env.PORT || 2005;
const route = require('./routes/route');
const path = require('path');
const database = require('./config/database');
const cookie = require('cookie-parser');
const passport = require('./middleware/passport');
const session = require('express-session');
const nodemailer = require('./middleware/nodemailer');
const categoryroute = require("./routes/category");
const subcategoryroute = require('./routes/subcategory');
const excategoryroute = require("./routes/excategory");
const productroute = require("./routes/product");

const app = express();

// view engine
app.set('view engine', 'ejs');

// trust proxy (important for Render/Heroku)
app.set("trust proxy", 1);

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

// static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/category', express.static(path.join(__dirname, 'public')));
app.use('/subcategory', express.static(path.join(__dirname, 'public')));
app.use('/excategory', express.static(path.join(__dirname, 'public')));
app.use('/product', express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// session config (fixed for production)
app.use(session({
    secret: 'rnw',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // secure only in production
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

// passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.checkauthrise);

// routes
app.use('/', route);
app.use('/category', categoryroute);
app.use('/subcategory', subcategoryroute);
app.use('/excategory', excategoryroute);
app.use('/product', productroute);

// start server
app.listen(port, (err) =>
    err ? console.log(err) : console.log(`✅ Server started on port ${port}`)
);
