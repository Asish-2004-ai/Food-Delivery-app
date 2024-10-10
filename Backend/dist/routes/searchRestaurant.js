"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const searchRestaurant_1 = require("../controlar/searchRestaurant");
const router = express_1.default.Router();
router.get('/:restaurantId', (0, express_validator_1.param)("restaurantId").isString().trim().notEmpty().withMessage("RestaurantId must be valid"), searchRestaurant_1.getRestaurant);
router.get('/search/:city', (0, express_validator_1.param)("city").isString().trim().notEmpty().withMessage("City parameter must be valid"), searchRestaurant_1.searchRestaurant);
exports.default = router;
