const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./config/keys");

const userRouter = require("./routes/user")

const app = express();
app.use(express.json())

app.use("/", userRouter);

app.use((err,req,res,next) => {
    if (err) {
        res.status(err.statusCode).json({"message":err.message})
    }
})

mongoose.connect(db.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true },()=>console.log("DB connected!!!"))
app.listen(4000,()=>console.log("listening at 4000"))