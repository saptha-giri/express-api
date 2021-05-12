const express = require("express");
const router = express.Router();

const userModel = require("../models/userModel");

// Handle user get request
router.get("/getUser", async (req, res, next) => {
    try {
        const userList = await userModel.find();
        res.status(200).json({ "message": userList })
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
});
// Handle user get request
router.get("/getUser/:id", async (req, res, next) => {
    try {
        const userList = await userModel.findById(req.params.id);
        res.status(200).json({ "message": userList })
    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
});

// Handle user registeration request
router.post("/register", async (req, res, next) => {
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

router.put("/update/:emailid", async (req, res, next) => {
    try {
        let emailid = req.params.emailid;

        const userToBeUpdate = await userModel.find({ "emailid": emailid });

        if (userToBeUpdate.length > 0) {
            let id = userToBeUpdate[0].id;
            const updatedUser = await userModel.updateOne({ "_id": id }, { $set: req.body });
            res.status(200).json({ "message": "user details updated sucessfully!!!", "data": updatedUser });
        } else {
            res.status(200).json({ "message": "No user detail available, please check." });
        }

    } catch (error) {
        error.statusCode = 400;
        next(error);
    }
})

router.delete("/remove/:id", async (req, res, next) => {
    try {

        const userToBeUpdate = await userModel.find({ "_id": req.params.id });

        if (userToBeUpdate.length > 0) {
            const deletedUser = await userModel.deleteOne({ "_id": req.params.id });
            res.status(200).json({ "message": "User deleted successfully", "data": deletedUser })
        } else {
            res.status(200).json({ "message": "No user available" })
        }


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