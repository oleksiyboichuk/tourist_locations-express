import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { locationRouter } from "./routers/location.router";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api", locationRouter);

const server = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  } catch (error) {
    console.log(`Server errors: ${error}`);
  }
};

server();
