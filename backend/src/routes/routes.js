import { Router } from "express";
import v1_routes from "./v1/v1_routes.js";

const router = Router();

router.use("/api/v1", v1_routes);

export default router;