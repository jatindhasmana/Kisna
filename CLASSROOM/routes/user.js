const express = require("express");
const router = express.Router();


//Index - users
router.get("/", (req, res)=>{
    res.send("GET for users");
})

//Show - users
router.get("/:id", (req, res)=>{
    res.send("GET for show user id");
})

//POST - users
router.post("/", ()=>{
    res.send("POST for users")
})

//DELETE - users
router.post("/:id", ()=>{
    res.send("DELETE for user id")
})

module.exports = router;