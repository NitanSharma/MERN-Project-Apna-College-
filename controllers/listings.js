const Listing = require("../models/listing");

module.exports.index = async (req,res) => {
    const allListings   = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}

module.exports.renderNewForm = (req,res) => {
    // we have to put this route upper than show route bc it consider new a id on show route
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path : "reviews" , populate : {path : 'author'}})
    .populate("owner");
    if(!listing){
      req.flash("error" , "Listing you requested does not exist!");
      res.redirect("/listing");
    }
    // console.log(listing)
    res.render("listings/show.ejs", {listing});
}

module.exports.createListing = async (req,res, next) => { 
    let url= req.file.path;
    let filename = req.file.filename;
    // console.log(url , ".. " , filename ) 
    let newListing =   new Listing(req.body.listing)
    // console.log(req.user);
    newListing.owner = req.user._id;
    newListing.image = {url , filename};
    await newListing.save();
    req.flash("success" , "New Listing Created!");
    // console.log(newListing);
    res.redirect("/listings")
    
}

module.exports.editListing = async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
      req.flash("error" , "Listing you requested does not exist!");
      res.redirect("/listing");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload" , "/upload/w_250");
    res.render("listings/edit.ejs" , {listing , originalImageUrl});
}

module.exports.updateListing = async (req,res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
     // edit listing image
    if(typeof req.file !== "undefined"){
        let url= req.file.path;
        let filename = req.file.filename;
        listing.image = {url , filename};
        await listing.save();
    }
    req.flash("success", "Listing Updated!");   
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted!");
    // console.log(deletedListing);
    res.redirect("/listings");
}