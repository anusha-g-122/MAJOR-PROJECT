const mongoose = require("mongoose");
const Listing = require("../models/listing.js");

// Connect to your DB (Update the URL if using Atlas)
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("Connected to DB");
    seedCategories();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const seedCategories = async () => {
  const categories = ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic"];
  
  // Find all listings that don't have a category yet
  const listings = await Listing.find({});
  
  for (let listing of listings) {
    // Assign a random category from the list
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    listing.category = randomCategory;
    await listing.save();
  }
  
  console.log("Database updated with random categories!");
  mongoose.connection.close();
};