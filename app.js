const express = require("express");
const app = express();
const moongose = require("mongoose");
const path = require("path")
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderLust';
const Listing = require("./models/listing.js")

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

//Index Route
app.get("/listings", async (req, res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
})

//New Route
app.get("/listings/new", (req, res)=>{
    res.render("listings/new.ejs");
})


//Show Route
app.get("/listings/:id", async (req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing});
})

//Create Route
app.post("/listings", (req, res, next)=>{
    try {
        const newListing = new Listing(req.body);
        newListing.save();
        res.redirect("/listings");
    } catch (error) {
        next(error)
    }
})

//Edit Route
app.get("/listings/:id/edit", async (req, res)=>{
    let { id } = req.params;
    const listing = await Listing.findById(id)
    res.render("listings/edit.ejs", { listing })
})

//Update Route
app.put("/listings/:id", async (req, res)=>{
    let{title, description, image, price, location, country} = req.body;
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, {title: title, description: description, image: image, price: price, location: location, country: country });
    res.redirect(`/listings/${id}`);
})

//Delete Route
app.delete("/listings/:id", async (req, res)=>{
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

app.use((err, req, res, next)=>{
    res.send("Something went wrong")
})

app.listen(8080, ()=>{
    console.log("server is listenting on port 8080")
})