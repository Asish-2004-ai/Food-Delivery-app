import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";
import Multer from 'multer'
import Order from "../models/order";


declare global {
  namespace Express {
    interface Request {
      auth0Id: string
      userId: string
    }
  }
}

const uploadImg = async (file: Express.Multer.File) => {
  const image = file

  const base64Image = Buffer.from(image.buffer).toString("base64")

  const dataUri = `data:${image.mimetype};base64,${base64Image}`

  const uploadResponse = await cloudinary.v2.uploader.upload(dataUri)

  return uploadResponse.url

}



//create restaurant
export const userResturant = async (req: Request, res: Response) => {
  try {
    const existResturant = await Restaurant.findOne({ user: req.userId });

    if (existResturant) {
      return res.status(409).json({ message: "User restaurant already exist" })
    };
    const imageUrl = await uploadImg(req.file as Express.Multer.File)
    const restaurant = new Restaurant(req.body)
    restaurant.imageUrl = imageUrl
    restaurant.user = new mongoose.Types.ObjectId(req.userId)
    restaurant.lastUpdate = new Date()

    await restaurant.save()
    res.status(201).send(restaurant)
  } catch (error) {
    res.status(500).json({ message: "Internal Error" })

  }
};


export const getRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId })
    if (!restaurant) {
      return res.status(409).json({ message: "Restaurant not found" })
    }

    const orders = await Order.find({ restaurant: restaurant._id }).populate("restaurant").populate("user")

    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: "Internal Error" })
  }
};


export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderid } = req.params
    const { status } = req.body

    const order = await Order.findById(orderid)

    if (!order) {
     return res.status(500).json({ message: "OrderId Not Found" })
    }

    const restaurant = await Restaurant.findById(order.restaurant)

    if (restaurant?.user?._id.toString() !== req.userId) {
      return res.status(500).json({ message: "NOT FOUND" })
    }
    order.status = status

    await order.save()

    res.json(order)
  } catch (error) {
    res.status(500).json({ message: "Internal Error" })

  }
}


//get restaurant

export const getRestaurant = async (req: Request, res: Response) => {

  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(409).json({ message: "Restaurant not found" })
    }

    res.json(restaurant)
  } catch (error) {
    res.status(500).json({ message: "Internal Error" })

  }
};


//update restaurant
export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId })

    if (!restaurant) {
      return res.status(409).json({ message: "Restaurant not found" })
    }

    restaurant.restaurantName = req.body.restaurantName
    restaurant.city = req.body.city
    restaurant.country = req.body.country
    restaurant.deliveryPrice = req.body.deliveryPrice
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime
    restaurant.cuisines = req.body.cuisines
    restaurant.menuItems = req.body.menuItems
    restaurant.lastUpdate = new Date()

    if (req.file) {
      const imageUrl = await uploadImg(req.file as Express.Multer.File)
      restaurant.imageUrl = imageUrl
    }

    await restaurant.save()

    res.status(200).send(restaurant)
  } catch (error) {
    res.status(500).json({ message: "Internal Error" })

  }
}