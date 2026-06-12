import express from "express";
import { createApplication, getApplications, updateApplication, deleteApplication } from "../../controllers/application_controller.js";
import { validate } from "../../middlewares/validate.js";
import { create_application_schema, update_application_schema, delete_application_schema } from "../../schema/application_schema.js";

const router = express.Router();

router.post("/", validate(create_application_schema, "body"), createApplication);
router.get("/", validate(null, "query"), getApplications);
router.patch("/:id", validate(update_application_schema, "body"), updateApplication);
router.delete("/:id", validate(delete_application_schema, "params"), deleteApplication);

export default router; 