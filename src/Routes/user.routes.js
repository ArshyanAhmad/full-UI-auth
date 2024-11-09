import { Router } from "express";
import { Login, Register } from "../controllers/user.controllers.js";

const router = Router();

router.get("/register", Register);
router.get("/", Login);

export default router;
