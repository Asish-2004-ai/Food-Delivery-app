// "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtDecode = exports.jwtCheck = void 0;
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
exports.jwtCheck = (0, express_oauth2_jwt_bearer_1.auth)({
    audience: "Food-Delivery App",
    issuerBaseURL: "https://dev-zf5e8av4e6h0kw1h.us.auth0.com/",
    tokenSigningAlg: 'RS256'
});
const jwtDecode = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }
    const token = authorization.split(" ")[1];
    try {
        const decode = jsonwebtoken_1.default.decode(token);
        const auth0Id = decode?.sub;
        const user = await user_1.default.findOne({ auth0Id });
        if (!user) {
            return res.sendStatus(401);
        }
        req.auth0Id = auth0Id;
        req.userId = user._id.toString();
        next();
    }
    catch (error) {
        return res.sendStatus(401);
    }
};
exports.jwtDecode = jwtDecode;
