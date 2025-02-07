const express = require("express");
const router = express.Router();// router object 
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("../schema.js");// for server side schema validation
const Listing = require("../models/listing.js");// listing model

let validateListing = (req,res,next) => {// Validate server side schema
    let {error} = listingSchema.validate(req.body);// Pass as middleware in post and put request 
    if(error){
      let errMsg = error.details.map((el) => el.message).join(',')
      throw new ExpressError(400,errMsg);
    }else{
      next();
    }
  }

router.get("/" , wrapAsync(async (req,res) => {
    let allListings   = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}));
// CREATE : New & Create Route : --> GET  /listings/new  --> FORM  --  Submit ---> POST Request   -- /listings
router.get("/new" , (req,res) => {
    // we have to put this route upper than show route bc it consider new a id on show route
    res.render("listings/new.ejs");
});
// READ : Show Route   GET   /listings/:id
router.get("/:id", wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", {listing});
}));
// Create Route
router.post("/s" ,validateListing, wrapAsync(async (req,res, next) => {  
  let newListing =   new Listing(req.body.listing)
  await newListing.save();
  console.log(newListing);
  res.redirect("/listings")
  
}));
// Update : Edit & Update Route
//     GET -- /LISTINGS/:ID/EDIT    --> edit form ---  submit ---  >  PUT  --->  /listings/:id
// Edit
router.get("/:id/edit", wrapAsync(async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
}));
// Update
router.put("/:id", validateListing ,wrapAsync(async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
   res.redirect(`/listings/${id}`);
}));
// Delete Route  --> /listings/:id
router.delete("/:id" ,wrapAsync( async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
}));

module.exports = router;