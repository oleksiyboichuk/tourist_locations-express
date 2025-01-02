import {Router} from "express";
import {locationController} from "../controllers/location.controller";

const router: Router = Router();

router.post("/", locationController);
router.get("/", locationController);

export default router;