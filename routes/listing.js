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

router.get("/:id/edit",isLoggedIn ,isOwner, wrapAsync(listingController.editListing));

module.exports = router;