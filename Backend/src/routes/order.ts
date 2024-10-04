import express from 'express'
import { jwtCheck, jwtDecode } from '../middlewear/auth'
import {  createCheckoutSession, getOrders, stripeWebhookHandler } from '../controlar/order';

const router = express.Router()

router.get('/details',jwtCheck, jwtDecode, getOrders)

router.post('/checkout/create-checkout-session',jwtCheck, jwtDecode, createCheckoutSession)

router.post('/checkout/webhook', stripeWebhookHandler)

export default router;


// "stripe": " listen --forward-to localhost:1000/api/order/checkout/webhook"
