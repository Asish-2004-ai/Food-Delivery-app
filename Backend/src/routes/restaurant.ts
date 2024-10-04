import express from 'express'
import {getRestaurant, getRestaurantOrders, updateOrderStatus, updateRestaurant, userResturant} from '../controlar/restaurant'
import multer from 'multer'
import { jwtCheck, jwtDecode } from '../middlewear/auth';
import {validateRestaurant} from '../middlewear/validation'

const router = express.Router();

const storage = multer.memoryStorage()

const upload = multer({
    storage:storage,
    limits:{
        fileSize: 5 * 1024 * 1024,
    },
})

router.post('/',upload.single("imageFile"), validateRestaurant, jwtCheck, jwtDecode, userResturant)

router.get("/orders",jwtCheck,jwtDecode,getRestaurantOrders)

router.patch('/order/:orderid/status', jwtCheck, jwtDecode, updateOrderStatus)

router.get('/',jwtCheck,jwtDecode,getRestaurant)

router.put('/',upload.single("imageFile"), validateRestaurant, jwtCheck, jwtDecode, updateRestaurant)

export default router;
