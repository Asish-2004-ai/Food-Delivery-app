"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    restaurant: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "restaurant"
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user"
    },
    deliveryDetails: {
        email: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
    },
    cartItems: [
        {
            menuItemId: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
        }
    ],
    totalAmount: Number,
    status: {
        type: String,
        enum: ["placed", "paid", "inProgress", "outForDelivery", "Delivered"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
const Order = mongoose_1.default.model("Order", orderSchema);
exports.default = Order;
