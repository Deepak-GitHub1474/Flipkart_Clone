const mongoose = require("mongoose");

const connectDB = () => {
    mongoose
        .connect(process.env.DB_URL)
        .then((data) => {
            console.log(`Mongodb connected with server: ${data.connection.host}`);
        }).catch((err) => {
            console.log("ERROR While connecting to DB", err.message)
        })
};

module.exports = connectDB;