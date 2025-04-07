import { NextFunction, Request, Response } from "express";
import User from "../models/User.js"
import { hash,compare } from "bcrypt"
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {//get ALL users
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}

export const userSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {//users signup
        const { name, email, password } = req.body;
        const existing = await User.findOne({email});
        if(existing) return res.status(401).send("User already registered,welcome back 💙 ");
        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.clearCookie(COOKIE_NAME,{path:"/",domain:"localhost",httpOnly:true,signed:true});
        const token = createToken(user._id.toString(),user.email,"7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true});
        
        return res.status(201).json({ message: "OK", name:user.name , email:user.email });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}


export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {//users Login
        const {email, password } = req.body;
        const user  = await User.findOne({email});
        if(!user){ return res.status(401).send("User not found ,😒")}
        const isPasswordCorrect = await compare(password,user.password);
        if(!isPasswordCorrect){return res.status(403).send("Incorrect Password ❌")};

        res.clearCookie(COOKIE_NAME,{path:"/",domain:"localhost",httpOnly:true,signed:true});
        const token = createToken(user._id.toString(),user.email,"7d");
        const expires = new Date();
        expires.setDate(expires.getDate()+7);
        res.cookie(COOKIE_NAME,token,{path:"/",domain:"localhost",expires,httpOnly:true,signed:true});
        return res.status(200).json({ message: "OK", name:user.name , email:user.email });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message })
    }
}

export const verifyUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(res.locals.jwtData.id); // 🔥 Fetch user by ID

        if (!user) {
            return res.status(401).json({ message: "User not found 😒 OR Token Malfunctioned" });
        }

        // Return user details in response
        return res.status(200).json({
            message: "OK",
            name: user.name,  // Make sure 'name' exists in your User model
            email: user.email
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

