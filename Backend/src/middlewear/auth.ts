
import { NextFunction, Request, Response } from 'express';
import {auth} from 'express-oauth2-jwt-bearer'
import * as jwt from 'jsonwebtoken'
import User from '../models/user';


declare global{
  namespace Express{
    interface Request{
      auth0Id: string
      userId: string
      
    }
  }
}

export const jwtCheck = auth({
    audience: "Food-Delivery App",
    issuerBaseURL: "https://dev-zf5e8av4e6h0kw1h.us.auth0.com/",
    tokenSigningAlg: 'RS256'
  });


  export const jwtDecode = async (req: Request, res: Response, next: NextFunction) =>{

    const {authorization} = req.headers

    if(!authorization || !authorization.startsWith("Bearer ")){
      return res.sendStatus(401)
    }

    const token = authorization.split(" ")[1]

    try {
     const decode = jwt.decode(token) as jwt.JwtPayload

     const auth0Id = decode?.sub

     const user =await User.findOne({auth0Id})
     if(!user){return res.sendStatus(401)}

     req.auth0Id = auth0Id as string
     req.userId = user._id.toString()
     next()

    } catch (error) {
      return res.sendStatus(401)
    }
  }