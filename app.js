const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");// express session requiring
const flash = require("connect-flash");
const passport = require("passport");// Authentication and Authorization
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js") ; // requiring listing routes
const reviewRouter = require("./routes/review.js")
const userRouter = require("./routes/user.js");

main().then(() => {console.log("Connected to DB")}).catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOption = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,// expire in one week 7 day 24 hours 60 min 60 sec and 1000 milisecong
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    }
};

app.get("/" , (req,res) => {
    res.send("Its working....");
});

app.use(session(sessionOption));// express session using
app.use(flash());

app.use(passport.initialize());// a middleware that initilize passport.
app.use(passport.session());
// use static authenticate method of model in LocalStragey
passport.use(new LocalStrategy(User.authenticate()))// login or singup

passport.serializeUser(User.serializeUser());//Generates a function that is used by Passport to serialize users into the session
passport.deserializeUser(User.deserializeUser());// Generates a function that is used by Passport to deserialize users into the session

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;// use in navbar.ejs file to know user have object or undefined
    // console.log(res.locals.success);
    next();
})

app.use("/listings", listingRouter);// this is use listings router when /listings is used
app.use("/listings/:id/reviews", reviewRouter);
app.use("/" , userRouter);

app.all("*", (req,res,next) => {// all other request other than route
    next(new ExpressError(404,"Page Not Found!"));
})

app.use((err, req,res,next) => {// middlware for error
    let {statusCode=500, message="Something went wrong"} = err;
    res.status(statusCode).render("error.ejs", {message});
    // res.status(statusCode).send(message);
})

app.listen(8080 , () => {
    console.log("Server is listening to port 8080");
})

// Demo User Authentication and Autorization
// app.get("/demouser" , async (req,res) => {
//     let fakeUser = new User({
//         email : "sharma@gmail.com",
//         username : "Nitin"
//     })
//    // Convenience method to register a new user instance with a given password. Checks if username is unique. 
//    let registerUser = await User.register(fakeUser, "helloworld");
//    res.send(registerUser);
// }
///         ------- not using in this app.js file --------
// const Listing = require("./models/listing.js");// listing model 
// const wrapAsync = require("./utils/wrapAsync.js");   
// const {listingSchema, reviewSchema} = require("./schema.js");// for server side schema validation file
// const Review = require("./models/review.js");  

// //Method for validate review schema
// const validateReview =(req,res,next) =>{
//     let {error} = reviewSchema.validate(req.body);
//     if(error){
//         let errMsg = error.details.map((el) => el.message).join(',')
//         throw new ExpressError(400,errMsg);
//       }else{
//         next();
//       }
// }
// let validateListing = (req,res,next) => {// Validate server side schema
//   let {error} = listingSchema.validate(req.body);// Pass as middleware in post and put request 
//   if(error){
//     let errMsg = error.details.map((el) => el.message).join(',')
//     throw new ExpressError(400,errMsg);
//   }else{
//     next();
//   }
// }
// app.get("/testListing" , async (req,res) => {
//     let sampleListing = new Listing({
//         title : "Villa",
//         description : "By Hello",
//         price : 14000,
//         country :"India",
//     });
//     await sampleListing.save();
//     console.log(sampleListing);
//     res.send("Its Working");
// })
//     ----------     All route of listing is send into route folder ----------
// Index Route
// app.get("/listings" , wrapAsync(async (req,res) => {
//     let allListings   = await Listing.find({});
//     res.render("listings/index.ejs", {allListings});
// }));
// // CREATE : New & Create Route : --> GET  /listings/new  --> FORM  --  Submit ---> POST Request   -- /listings
// app.get("/listings/new" , (req,res) => {
//     // we have to put this route upper than show route bc it consider new a id on show route
//     res.render("listings/new.ejs");
// });
// // READ : Show Route   GET   /listings/:id
// app.get("/listings/:id", wrapAsync(async (req,res) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     res.render("listings/show.ejs", {listing});
// }));
// // Create Route
// app.post("/listings" ,validateListing, wrapAsync(async (req,res, next) => {  
//   let newListing =   new Listing(req.body.listing)
//   await newListing.save();
//   console.log(newListing);
//   res.redirect("/listings")
 // }));
// // Update : Edit & Update Route
// //     GET -- /LISTINGS/:ID/EDIT    --> edit form ---  submit ---  >  PUT  --->  /listings/:id
// // Edit
// app.get("/listings/:id/edit", wrapAsync(async (req,res) => {
//     let {id} = req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs" , {listing});
// }));
// // Update
// app.put("/listings/:id", validateListing ,wrapAsync(async (req,res) => {
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id, {...req.body.listing});
//    res.redirect(`/listings/${id}`);
// }));
// // Delete Route  --> /listings/:id
// app.delete("/listings/:id" ,wrapAsync( async (req,res) => {
//     let {id} = req.params;
//     let deletedListing = await Listing.findByIdAndDelete(id);
//     console.log(deletedListing);
//     res.redirect("/listings");
// }));
// -------   REVIEW ROUTER
// // Review 
// // Post Route
// app.post("/listings/:id/reviews", validateReview ,wrapAsync( async(req,res) => {
//     let listing = await Listing.findById(req.params.id);
//     let newReview = new Review(req.body.review);
//     listing.reviews.push(newReview);
//     await newReview.save();
//     await listing.save();   
//     res.redirect(`listings/${listing._id}`);
// }))
// // Delete Route
// // $pull the pull operator removes from an existing array all instances of a value or value of values that match a specific condition
// app.delete("/listing/:id/reviews/reviewId", async (req,res) =>{
//     let {id , reviewId} = req.params;
//     await Listing.findByIdAndUpdate(id , {$pull : {reviews : reviewId}});
//     await Review.findByIdAndDelete(reviewId);
//     res.redirect(`/listings/${id}`);
// })

