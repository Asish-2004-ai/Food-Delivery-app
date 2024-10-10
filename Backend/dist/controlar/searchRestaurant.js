"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurant = exports.searchRestaurant = void 0;
const restaurant_1 = __importDefault(require("../models/restaurant"));
const searchRestaurant = async (req, res) => {
    try {
        const city = req.params.city;
        const searchQuery = (req.query.searchQuery || "");
        const selectCuisnes = (req.query.selectCuisnes || "");
        const sortOption = (req.query.sortOption || "lastUpdated");
        const page = parseInt(req.query.page) || 1;
        let query = {};
        query["city"] = new RegExp(city, "i");
        const citycheck = await restaurant_1.default.countDocuments(query);
        if (citycheck == 0) {
            return res.status(404).json({
                data: [],
                pagination: {
                    total: 0,
                    page: 1,
                    pages: 1
                }
            });
        }
        if (selectCuisnes) {
            const cuisnes = selectCuisnes.split(",").map((cuisnes) => new RegExp(cuisnes, "i"));
            query["cuisnes"] = { $all: cuisnes };
        }
        if (searchQuery) {
            const search = new RegExp(searchQuery, "i");
            query["$or"] = [
                { restaurantName: search },
                { cuisines: { $in: [search] } }
            ];
        }
        const pageSize = 5;
        const skip = (page - 1) * pageSize;
        const restaurant = await restaurant_1.default.find(query).sort({ [sortOption]: 1 }).skip(skip).limit(pageSize).lean();
        const total = await restaurant_1.default.countDocuments(query);
        const response = {
            data: restaurant,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / pageSize)
            }
        };
        res.json(response);
    }
    catch (error) {
        res.status(404).send("Restaurant not found");
    }
};
exports.searchRestaurant = searchRestaurant;
const getRestaurant = async (req, res) => {
    try {
        const getRestaurant = req.params.restaurantId;
        const restaurant = await restaurant_1.default.findById(getRestaurant);
        if (!restaurant) {
            return res.status(404).send({ message: "Restaurant Not Found" });
        }
        return res.json(restaurant);
    }
    catch (error) {
        res.status(404).send("Restaurant not found");
    }
};
exports.getRestaurant = getRestaurant;
