import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.use("/api", () => {});

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
