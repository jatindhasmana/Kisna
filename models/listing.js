const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingScema = Schema({
    title: {
        type: String,
    }, 
    description: String, 
    image: {
        type: String,
        default: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        
        set: (v)=> v === "" ? "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmVhY2glMjBob3VzZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60" : v,

    }, 
    price: {
        type: Number,
    }, 
    location: {
        type: String,
    }, 
    country: {
        type: String,
    },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: "Review",
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }

});

listingScema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id: { $in: listing.reviews }})
    }

});

const Listing = mongoose.model("Listing", listingScema);
module.exports = Listing;

