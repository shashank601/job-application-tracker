import express from "express";
import { createApplication, getApplications, updateApplication, deleteApplication } from "../../controllers/application_controller.js";

const router = express.Router();

router.post("/", createApplication);
router.get("/", getApplications);
router.put("/:id", updateApplication);
router.delete("/:id", deleteApplication);

export default router;