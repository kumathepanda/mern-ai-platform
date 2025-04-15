import {Router} from "express";
import userRoutes from "./user-routes.js"
import chatRoutes from "./chats-routes.js";
import { verifyToken } from "../utils/token-manager.js";
const appRouter = Router();
appRouter.use("/user",userRoutes);//domain /api/v1/user
appRouter.use("/chat",verifyToken,chatRoutes);//domain /api/v1/chat
export default appRouter;