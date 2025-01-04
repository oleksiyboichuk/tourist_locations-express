import app from "./src/app";
import mongoose from "mongoose";

const mongo_key = process.env.MONGO_API_KEY || "";
const port = process.env.PORT || 8000;

const server = async () => {
  try {
    await mongoose.connect(mongo_key);
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  } catch (error) {
    console.error(`Server errors: ${error}`);
  }
};

server();
