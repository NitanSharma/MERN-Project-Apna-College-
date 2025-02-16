const express = require("express");
const router = express.Router();// router object 
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");// listing model
const {isLoggedIn, validateListing , isOwner} = require("../middleware.js");



router.get("/" , wrapAsync(async (req,res) => {
    let allListings   = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));

// CREATE : New & Create Route : --> GET  /listings/new  --> FORM  --  Submit ---> POST Request   -- /listings
router.get("/new" , isLoggedIn , (req,res) => {
    // we have to put this route upper than show route bc it consider new a id on show route
    res.render("listings/new.ejs");
});

// READ : Show Route   GET   /listings/:id
router.get("/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path : "reviews" , populate : {path : 'author'}})
    .populate("owner");
    if(!listing){
      req.flash("error" , "Listing you requested does not exist!");
      res.redirect("/listing");
    }
    console.log(listing)
    res.render("listings/show.ejs", {listing});
}));

// Create Route
router.post("/" ,validateListing, isLoggedIn ,wrapAsync(async (req,res, next) => {  
  let newListing =   new Listing(req.body.listing)
  console.log(req.user);
  newListing.owner = req.user._id;
  await newListing.save();
  req.flash("success" , "New Listing Created!");
  console.log(newListing);
  res.redirect("/listings")
  
}));

// Update : Edit & Update Route
//     GET -- /LISTINGS/:ID/EDIT    --> edit form ---  submit ---  >  PUT  --->  /listings/:id
// Edit
router.get("/:id/edit",isLoggedIn ,isOwner, wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error" , "Listing you requested does not exist!");
      res.redirect("/listing");
    }
    res.render("listings/edit.ejs" , {listing});
}));

// Update
router.put("/:id",
   isLoggedIn,
   isOwner,
   validateListing ,
   wrapAsync(async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated!");   
    res.redirect(`/listings/${id}`);
}));

// Delete Route  --> /listings/:id
router.delete("/:id" ,isLoggedIn ,isOwner, wrapAsync( async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted!");
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports = router;