var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var userSchema = new mongoose.Schema({
    //Do we really need username?
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: Number,
        required: true
    },
    phoneNum: {
        type: Number,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    country: String,
    city: String,
    state: String,
    address: String,
    zipcode: Number,
    email: String,
    sensors: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sensor"
    }],
    farmer_reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "farmerReport"
    }],
    farmer_questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "farmerQuestion"
    }]
});

userSchema.pre('save', function(next) {
    var user = this;
    if(this.isModified('password') || this.isNew) {
        bcrypt.genSalt(function(err, salt) {
            if(err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods.comparePassword = function(pw, cb) {
    bcrypt.compare(pw, this.password, function(err, isMatch) {
        if(err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
}

module.exports = mongoose.model("User", userSchema);
