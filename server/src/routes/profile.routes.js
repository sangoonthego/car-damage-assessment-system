import express from "express";
import * as profileController from "../controllers/profile.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorizeRole("Admin"),
  profileController.getProfile
);

router.put("/", authMiddleware, profileController.updateProfile);

router.get("/me", authMiddleware, profileController.getMyProfile);

router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  profileController.uploadAvatar
);

export default router;
