import express from "express";
import { register, login } from "../../controllers/auth_controller.js";
import { validate } from "../../middlewares/validate_middleware.js";
import { registerSchema, loginSchema } from "../../schema/auth_schema.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
