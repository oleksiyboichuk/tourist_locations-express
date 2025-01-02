import {Router} from "express";
import {generateTouristLocations} from "../controllers/location.controller";

const router: Router = Router();

router.post("/", generateTouristLocations);

export default router;