"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.stripeWebhookHandler = exports.createCheckoutSession = void 0;
const restaurant_1 = __importDefault(require("../models/restaurant"));
const stripe_1 = __importDefault(require("stripe"));
const inspector_1 = require("inspector");
const order_1 = __importDefault(require("../models/order"));
const STRIPE = new stripe_1.default(process.env.STRIPE_API_KEYS);
const FRONTEND_URL = process.env.FRONTEND_URL;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
console.log("api", process.env.STRIPE_API_KEYS);
const createCheckoutSession = async (req, res) => {
    try {
        const checkoutSessionRequest = req.body;
        const restaurant = await restaurant_1.default.findById(checkoutSessionRequest.restaurantId);
        if (!restaurant) {
            throw new Error("Not Found");
        }
        const newOrder = new order_1.default({
            restaurant: restaurant,
            user: req.userId,
            status: "placed",
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            createdAt: new Date()
        });
        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems);
        console.log(lineItems);
        const session = await createSession(lineItems, newOrder._id.toString(), restaurant.deliveryPrice, restaurant._id.toString());
        console.log("session", session);
        if (!session.url) {
            console.error("Stripe session error:", session);
            return res.status(500).json({ message: "Error found in Stripe" });
        }
        await newOrder.save();
        if (!process.env.STRIPE_API_KEYS || !process.env.FRONTEND_URL) {
            throw new Error("Environment variables STRIPE_API_KEYS or FRONTEND_URL are not set");
        }
        res.json({ url: session.url });
        console.log("Data", inspector_1.url);
    }
    catch (error) {
        res.status(500).json({ message: error.raw.message });
    }
};
exports.createCheckoutSession = createCheckoutSession;
const createLineItems = (checkoutSessionRequest, menuItems) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString());
        if (!menuItem) {
            throw new Error(`Menu Item NOt Found ${cartItem.menuItemId}`);
        }
        const line_item = {
            price_data: {
                currency: "inr",
                unit_amount: menuItem.price * 100, // Convert to paise (cents)
                product_data: {
                    name: menuItem.name,
                }
            },
            quantity: parseInt(cartItem.qty),
        };
        console.log("line_items", line_item);
        return line_item;
    });
    console.log("lineItems", lineItems);
    return lineItems;
};
const createSession = async (lineItems, orderId, deliveryPrice, restaurantId) => {
    const deliveryprice = deliveryPrice * deliveryPrice;
    const sessionData = await STRIPE.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: deliveryprice,
                        currency: "inr"
                    },
                },
            },
        ],
        mode: "payment",
        metadata: {
            orderId,
            restaurantId
        },
        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
    });
    console.log("sessionData", sessionData);
    return sessionData;
};
const stripeWebhookHandler = async (req, res) => {
    let event;
    try {
        const sig = req.headers["stripe-signature"];
        event = STRIPE.webhooks.constructEvent(req.body, sig, STRIPE_ENDPOINT_SECRET);
    }
    catch (error) {
        return res.status(500).send(`webhook error - ${error.message}`);
    }
    if (event.type === "checkout.session.completed") {
        const order = await order_1.default.findById(event.data.object.metadata?.orderId);
        if (!order) {
            return res.status(401).send({ message: "order not found" });
        }
        order.totalAmount = event.data.object.amount_total;
        order.status = "paid";
        await order.save();
    }
    res.status(200).send();
};
exports.stripeWebhookHandler = stripeWebhookHandler;
const getOrders = async (req, res) => {
    try {
        console.log("userId:", req.userId); // Add this to check userId
        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const orders = await order_1.default.find({ user: req.userId })
            .populate("restaurant")
            .populate("user");
        console.log("Orders", orders);
        res.json(orders);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
exports.getOrders = getOrders;
