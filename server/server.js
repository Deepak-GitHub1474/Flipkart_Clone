const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"],
        credentials: true
    }));

// Routes
const authRoutes = require("./routes/route");
app.use("/", authRoutes);

// Listening Server and DB Connection
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
