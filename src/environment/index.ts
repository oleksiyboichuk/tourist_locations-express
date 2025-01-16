import dotenv from "dotenv";

dotenv.config();

export const environment = {
    PORT: process.env.PORT || "",
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY || "",
    OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
    MONGO_API_KEY: process.env.MONGO_API_KEY || ""
}