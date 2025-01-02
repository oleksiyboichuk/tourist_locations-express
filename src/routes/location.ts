import {Router} from "express";
import {generateTouristLocations} from "../controllers/locationController";

const router: Router = Router();

router.post("/", generateTouristLocations);

export default router;