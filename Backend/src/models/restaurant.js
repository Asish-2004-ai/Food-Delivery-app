"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const menuItemsSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        default: () => new mongoose_1.default.Types.ObjectId(),
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});
const RestaurantSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
    restaurantName: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    deliveryPrice: {
        type: Number,
        required: true,
    },
    estimatedDeliveryTime: {
        type: String,
        required: true,
    },
    cuisines: [
        {
            type: String,
            requiredd: true,
        }
    ],
    menuItems: [menuItemsSchema],
    imageUrl: {
        type: String,
        required: true,
    },
    lastUpdate: {
        type: Date,
        required: true,
    }
});
const Restaurant = mongoose_1.default.model("restaurant", RestaurantSchema);
exports.default = Restaurant;
