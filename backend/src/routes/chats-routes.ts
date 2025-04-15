import {Router} from "express";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidation } from "../utils/validators.js";
import { validate } from "../utils/validators.js";
import { generateChatCompletion,sendChatsToUser,deleteChats } from "../controllers/chat-controller.js";
//Protected API
const chatRoutes = Router();
chatRoutes.post("/new",validate(chatCompletionValidation),verifyToken,generateChatCompletion);
chatRoutes.get("/all-chats",verifyToken,sendChatsToUser);
chatRoutes.delete("/delete-chats",verifyToken,deleteChats);
export default chatRoutes;