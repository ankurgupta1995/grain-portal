var Validator = require("validator");
var User = require("../models/user");


//===================Helper Functions=================
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
 * Validate and preprocess a user.
 * @param user: information of the user we are creating.
 * @return {success: Boolean, message: String, user: user object}
 */
function validateUserInfo(user) {
    if (!user.userName) {
        return {success: false, message: 'Username cannot be empty.'};
    }

    if (!Validator.isLength(user.userName, {min: 1, max: 10})) {
        return {success: false, message: 'Username can only have 1 - 10 characters.'};
    }
    if (!Validator.isAlphanumeric(user.userName)) {
        return {success: false, message: 'Username can contain only numbers and letters.'};
    }
    user.username = user.username.toLowerCase();

    if ((user.userType !== 0) && (user.userType !== 1) && (user.userType !== 2)) {
        return {success: false, message: 'userType error. Please contact administrator.'};
    }

    if (!user.firstName) {
        return {success: false, message: 'First name cannot be empty.'};
    }
    if (!Validator.isAlpha(user.firstName)) {
        return {success: false, message: 'First name can contain only letters.'};
    }

    if (!user.lastName) {
        return {success: false, message: 'Last name cannot be empty.'};
    }
    if (!Validator.isAlpha(user.lastName)) {
        return {success: false, message: 'Last name can contain only letters.'};
    }

    if (user.country !== 'India' && user.country !== 'United States') {
        return {success: false, message: 'Invalid country. Please contact administrator.'};
    }

    if (user.city) {
        if (!Validator.isAlpha(user.city)) {
            return {success: false, message: 'City can contain only letters.'};
        }
    }

    if (user.state) {
        if (!Validator.isAlpha(user.state)) {
            return {success: false, message: 'State can contain only letters.'};
        }
    }

    if (user.zipcode) {
        if (!Validator.isNumeric(user.zipcode)) {
            return {success: false, message: 'Zip code can contain only numbers.'};
        }
    }

    if (user.email) {
        if (!Validator.isEmail(user.email)) {
            return {success: false, message: 'Invalid e-mail address.'};
        }
        else {
            user.email = user.email.toLowerCase();
        }
    }
    return {success: true, message: null, user: user};
}


var UserApi = {
    create: function(user, callback){
        var userValidate = validateUserInfo(user);
        if(userValidate.success) {
            //ask about generating password
            user.password = getRandomInt(10000000, 99999999).toString();
            var newUser = new User(user);
            newUser.save(function(err, user) {
                if(err) {
                    callback({success: false, error: err});
                }
                callback({success: true, user: user});
            });
        } else {
            callback({success: false, error: userValidate.message});
        }
    },
    
    login: function(user, callback){
        
    },
    
    logout: function(user, callback){
        
    },
    
    read: function(user, callback){
        
    },
    update: function(user, callback){
        
    },
    destroy: function(user, callback){
        
    }
};


module.exports = UserApi;