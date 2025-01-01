import express, { Express, Request, Response, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors());

app.use("/api", () => {});

app
  .listen(port, () => {
    console.log(`Server is running at ${port}`);
  })
  .on("error", (error) => console.error(error));
