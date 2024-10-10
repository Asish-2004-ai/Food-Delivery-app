"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

const express = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config"); // Ensure environment variables are loaded
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const cloudinary_1 = require("cloudinary");
const restaurant_1 = __importDefault(require("./routes/restaurant"));
const searchRestaurant_1 = __importDefault(require("./routes/searchRestaurant"));
const order_1 = __importDefault(require("./routes/order"));
const path_1 = require("path");

mongoose_1.default.connect(process.env.mongo_url)
    .then(() => {
        console.log("connected to database");
    })
    .catch((error) => {
        console.log(error);
    });

cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY
});

const app = (0, express.default)();
const _dirname = path_1.resolve();

app.use((0, cors_1.default)());
app.use("/api/order/checkout/webhook", express.default.raw({ type: "*/*" }));
app.use(express.default.json());

app.use('/api/user', user_1.default);
app.use('/api/my/restaurant', restaurant_1.default);
app.use('/api/restaurants', searchRestaurant_1.default);
app.use('/api/order', order_1.default);

// Serve static frontend files
app.use(express.default.static(path_1.join(_dirname, "/Frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path_1.resolve(_dirname, "Frontend", "dist", "index.html"));
});

// Define the port and ensure it binds correctly
const port = process.env.PORT || 1000;
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
