import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { Mistral } from "@mistralai/mistralai";
import { ChatCompletionStreamRequestMessages } from "@mistralai/mistralai/models/components/chatcompletionstreamrequest.js";

// Ensure API key is set, else exit process
const MISTRAL_API_KEY = process.env.MISTRAL_AI_SECRET;
if (!MISTRAL_API_KEY) {
    console.error("❌ MISTRAL_AI_SECRET is missing! Set it in your environment variables.");
    process.exit(1);
} else {
    console.log("✅ MISTRAL_AI_SECRET is set.");
}

const initialMessage: ChatCompletionStreamRequestMessages[] = [
    { role: "assistant", content: "Hi, how can I help you?" }
];

export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
        return res.status(400).json({ message: "Invalid request: Message is required." });
    }

    try {
        console.log("📩 Received message:", message);

        // Authenticate user
        const user = await User.findById(res.locals.jwtData?.id);
        if (!user) {
            console.error("❌ User not found for ID:", res.locals.jwtData?.id);
            return res.status(401).json({ message: "Unauthorized: User not found." });
        }

        console.log("👤 User found:", user._id);

        // Prepare chat history
        let chatHistory = user.chats.map(({ role, content }) => ({ role, content })) as ChatCompletionStreamRequestMessages[];
        
        if (chatHistory.length === 0) {
            chatHistory = [...initialMessage]; // Initialize conversation
            user.chats.push(...initialMessage);
        }

        // Add user's message
        chatHistory.push({ role: "user", content: message });
        user.chats.push({ role: "user", content: message });

        console.log("🚀 Calling Mistral API...");
        const mistral = new Mistral({ apiKey: MISTRAL_API_KEY });
        
        const chatResponse = await mistral.chat.complete({
            model: "mistral-small-latest",
            messages: chatHistory
        });

        console.log("✅ Mistral Response Received:", chatResponse);

        // Extract assistant response
        const assistantReply = chatResponse.choices[0]?.message;
        if (!assistantReply) {
            throw new Error("Invalid response from Mistral API.");
        }

        user.chats.push(assistantReply);
        await user.save(); // Save updated chat history

        return res.status(200).json({ chats: user.chats });

    } catch (error: any) {
        console.error("🚨 Mistral AI API Error:", error.message || error);
        return res.status(500).json({ 
            message: "An error occurred while processing your request.", 
            error: error.message || "Unknown error"
        });
    }
};

export const sendChatsToUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(res.locals.jwtData.id); // 🔥 Fetch user by ID

        if (!user) {
            return res.status(401).json({ message: "User not found 😒 OR Token Malfunctioned" });
        }

        // Return user details in response
        return res.status(200).json({
            message: "OK",
            chats: user.chats,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

export const deleteChats = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(res.locals.jwtData.id); // 🔥 Fetch user by ID

        if (!user) {
            return res.status(401).json({ message: "User not found 😒 OR Token Malfunctioned" });
        }
        //@ts-ignore
        user.chats = []; // Clear chat history
        await user.save();
        // Return user details in response
        return res.status(200).json({
            message: "OK",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
}