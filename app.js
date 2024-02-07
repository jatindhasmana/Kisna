const express = require("express");
const app = express();
const moongose = require("mongoose");
const path = require("path")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderLust';
const Listing = require("./models/listing.js");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema } = require("./schema.js")


app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")))

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{console.log(err)})

async function main(){
   await moongose.connect(MONGO_URL);
};

app.get("/", (req, res)=>{
    res.send("Hi, I am root");
});

const validateListing = (req, res, next)=>{
    let { error } = listingSchema.validate(req.body)
    if(error){
        throw new ExpressError(400, error);
    }
    else{
        next();
    }
}

//Index Route
app.get("/listings", wrapAsync(async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}));

//New Route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
});


//Show Route
app.get("/listings/:id", wrapAsync(async (req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
}));

//Create Route
app.post("/listings", validateListing, wrapAsync(async (req, res)=>{
    
    const newListing = new Listing(req.body.listing);
    // console.log(req.body)
    await newListing.save();
    res.redirect("/listings");
  
}))

//Edit Route
app.get("/listings/:id/edit", wrapAsync(async (req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs", { listing })
}));

//Update Route
app.put("/listings/:id", validateListing, wrapAsync(async (req, res)=>{
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
}));

//Delete Route
app.delete("/listings/:id", wrapAsync(async (req, res)=>{
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}));

app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page not Found!"))
})

app.use((err, req, res, next)=>{
    let { statusCode=500,  message="something went wrong" } = err;
    res.status(statusCode).render("error.ejs", { err })
})

app.listen(8080, ()=>{
    console.log("server is listenting on port 8080")
})