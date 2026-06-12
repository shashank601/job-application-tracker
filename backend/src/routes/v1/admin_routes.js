import express from "express";
import { get_user, delete_user } from "../../controllers/admin_controller.js";

const router = express.Router();

router.get("/users/:id", get_user);
router.delete("/users/:id", delete_user);

export default router;