const express = require("express");
const router = express.Router({mergeParams:true});// router object 
const wrapAsync = require("../utils/wrapAsync.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");

// Review 

// Post Route
router.post("/", isLoggedIn ,
    validateReview ,
    wrapAsync(reviewController.createReview));

// Delete Route

// $pull the pull operator removes from an existing array all instances of a value or value of values that match a specific condition
router.delete("/:reviewId",isLoggedIn ,isReviewAuthor, wrapAsync(reviewController.destroyReview));

module.exports =router;