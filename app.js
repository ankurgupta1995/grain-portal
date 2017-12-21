var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    cookieParser = require("cookie-parser"),
    passport = require("passport"),
    config = require("./config"),
    logger = require("morgan"),
    methodOverride = require("method-override");
    
    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser);
app.use(methodOverride("_method"));
app.use(logger('dev'));
    
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/grain_portal", {useMongoClient:true});

app.use(passport.initialize());
require('./config/passport')(passport);

//requiring routes
var userRoutes = require("./routes/users");


app.get("/", function(req, res) {
    res.send("No home index!");
});

app.use("/users", userRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server started on "+process.env.IP+":"+process.env.PORT);
});