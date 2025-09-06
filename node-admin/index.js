const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./middleware/passport');
const database = require('./config/database');

const route = require('./routes/route');
const categoryroute = require('./routes/category');
const subcategoryroute = require('./routes/subcategory');
const excategoryroute = require('./routes/excategory');
const productroute = require('./routes/product');

const app = express();
const port = 2005; // fixed port

// view engine
app.set('view engine', 'ejs');

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload', express.static(path.join(__dirname, 'upload')));

// session setup
app.use(session({
    secret: 'rnw',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false, // keep false for localhost + Render (HTTP/HTTPS handled automatically)
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/', route);
app.use('/category', categoryroute);
app.use('/subcategory', subcategoryroute);
app.use('/excategory', excategoryroute);
app.use('/product', productroute);

app.listen(port, () => console.log(`✅ Server Started on port ${port}...`));
