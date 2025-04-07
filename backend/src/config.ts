// config.ts
import { config } from "dotenv";
import path from "path";

config({ path: path.resolve(process.cwd(), '.env') });

console.log("Environment variables loaded from:", path.resolve(process.cwd(), '.env'));
console.log("MISTRAL_AI_SECRET exists:", !!process.env.MISTRAL_AI_SECRET);