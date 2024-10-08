"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allUsers = exports.updateUser = exports.register = void 0;
const user_1 = __importDefault(require("../models/user"));
// register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { auth0Id } = req.body;
        const existUser = yield user_1.default.findOne({ auth0Id });
        if (existUser) {
            return res.status(200).send();
        }
        ;
        const newUser = new user_1.default(req.body);
        yield newUser.save();
        // res.json({message:"user added",newUser})
        res.status(201).json(newUser.toObject());
    }
    catch (error) {
        res.status(500).json({ message: "Internal Error" });
    }
});
exports.register = register;
//update User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, address, city, country } = req.body;
        const user = yield user_1.default.findById(req.userId);
        if (!user) {
            return res.status(401).json({ message: 'User not found' }); // Return immediately after sending response
        }
        user.name = name;
        user.address = address;
        user.city = city;
        user.country = country;
        yield user.save();
        return res.json(user); // Return immediately after sending response
    }
    catch (error) {
        if (!res.headersSent) { // Ensure response is only sent if not already sent
            return res.status(500).json({ message: 'Internal Error' });
        }
    }
});
exports.updateUser = updateUser;
// get users
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_1.default.findOne({ _id: req.userId });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        return res.status(200).json({ user }); // Return user data
    }
    catch (error) {
        console.error('Error fetching user:', error); // Log error for debugging
        return res.status(500).json({ message: 'Internal Error' });
    }
});
exports.allUsers = allUsers;
