const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const adminschema = require('../model/adminSchema');

// Local strategy
passport.use(new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const admin = await adminschema.findOne({ email });
      if (!admin) {
        return done(null, false, { message: 'User not found' });
      }

      // NOTE: Replace this with bcrypt.compare for real apps
      if (admin.password !== password) {
        return done(null, false, { message: 'Invalid password' });
      }

      return done(null, admin);
    } catch (err) {
      return done(err);
    }
  }
));

// serialize/deserialize
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await adminschema.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// middleware for protected routes
passport.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect('/');
};

// middleware for logging user status
passport.checkauthrise = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.admin = req.user;
    console.log("✅ Authenticated:", req.user.email);
  } else {
    console.log("❌ User is not authenticated");
  }
  next();
};

module.exports = passport;
