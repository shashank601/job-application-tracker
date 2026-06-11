import express from "express";
import auth_routes from "./auth_routes.js";
import application_routes from "./application_routes.js";

const router = express.Router();

router.use("/auth", auth_routes);
router.use("/applications", application_routes);

/*
TODO: Add admin routes
router.use("/admin/applications", admin_routes);
*/
export default router;