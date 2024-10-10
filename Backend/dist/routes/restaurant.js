"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurant_1 = require("../controlar/restaurant");
const multer_1 = __importDefault(require("multer"));
const auth_1 = require("../middlewear/auth");
const validation_1 = require("../middlewear/validation");
const router = express_1.default.Router();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});
router.post('/', upload.single("imageFile"), validation_1.validateRestaurant, auth_1.jwtCheck, auth_1.jwtDecode, restaurant_1.userResturant);
router.get("/orders", auth_1.jwtCheck, auth_1.jwtDecode, restaurant_1.getRestaurantOrders);
router.patch('/order/:orderid/status', auth_1.jwtCheck, auth_1.jwtDecode, restaurant_1.updateOrderStatus);
router.get('/', auth_1.jwtCheck, auth_1.jwtDecode, restaurant_1.getRestaurant);
router.put('/', upload.single("imageFile"), validation_1.validateRestaurant, auth_1.jwtCheck, auth_1.jwtDecode, restaurant_1.updateRestaurant);
exports.default = router;
