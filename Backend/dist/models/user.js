"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    auth0Id: { type: String, require: true },
    email: { type: String, require: true },
    name: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String }
});
const User = mongoose_1.default.model("user", userSchema);
exports.default = User;
