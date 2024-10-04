import  { Request, Response } from 'express'
import User from '../models/user'


// register
export const register = async (req: Request, res: Response)=>{
 try {
    const {auth0Id} = req.body

    const existUser = await User.findOne({auth0Id});

    if(existUser){
       return res.status(200).send();
      };
      const newUser = new User(req.body)
      await newUser.save();
      // res.json({message:"user added",newUser})
      res.status(201).json(newUser.toObject())
 } catch (error) {
    res.status(500).json({message:"Internal Error"})
 }
};

//update User

export const updateUser = async (req: Request, res: Response) => {
   try {
     const { name, address, city, country } = req.body;
     const user = await User.findById(req.userId);
 
     if (!user) {
       return res.status(401).json({ message: 'User not found' }); // Return immediately after sending response
     }
 
     user.name = name;
     user.address = address;
     user.city = city;
     user.country = country;
 
     await user.save();
     return res.json(user); // Return immediately after sending response
   } catch (error) {
     if (!res.headersSent) {  // Ensure response is only sent if not already sent
       return res.status(500).json({ message: 'Internal Error' });
     }
   }
 };
 
// get users

export const allUsers = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.userId });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    return res.status(200).json({ user }); // Return user data
  } catch (error) {
    console.error('Error fetching user:', error); // Log error for debugging
    return res.status(500).json({ message: 'Internal Error' });
  }
};

 