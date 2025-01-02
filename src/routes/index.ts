import {Router} from "express";
import locationRoutes from "./location";

const router: Router = Router();

router.use("/location", locationRoutes);

export default router;