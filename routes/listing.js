const express = require("express");
const router = express.Router();// router object 
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");// listing model
const {isLoggedIn, validateListing , isOwner} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn ,
   upload.single('listing[image]'),
   validateListing,
   wrapAsync(listingController.createListing));
  
  // .post( upload.single('listing[image]'), (req,res) => {
  //   res.send(req.file);
  // })

// CREATE : New & Create Route : --> GET  /listings/new  --> FORM  --  Submit ---> POST Request   -- /listings
router.get("/new" , isLoggedIn , listingController.renderNewForm); 

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(isLoggedIn,
   isOwner,
   validateListing ,
   wrapAsync(listingController.updateListing))
   .delete(isLoggedIn ,
   isOwner,
    wrapAsync( listingController.deleteListing));


// Update : Edit & Update Route
//     GET -- /LISTINGS/:ID/EDIT    --> edit form ---  submit ---  >  PUT  --->  /listings/:id
// Edit
router.get("/:id/edit",isLoggedIn ,isOwner, wrapAsync(listingController.editListing));

module.exports = router;

// Index Route
// router.get("/" , wrapAsync(listingController.index));
// Create Route
// router.post("/" , isLoggedIn ,validateListing , wrapAsync(listingController.createListing));
// READ : Show Route   GET   /listings/:id
// router.get("/:id", wrapAsync(listingController.showListing));
// Update
// router.put("/:id",
//    isLoggedIn,
//    isOwner,
//    validateListing ,
//    wrapAsync(listingController.updateListing));
// Delete Route  --> /listings/:id
// router.delete("/:id" ,isLoggedIn ,isOwner, wrapAsync( listingController.deleteListing));
// // CREATE : New & Create Route : --> GET  /listings/new  --> FORM  --  Submit ---> POST Request   -- /listings
// router.get("/new" , isLoggedIn , listingController.renderNewForm);