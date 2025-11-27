import { Router } from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from "../controllers/notification.controller.js";

const router = Router();

// CREATE notification
router.post("/", createNotification);

// GET all notifications of a user
router.get("/user/:userId", getUserNotifications);

// MARK one as read
router.put("/:id/read", markAsRead);

// MARK ALL as read
router.put("/user/:userId/read-all", markAllAsRead);

// DELETE notification
router.delete("/:id", deleteNotification);

export default router;
