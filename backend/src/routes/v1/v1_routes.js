import express from "express";
import auth_routes from "./auth_routes.js";
import application_routes from "./application_routes.js";
import admin_routes from "./admin_routes.js";
import { verify_token } from "../../middlewares/verify_token.js";
import { is_admin } from "../../middlewares/is_admin.js";



const router = express.Router();

router.use("/auth", auth_routes);
router.use("/applications", verify_token, application_routes);

router.use("/admin", verify_token, is_admin, admin_routes);

export default router;