
const LocalStrategy = require("passport-local").Strategy;
const UserModel = require("../models/UserModel");

const bcrypt = require("bcryptjs");

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

// LOGIN
function createLocalLogin(){
  return new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  (req, email, password, next) => {
    UserModel.find({email}, (err, users) => {
      if(err){
        return loginFail(next, err);
      }

      if(users && users.length == 1){
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
        return loginFail(next, new Error("invalid username and password combination"));
      }
    });
  })
}

// REGISTER
function createLocalRegister(){
  return new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true
  },
  (req, email, password, next) => {
    UserModel.find({email}, (err, users) => {
      if(err){
        return loginFail(next, err);
      }

      if(users && users.length > 0){
        return loginFail(next, new Error("cannot create new user"));
      }
      else{
        const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);
        UserModel.create({
          email,
          password:hashedPassword
        },
          (err, user) => {
          if(err){
            return loginFail(next, err);
          }

          return next(null, user);
        });
      }
    });
  })
}

//
//
//
function loginFail(next, err){
  return next(err);
}
