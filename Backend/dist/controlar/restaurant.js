"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRestaurant = exports.getRestaurant = exports.updateOrderStatus = exports.getRestaurantOrders = exports.userResturant = void 0;
const restaurant_1 = __importDefault(require("../models/restaurant"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const mongoose_1 = __importDefault(require("mongoose"));
const order_1 = __importDefault(require("../models/order"));
const uploadImg = async (file) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataUri = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResponse = await cloudinary_1.default.v2.uploader.upload(dataUri);
    return uploadResponse.url;
};
//create restaurant
const userResturant = async (req, res) => {
    try {
        const existResturant = await restaurant_1.default.findOne({ user: req.userId });
        if (existResturant) {
            return res.status(409).json({ message: "User restaurant already exist" });
        }
        ;
        const imageUrl = await uploadImg(req.file);
        const restaurant = new restaurant_1.default(req.body);
        restaurant.imageUrl = imageUrl;
        restaurant.user = new mongoose_1.default.Types.ObjectId(req.userId);
        restaurant.lastUpdate = new Date();
        await restaurant.save();
        res.status(201).send(restaurant);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
};
exports.userResturant = userResturant;
const getRestaurantOrders = async (req, res) => {
    try {
        const restaurant = await restaurant_1.default.findOne({ user: req.userId });
        if (!restaurant) {
            return res.status(409).json({ message: "Restaurant not found" });
        }
        const orders = await order_1.default.find({ restaurant: restaurant._id }).populate("restaurant").populate("user");
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
};
exports.getRestaurantOrders = getRestaurantOrders;
const updateOrderStatus = async (req, res) => {
    try {
        const { orderid } = req.params;
        const { status } = req.body;
        const order = await order_1.default.findById(orderid);
        if (!order) {
            return res.status(500).json({ message: "OrderId Not Found" });
        }
        const restaurant = await restaurant_1.default.findById(order.restaurant);
        if (restaurant?.user?._id.toString() !== req.userId) {
            return res.status(500).json({ message: "NOT FOUND" });
        }
        order.status = status;
        await order.save();
        res.json(order);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
};
exports.updateOrderStatus = updateOrderStatus;
//get restaurant
const getRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurant_1.default.findOne({ user: req.userId });
        if (!restaurant) {
            return res.status(409).json({ message: "Restaurant not found" });
        }
        res.json(restaurant);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
};
exports.getRestaurant = getRestaurant;
//update restaurant
const updateRestaurant = async (req, res) => {
    try {
        const restaurant = await restaurant_1.default.findOne({ user: req.userId });
        if (!restaurant) {
            return res.status(409).json({ message: "Restaurant not found" });
        }
        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdate = new Date();
        if (req.file) {
            const imageUrl = await uploadImg(req.file);
            restaurant.imageUrl = imageUrl;
        }
        await restaurant.save();
        res.status(200).send(restaurant);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
};
exports.updateRestaurant = updateRestaurant;
