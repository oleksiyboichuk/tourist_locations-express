import { Router } from "express";
import { locationController } from "../controllers/location.controller";
const router: Router = Router();

router.use("/location", locationController);

export const locationRouter: Router = router;
