var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: "eMail is required.",
        match: [/.+@.+\../, "Please enter a valid email address"]
    },
    password:{
        type: String,
        trim: true,
        required: "Password is required",
        validate: [
            function(input){
                return input.length >= 6;
            },
            "Password should be longer"
        ]
    },
    created: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
    },
    fullName: {
        type: String
    },
    savedArticles: {}
});

UserSchema.methods.setFullName = function(){
    this.fullName = `${this.firstName} ${this.lastName}`;
}

UserSchema.methods.lastUpdateDate = function(){
    this.lastUpdated = Date.now;

}

var User = mongoose.model("User", UserSchema);

module.exports = User;
