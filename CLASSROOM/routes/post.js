const express = require("express");
const router = express.Router();


//POST
//Index 
router.get("/", (req, res)=>{
    res.send("GET for posts");
})

//Show 
router.get("/:id", (req, res)=>{
    res.send("GET for show post id");
})

//POST 
router.post("/", ()=>{
    res.send("POST for posts")
})

//DELETE 
router.post("/:id", ()=>{
    res.send("DELETE for post id")
})

module.exports = router;