"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRestaurant = exports.validateUser = void 0;
const express_validator_1 = require("express-validator");
const handlevalidateError = async (req, res, next) => {
    const error = (0, express_validator_1.validationResult)(req);
    if (!error.isEmpty) {
        return res.status(401).json({ error: error.array() });
    }
    next();
};
exports.validateUser = [
    (0, express_validator_1.body)("name").isString().notEmpty().withMessage("Name must be String"),
    (0, express_validator_1.body)("address").isString().notEmpty().withMessage("Address must be String"),
    (0, express_validator_1.body)("city").isString().notEmpty().withMessage("City must be String"),
    (0, express_validator_1.body)("country").isString().notEmpty().withMessage("Country must be String"),
    handlevalidateError,
];
exports.validateRestaurant = [
    (0, express_validator_1.body)("restaurantName").notEmpty().withMessage("RestaurantName Name Requier"),
    (0, express_validator_1.body)("city").notEmpty().withMessage("City Name Requier"),
    (0, express_validator_1.body)("country").notEmpty().withMessage("Country Name Requier"),
    (0, express_validator_1.body)("deliveryPrice").isFloat({ min: 0 }).withMessage("DeliveryPrice must be positive number"),
    (0, express_validator_1.body)("estimatedDeliveryTime").isInt({ min: 0 }).withMessage("estimatedDeliveryTime must be positive number"),
    (0, express_validator_1.body)("cuisines").isArray().withMessage("cuisines must be Array").not().isEmpty().withMessage("cuisines can't empty"),
    (0, express_validator_1.body)("menuItems").isArray().withMessage("menuItems must be Array"),
    (0, express_validator_1.body)("menuItems.*.name").notEmpty().withMessage("menuItems name requier"),
    (0, express_validator_1.body)("menuItems.*.price").isFloat({ min: 0 }).withMessage("menuItems price requier"),
    handlevalidateError,
];
