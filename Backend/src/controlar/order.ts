import { Request, Response } from "express";
import Restaurant, { menuItemType } from "../models/restaurant";
import Stripe from 'stripe'
import { url } from "inspector";
import Order from "../models/order";



const STRIPE = new Stripe(process.env.STRIPE_API_KEYS as string)
const FRONTEND_URL = process.env.FRONTEND_URL as string
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string

console.log("api", process.env.STRIPE_API_KEYS)

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string
        name: string
        qty: string
    }[]

    deliveryDetails: {
        email: string
        name: string
        address: string
        city: string
        country: string
    }

    restaurantId: string
}

declare global {
    namespace Express {
        interface Request {
            auth0Id: string
            userId: string

        }
    }
}



export const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body

        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId)

        if (!restaurant) {
            throw new Error("Not Found")
        }

        const newOrder = new Order({
            restaurant: restaurant,
            user: req.userId,
            status: "placed",
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            createdAt: new Date()

        })

        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems)

        console.log(lineItems)

        const session = await createSession(
            lineItems,
            newOrder._id.toString(),
            restaurant.deliveryPrice,
            restaurant._id.toString()
        );

        console.log("session", session)

        if (!session.url) {
            console.error("Stripe session error:", session);
            return res.status(500).json({ message: "Error found in Stripe" });
        }

        await newOrder.save()


        if (!process.env.STRIPE_API_KEYS || !process.env.FRONTEND_URL) {
            throw new Error("Environment variables STRIPE_API_KEYS or FRONTEND_URL are not set");
        }


        res.json({ url: session.url })
        console.log("Data", url)
    } catch (error: any) {
        res.status(500).json({ message: error.raw.message })
    }
}


const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: menuItemType[]) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString())

        if (!menuItem) {
            throw new Error(`Menu Item NOt Found ${cartItem.menuItemId}`)
        }

        const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
            price_data: {
                currency: "inr",
                unit_amount: menuItem.price * 100, // Convert to paise (cents)
                product_data: {
                    name: menuItem.name,
                }
            },
            quantity: parseInt(cartItem.qty),
        }
        console.log("line_items", line_item)
        return line_item
    })
    console.log("lineItems", lineItems)
    return lineItems
};


const createSession = async (lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    orderId: string, deliveryPrice: number, restaurantId: string) => {
    const deliveryprice = deliveryPrice * deliveryPrice
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
    })
    console.log("sessionData", sessionData)
    return sessionData
}


export const stripeWebhookHandler = async (req: Request, res: Response) => {
    let event: Stripe.Event

    try {
        const sig = req.headers["stripe-signature"]
        event = STRIPE.webhooks.constructEvent(
            req.body,
            sig as string,
            STRIPE_ENDPOINT_SECRET
        )
    } catch (error: any) {
        return res.status(500).send(`webhook error - ${error.message}`)
    }

    if (event.type === "checkout.session.completed") {
        const order = await Order.findById(event.data.object.metadata?.orderId)
        if (!order) {
            return res.status(401).send({ message: "order not found" })
        }

        order.totalAmount = event.data.object.amount_total
        order.status = "paid"

        await order.save()
    }



    res.status(200).send()
}


export const getOrders = async (req: Request, res: Response) => {
    try {
        console.log("userId:", req.userId); // Add this to check userId

        if (!req.userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const orders = await Order.find({ user: req.userId })
            .populate("restaurant")
            .populate("user");

        console.log("Orders", orders);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
