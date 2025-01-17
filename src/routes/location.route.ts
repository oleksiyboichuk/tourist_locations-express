import {Router} from "express";
import {deleteLocation, getCities, getLocations, locationController} from "../controllers/location.controller";

const router: Router = Router();

router.post("/location", locationController);
router.get("/location", getLocations);
router.delete("/location/:id", deleteLocation);

router.get("/cities", getCities)

export default router;