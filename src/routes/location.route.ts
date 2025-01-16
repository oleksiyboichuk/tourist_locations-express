import {Router} from "express";
import {getCities, getLocations, locationController} from "../controllers/location.controller";

const router: Router = Router();

router.post("/location", locationController);
router.get("/location", getLocations);
router.get("/cities", getCities)

export default router;