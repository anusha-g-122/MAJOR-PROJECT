if(process.env.NODE_ENV!="production"){
    require('dotenv').config({path: '../.env'});
}

const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");

const dbUrl=process.env.ATLASDB_URL;

main().then(()=>{
    console.log("connected to ATLAS DB");
})
.catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(dbUrl);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:"69bd3287bf142a8f17d625cf" }));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();