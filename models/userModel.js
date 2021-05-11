const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required:true
    },
    emailid: {
        type: String,
        required:true
    },
    phonenumber: {
        type: Number,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    date: {
        type: Date,
        default:Date.now
    }
});

module.exports = mongoose.model("user",userSchema);