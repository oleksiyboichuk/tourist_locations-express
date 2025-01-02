import express, {Application} from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/index";

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/api", router)

export default app;