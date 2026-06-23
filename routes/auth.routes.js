import express from "express";
import { createUser, userLogin } from "../controllers/auth.controller.js";
import { createUserSchema, loginUserSchema } from "../schema/auth.schema.js";
import validate from "../middlewares/validate.middleware.js";
const router = express.Router();

router.post("/register", validate(createUserSchema), createUser);
router.post("/login", validate(loginUserSchema), userLogin)

export default router;