import { Router } from "express";
import {
  Login,
  register,
  signUp,
  LoginUser,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/register", signUp);
router.post("/login", LoginUser);

router.get("/login", Login);
router.get("/register", register);

export default router;
