"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewear/auth");
const order_1 = require("../controlar/order");
const router = express_1.default.Router();
router.get('/details', auth_1.jwtCheck, auth_1.jwtDecode, order_1.getOrders);
router.post('/checkout/create-checkout-session', auth_1.jwtCheck, auth_1.jwtDecode, order_1.createCheckoutSession);
router.post('/checkout/webhook', order_1.stripeWebhookHandler);
exports.default = router;
// "stripe": " listen --forward-to localhost:1000/api/order/checkout/webhook"
