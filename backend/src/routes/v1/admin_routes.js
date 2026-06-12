import express from "express";
import { get_user, delete_user } from "../../controllers/admin_controller.js";

const router = express.Router();

router.get("/applications/:id", get_user);
router.delete("/applications/:id", delete_user);

export default router;