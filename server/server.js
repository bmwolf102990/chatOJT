const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config();
const connectDB = require("./config/db");
const app = express();
var cors = require("cors");
const authRouter = require("./routes/userRoute");
app.use(cors());
app.use(express.json());
app.use(authRouter);
app.use("/api", authRouter);
//Port and Connect to DB


const port = process.env.PORT || 5000;

    app.listen(port, () => {
         console.log(`Server is running on port ${port}`);
    });
