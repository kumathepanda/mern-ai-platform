import { connect, disconnect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

async function connectToDatabase() {
    try {
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is not defined in .env file");
        }

        await connect(process.env.MONGODB_URL);
        console.log("✅ Connected to MongoDB successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        throw new Error("Cannot Connect to MongoDB");
    }
}

async function disconnectFromDatabase() {
    try {
        await disconnect();
        console.log("✅ Disconnected from MongoDB");
    } catch (error) {
        console.error("❌ MongoDB Disconnection Error:", error.message);
        throw new Error("Could not Disconnect from MongoDB");
    }
}

export { connectToDatabase, disconnectFromDatabase };
