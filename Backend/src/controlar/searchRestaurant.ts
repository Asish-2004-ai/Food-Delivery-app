import  { Request, Response } from 'express'
import Restaurant from '../models/restaurant'

export const searchRestaurant = async (req: Request, res: Response) => {
    try {
        const city = req.params.city;
        const searchQuery = (req.query.searchQuery as string || "")
        const selectCuisnes = (req.query.selectCuisnes as string || "")
        const sortOption = (req.query.sortOption as string || "lastUpdated")
        const page = parseInt(req.query.page as string) || 1

        let query: any = {}
        query["city"] = new RegExp(city, "i")

        const citycheck = await Restaurant.countDocuments(query)
        if (citycheck == 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1
                }
            })
        }

        if (selectCuisnes) {
            const cuisnes = selectCuisnes.split(",").map((cuisnes) => new RegExp(cuisnes, "i"))

            query["cuisnes"] = { $all: cuisnes }
        }

        if (searchQuery) {
            const search = new RegExp(searchQuery, "i")

            query["$or"] = [
                { restaurantName: search },
                { cuisines: { $in: [search] } }
            ]
        }

        const pageSize = 5;
        const skip = (page - 1) * pageSize;

        const restaurant = await Restaurant.find(query).sort({ [sortOption]: 1 }).skip(skip). limit(pageSize).lean()

        const total = await Restaurant.countDocuments(query)

        const response = {
            data: restaurant,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize)

            }
        }

        res.json(response)
    } catch (error) {
        res.status(404).send("Restaurant not found")
    }
};

export const getRestaurant =async (req: Request, res: Response)=>{
    try {
        const getRestaurant = req.params.restaurantId

        const restaurant = await Restaurant.findById(getRestaurant)

        if(!restaurant){
            return res.status(404).send({message:"Restaurant Not Found"})
        }

        return res.json(restaurant)
    } catch (error) {
        res.status(404).send("Restaurant not found")

    }
}