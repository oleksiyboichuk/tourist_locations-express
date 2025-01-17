import app from "./src/app";
import {environment} from "./src/environment";

import mongoose from "mongoose";

const MONGO_API_KEY = environment.MONGO_API_KEY;
const PORT = environment.PORT;

const server = async () => {
  try {
    await mongoose.connect('mongodb+srv://qwerty:uAtluRSb4sZCmElx@cluster0.vogtu.mongodb.net/');
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  } catch (error) {
    console.error(`Server errors: ${error}`);
  }
};

server();
