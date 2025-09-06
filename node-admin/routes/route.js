const express = require('express');
const route = express.Router();
const handler = require('../controller/handler');
const upload = require('../middleware/upload');
const passport = require('../middleware/passport');

// login form
route.get('/', handler.loginform);

// login route
route.post(
  '/login',
  passport.authenticate('local', { failureRedirect: '/' }),
  (req, res, next) => {
    console.log("✅ Logged in user:", req.user);
    console.log("✅ Session data:", req.session);
    next();
  },
  handler.login
);

// protected routes
route.get('/dashboard', passport.checkAuth, handler.dashboard);
route.get('/addAdmin', passport.checkAuth, handler.addAdmin);
route.get('/viewAdmin', passport.checkAuth, handler.viewAdmin);

// admin management
route.post('/addNewAdmin', upload, handler.addNewAdmin);
route.get('/deletedata', handler.deleteAdmin);
route.get('/editdata', handler.editAdmin);
route.get('/profile', handler.profile);
route.post('/updateAdmin', upload, handler.updateAdmin);
route.get('/changepassword', handler.changepassword);
route.post('/changepass', handler.changepass);
route.get('/logout', handler.logout);
route.post('/forgotpass', handler.forgotpass);
route.post('/recoverypass', handler.recoverypass);

module.exports = route;
