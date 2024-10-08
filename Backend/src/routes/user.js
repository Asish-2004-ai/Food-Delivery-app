"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controlar/user");
const auth_1 = require("../middlewear/auth");
const validation_1 = require("../middlewear/validation");
const router = express_1.default.Router();
router.get('/get-user', auth_1.jwtCheck, auth_1.jwtDecode, user_1.allUsers);
router.post('/register', auth_1.jwtCheck, user_1.register);
router.put('/user-update', auth_1.jwtCheck, auth_1.jwtDecode, validation_1.validateUser, user_1.updateUser);
exports.default = router;
