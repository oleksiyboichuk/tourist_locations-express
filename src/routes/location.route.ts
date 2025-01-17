import {Router} from "express";
import {
    deleteLocation,
    getCities,
    getLocations,
    generateLocations,
    getLocation
} from "../controllers/location.controller";

const router: Router = Router();

router.post("/location", generateLocations);
router.get("/location", getLocations);
router.get("/location/:id", getLocation);
router.delete("/location/:id", deleteLocation);

router.get("/cities", getCities)

export default router;