import {Router} from "express";
import {getCities, getLocations, locationController} from "../controllers/location.controller";

const router: Router = Router();

router.post("/", locationController);
router.get("/", getLocations);
router.get("/cities", getCities)

export default router;