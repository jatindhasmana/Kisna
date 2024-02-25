const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingScema = Schema({
    title: {
        type: String,
    }, 
    description: String, 
    image: {
        url: String,
        filename: String,
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
    },
    geocordinate: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
          },
          coordinates: {
            type: [Number],
            required: true
          }
    }

});

listingScema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id: { $in: listing.reviews }})
    }
});

const Listing = mongoose.model("Listing", listingScema);
module.exports = Listing;

