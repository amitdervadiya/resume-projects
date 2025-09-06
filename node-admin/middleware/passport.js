const passport = require('passport')
const localst = require('passport-local').Strategy
const adminschema = require('../model/adminSchema')

passport.use('local', new localst(
    { usernameField: 'email' },
    async (email, password, done) => {
      try {
        let admin = await adminschema.findOne({ email });
        if (!admin) return done(null, false, { message: "No user found" });
  
        if (admin.password === password) {
          return done(null, admin);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      } catch (err) {
        return done(err);
      }
    }
  ));
  
passport.checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next()
    }
    else {
        res.redirect('/')
    }
}
passport.serializeUser((user, done) => {
    console.log(user.id)
    done(null, user.id)
})

passport.deserializeUser(async (userid, done) => {
    let user = await adminschema.findById(userid)
    done(null, user)
})
passport.checkauthrise = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.admin = req.user; 
        console.log(req.user); 
    } else {
        console.log('User is not authenticated');
    }
    next();
};


module.exports = passport
