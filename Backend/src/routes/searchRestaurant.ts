import express from 'express'
import { param } from 'express-validator';
import { getRestaurant, searchRestaurant } from '../controlar/searchRestaurant';


const router = express.Router();

router.get('/:restaurantId',param("restaurantId").isString().trim().notEmpty().withMessage("RestaurantId must be valid"), getRestaurant)
router.get('/search/:city',param("city").isString().trim().notEmpty().withMessage("City parameter must be valid"),searchRestaurant)

export default router;