const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel");

// Handle user get request
router.get("/getUser/:id", async (req, res, next) => {
    try {
        const userList = await userModel.findById(req.params.id);
        res.status(200).json({"message":userList})
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
});

// Handle user registeration request
router.post("/register", async(req, res, next) => {
    try {
        const user = new userModel({
            username: req.body.username,
            emailid: req.body.emailid,
            password: req.body.password,
            phonenumber: req.body.phonenumber
        });
        
        const savedUser = await user.save();
        res.status(200).json({ "message": "registered successfully", "data": savedUser });
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
})

// Handles invalid route request
router.all("*", (req, res, next) => {
    try {
        const customError = new Error("Page not found");
        customError.statusCode = 404;
        throw customError;
    } catch (error) {
        next(error);
    }
})

module.exports = router;