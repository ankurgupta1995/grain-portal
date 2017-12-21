var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override");
    
    
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/grain_portal", {useMongoClient:true});


//requiring routes
var userRoutes = require("./routes/users");


app.get("/", function(req, res) {
    res.send("No home index!");
});

app.use("/users", userRoutes);

app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started on "+process.env.IP+":"+process.env.PORT);
});