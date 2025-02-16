const express = require("express");
const router = express.Router();// router object 
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");

router.get("/signup" , (req,res) => {
    res.render("users/signup.ejs");
})

router.post("/signup" ,wrapAsync (async (req,res) => {
    try{
    let {username , email , password} = req.body;
    let newUser =  new User({email , username});
    const registerUser = await User.register(newUser , password);
    // console.log(registerUser); // login after SignUp
    req.login(registerUser , (err) => {
        if(err) {
            return next(err);
        }
        req.flash("success" , "Welcome to Wanderlust!");
        res.redirect("/listings");
    })    
    }catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup");
    }   
}));

router.get("/login" , (req,res) => {
    res.render("users/login.ejs")
});
   // Passport provides an authenticate() function, which is used as route middleware to authenticate requests.
router.post("/login" , saveRedirectUrl ,passport.authenticate('local', { failureRedirect: '/login' , failureFlash : true}) , async (req,res) => {
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
})

//Logout user
router.get("/logout", (req,res,next) => {
    req.logOut((err) => {
        if(err){
            next(err);
        }
        req.flash("success", "you are logged out!");
        res.redirect("/listings");
    })
})

module.exports = router;