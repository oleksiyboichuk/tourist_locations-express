import app from "./src/app";
import {environment} from "./src/environment";

import mongoose from "mongoose";

const MONGO_API_KEY = environment.MONGO_API_KEY;
const PORT = environment.PORT;

const server = async () => {
  try {
    await mongoose.connect(MONGO_API_KEY);
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (error) {
    console.error(`Server errors: ${error}`);
  }
};

server();
