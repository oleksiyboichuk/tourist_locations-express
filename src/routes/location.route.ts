import {Router} from "express";
import {getLocations, locationController} from "../controllers/location.controller";

const router: Router = Router();

router.post("/", locationController);
router.get("/", getLocations);

export default router;