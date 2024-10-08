"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._dirname = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./routes/user"));
const cloudinary_1 = require("cloudinary");
const restaurant_1 = __importDefault(require("./routes/restaurant"));
const searchRestaurant_1 = __importDefault(require("./routes/searchRestaurant"));
const order_1 = __importDefault(require("./routes/order"));
const path_1 = __importDefault(require("path"));
mongoose_1.default.connect(process.env.mongo_url).then(() => {
    console.log("connected to database");
}).catch((error) => { console.log(error); });
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    api_key: process.env.CLOUDINARY_API_KEY
});
const app = (0, express_1.default)();
exports._dirname = path_1.default.resolve();
app.use((0, cors_1.default)());
app.use("/api/order/checkout/webhook", express_1.default.raw({ type: "*/*" }));
app.use(express_1.default.json());
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ message: "Hello hey" });
}));
app.use('/api/user', user_1.default);
app.use('/api/my/restaurant', restaurant_1.default);
app.use('/api/restaurants', searchRestaurant_1.default);
app.use('/api/order', order_1.default);
// app.use(express.static(path.join(_dirname, "/frontend/dist")))
// app.get("*", (req: Request, res: Response)=>{
//     res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
// })
app.listen(1000, () => {
    console.log("server started");
});
