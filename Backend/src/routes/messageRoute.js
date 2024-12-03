import express from "express";
import * as messageController from "../controllers/messageController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.get("/user", isAuthenticated, messageController.getUsersForSidebar);

router.get("/:id", isAuthenticated, messageController.getMessages);

router.post("/send/:id", isAuthenticated, messageController.sendMessage);

export default router;
