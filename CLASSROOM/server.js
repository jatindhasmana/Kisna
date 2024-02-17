const express = require("express");
const app = express();
const users = require("./routes/user.js");
const path = require("path");
const posts = require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");

// const cookieParser = require("cookie-parser");

const sessionOption = {
    secret: "mysupersecreatstring",
    resave: false,
    saveUninitialized: true,
};

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(session(sessionOption));
app.use(flash());
app.use((req, res, next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})

app.get("/register", (req, res)=>{
    let {name="annonymous"} = req.query;
    req.session.name = name;
    if(name === "annonymous"){
        req.flash("error", "user not registered");
    }
    else{
        req.flash("success", "user registered Successfully");
    }
    res.redirect("/hello")
});

app.get("/hello", (req, res)=>{
    res.render("page.ejs", { name: req.session.name})
})

// app.get("/reqcount", (req, res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }
//     else{
//         req.session.count = 1;
//     }
//     res.send(`you sent a req ${req.session.count} times`)
// })

// app.get("/test", (req, res)=>{
//     res.send("test succesfull!");
// });











// app.use(cookieParser("secreatCookie"));


// app.get("/getSignedCookie", (req, res)=>{
//     res.cookie("made-in", "India", {signed: true})
//     res.send("Signed cookie sent")
// })

// app.get("/verify", (req, res)=>{
//     // console.log(req.cookies)
//     console.log(req.signedCookies)
//     res.send("verify")
// })

// app.get("/getCookies", (req, res)=>{
//     let {name = "anonymous"} = req.cookies;
//     console.log(name)
//     res.cookie("greet", "hello");
//     res.send("Sent you some cookies");
// })

// app.get("/", (req, res)=>{
//     console.dir(req.cookies);
//     res.send("He I am root");
// })

// app.use("/users", users);
// app.use("/posts", posts);

app.listen(3000, ()=>{
    console.log("server is listening to 3000")
})