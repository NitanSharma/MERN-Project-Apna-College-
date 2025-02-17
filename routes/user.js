const express = require("express");
const router = express.Router();// router object 
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

const userController = require("../controllers/users");

router.route("/signup").get(userController.renderSignupForm ).post(wrapAsync (userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl ,passport.authenticate('local', { failureRedirect: '/login' , failureFlash : true}) ,userController.login);

//Logout user
router.get("/logout", userController.logout);

module.exports = router;



// Passport provides an authenticate() function, which is used as route middleware to authenticate requests.
   // router.post("/login" , saveRedirectUrl ,
   //  passport.authenticate('local', { failureRedirect: '/login' , failureFlash : true}) ,
   //   userController.login);