import {Router} from "express";
import { getAllUsers, userLogin, userSignup, verifyUser } from "../controllers/user-controller.js";
import {validate,signupValidation, loginValidation} from "../utils/validators.js"
import { verifyToken } from "../utils/token-manager.js";
const userRoutes = Router();

//GET
userRoutes.get("/",getAllUsers);
userRoutes.get("/auth-status", verifyToken, verifyUser, (req, res) => {
    return res.status(200).json({ 
        message: "Authenticated", 
        user: res.locals.jwtData 
    });
});
userRoutes.get("/auth-status",verifyToken,verifyUser);

//POST
userRoutes.post("/signup",validate(signupValidation),userSignup);
userRoutes.post("/login",validate(loginValidation),userLogin);
//PUT


//UPDATE


export default userRoutes;