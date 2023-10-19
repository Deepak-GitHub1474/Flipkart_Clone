const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = () => {
    mongoose
        .connect(process.env.MONGODB_URI)
        .then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        }).catch((err) => {
            console.log("ERROR While connecting to DB", err.message)
        })
};

module.exports = connectDB;