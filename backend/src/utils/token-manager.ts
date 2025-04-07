import { Request,Response,NextFunction, response } from "express";
import jwt from "jsonwebtoken"
import { COOKIE_NAME } from "./constants.js";
export const createToken = (id:string,email:string,expiresIn)=>{
    const payload = {id,email};
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn});
    return token;
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.signedCookies[COOKIE_NAME]; 

        if (!token || token.trim() === "") {
            return res.status(401).json({ message: "Token not received" });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Token verification successful ✅", decodedToken);

        res.locals.jwtData = decodedToken; // Attach decoded data to `res.locals`
        next(); // Proceed to next middleware
    } catch (error) {
        // console.error("Token verification failed ❌", error);
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
