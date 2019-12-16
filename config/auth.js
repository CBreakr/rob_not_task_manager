
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/UserModel");

const bcrypt = require("bcryptjs");

const cleanValue = require("../formatUtilities/cleanUserInput");

const SALT_ROUNDS = 10;

module.exports = (passport) => {
  // defaults
  passport.serializeUser((user, next) => {
    next(null, user);
  });

  passport.deserializeUser((id, next) => {
    UserModel.findById(id, (err, user) => {
      next(err, user);
    });
  });

  // create Strategies
  const localLogin = createLocalLogin();
  const localRegister = createLocalRegister();

  // bind strategies
  passport.use("localLogin", localLogin);
  passport.use("localRegister", localRegister);
}

// define the strategies

//
// LOGIN
//
function createLocalLogin(){
  return new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  (req, email, password, next) => {
    // find the user first
    UserModel.find({email}, (err, users) => {
      if(err){
        return loginFail(next, err);
      }

      if(users && users.length == 1){
        // we've found the user, now to check passwords
        if(bcrypt.compareSync(password, users[0].password)){
          // match
          return next(null, users[0]);
        }
        else{
          // no match
          return loginFail(next, new Error("invalid username and password combination"));
        }
      }
      else{
        // there's been an error:
        // multiple copies of thee same user exists
        return loginFail(next, new Error("invalid username and password combination"));
      }
    });
  })
}

//
// REGISTER
//
function createLocalRegister(){
  return new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  (req, email, password, next) => {
    const cleanEmail = cleanValue(email);
    // check that the user doesn't already exist
    UserModel.find({email:cleanEmail}, (err, users) => {
      if(err){
        return loginFail(next, err);
      }

      if(users && users.length > 0){
        // the user already exists
        return loginFail(next, new Error("cannot create new user"));
      }
      else{
        // encrypt the password...
        const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
        // ...and create the new user
        UserModel.create({
          email: cleanEmail,
          password:hashedPassword
        },
          (err, user) => {
          if(err){
            return loginFail(next, err);
          }

          // pass the new user along
          return next(null, user);
        });
      }
    });
  });
}

//
// handle the login failure by passing the error along
//
function loginFail(next, err){
  return next(err);
}
