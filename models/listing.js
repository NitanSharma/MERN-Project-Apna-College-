// models folder contain all model that we have create
const mongoose = require("mongoose");
const Review = require("./review.js");

// Schema
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
       type: String,
       required : true,
    },
    description :String,
    image : {
        type:String,
        default : " https://plus.unsplash.com/premium_photo-1737836420070-e3ee9611d50c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
        set : (v) => v === " " ? "https://plus.unsplash.com/premium_photo-1737836420070-e3ee9611d50c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    price : Number,
    location : String,
    country : String,
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Review'
        }
    ],
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    }
});
// mongoose middleware
listingSchema.post("findOneAndDelete", async (listing) =>{
        if(listing){
            await Review.deleteMany({_id : {$in : listing.reviews}});
        }
});

// model
const Listing = mongoose.model("Listing", listingSchema);

// exports
module.exports =Listing;