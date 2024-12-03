import express from "express";
import * as authController from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.get("/logout", authController.logout);
router.put("/update-profile", isAuthenticated, authController.updateProfile);

router.get("/check", isAuthenticated, authController.checkAuth);
export default router;
