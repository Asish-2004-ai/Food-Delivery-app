import { Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import mongoose from 'mongoose'
import userRouter from './routes/user'
import { v2 as cloudinary } from 'cloudinary';
import Restaurant from './routes/restaurant'
import searchRest from './routes/searchRestaurant'
import Order from './routes/order'
import path from 'path'

mongoose.connect(process.env.mongo_url as string).then(()=>{
    console.log("connected to database")
}).catch((error)=>{console.log(error)})

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_secret:process.env.CLOUDINARY_API_SECRET,
    api_key:process.env.CLOUDINARY_API_KEY
})

const app = express()

export const _dirname = path.resolve()
app.use(cors())
app.use("/api/order/checkout/webhook",express.raw({type: "*/*"}))
app.use( express.json())

app.get('/', async(req: Request, res: Response)=>{
    res.json({message:"Hello hey"})
});

app.use('/api/user',userRouter)
app.use('/api/my/restaurant',Restaurant)
app.use('/api/restaurants', searchRest)
app.use('/api/order',Order)

// app.use(express.static(path.join(_dirname, "/frontend/dist")))
// app.get("*", (req: Request, res: Response)=>{
//     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
// })

app.listen(1000,()=>{
    console.log("server started")

}) 