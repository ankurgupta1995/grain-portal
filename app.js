var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local"),
    moment = require("moment");
    

app.get("/", function(req, res) {
    res.send("Upcoming!");
});

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started on "+process.env.IP+":"+process.env.PORT);
});