// Initialize Database
const mongoose = require("mongoose");
const initData = require("./data.js");// giving data from data.js file in init folder
const Listing = require("../models/listing.js");// give model instance by using we insert data in MongoDB
// making connection
main().then(() => {console.log("Connected to DB")}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
    await Listing.deleteMany({});// deleting all data from database
    await Listing.insertMany(initData.data);// inserting all data that come from data.js file into database
    console.log("Data was initialized");
}

initDB();// calling initDB 
