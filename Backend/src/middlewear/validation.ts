import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

const handlevalidateError = async (req: Request, res: Response, next: NextFunction) => {
    const error = validationResult(req)

    if (!error.isEmpty) {
        return res.status(401).json({ error: error.array() })
    }
    next()
}

export const validateUser = [
    body("name").isString().notEmpty().withMessage("Name must be String"),
    body("address").isString().notEmpty().withMessage("Address must be String"),
    body("city").isString().notEmpty().withMessage("City must be String"),
    body("country").isString().notEmpty().withMessage("Country must be String"),

    handlevalidateError,
]

export const    validateRestaurant = [
    body("restaurantName").notEmpty().withMessage("RestaurantName Name Requier"),
    body("city").notEmpty().withMessage("City Name Requier"),
    body("country").notEmpty().withMessage("Country Name Requier"),
    body("deliveryPrice").isFloat({ min: 0 }).withMessage("DeliveryPrice must be positive number"),
    body("estimatedDeliveryTime").isInt({ min: 0 }).withMessage("estimatedDeliveryTime must be positive number"),
    body("cuisines").isArray().withMessage("cuisines must be Array").not().isEmpty().withMessage("cuisines can't empty"),

    body("menuItems").isArray().withMessage("menuItems must be Array"),
    body("menuItems.*.name").notEmpty().withMessage("menuItems name requier"),
    body("menuItems.*.price").isFloat({min:0}).withMessage("menuItems price requier"),

    handlevalidateError,
]