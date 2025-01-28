const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

app.set("view engine" , "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(() => {console.log("Connected to DB")}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/" , (req,res) => {
    res.send("Its working....");
})

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

// Index Route
app.get("/listings" , async (req,res) => {
    let allListings   = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
})

// CREATE : New & Create Route : --> GET  /listings/new  --> FORM  --  Submit ---> POST Request   -- /listings
app.get("/listings/new" , (req,res) => {// we have to put this route upper than show route bc it consider new a id on show route
    res.render("listings/new.ejs");
})

// READ : Show Route   GET   /listings/:id
app.get("/listings/:id", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
})

// Create Route
app.post("/listings" , async (req,res) => {   
   let newListing =   new Listing(req.body.listing)
   await newListing.save();
   console.log(newListing);
   res.redirect("/listings")
})

// Update : Edit & Update Route
//     GET -- /LISTINGS/:ID/EDIT    --> edit form ---  submit ---  >  PUT  --->  /listings/:id

// Edit
app.get("/listings/:id/edit", async (req,res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs" , {listing});
})

// Update
app.put("/listings/:id", async (req,res) => {
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
   res.redirect(`/listings/${id}`);
})
// Delete Route  --> /listings/:id

app.delete("/listings/:id" , async (req,res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})


app.listen(8080 , () => {
    console.log("Server is listening to port 8080");
})