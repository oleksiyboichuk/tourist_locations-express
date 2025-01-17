import {Router} from "express";
import {
    deleteLocation,
    getCities,
    getLocations,
    generateLocations,
    getLocation, updateLocation, searchLocations
} from "../controllers/location.controller";

const router: Router = Router();

router.get("/location/search", searchLocations);

router.post("/location", generateLocations);
router.get("/location", getLocations);
router.get("/location/:id", getLocation);
router.patch("/location/:id", updateLocation);
router.delete("/location/:id", deleteLocation);

router.get("/cities", getCities)

export default router;