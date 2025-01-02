import dotenv from "dotenv";
import app from "./src/app";

dotenv.config();

const port = process.env.PORT || 8000;

const index = () => {
  try {
    app.listen(port, () => {
      console.log(`Server is running at ${port}`);
    });
  } catch (error) {
    console.error(`Server errors: ${error}`);
  }
};

index();
