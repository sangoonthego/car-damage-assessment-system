import express from "express";
import {
    getAssessments
} from "../controllers/admin/assessment.controller.js";

import {
    getDashboardStats,
    getAnalytics,
    getActivityLogs
} from "../controllers/admin/dashboard.controller.js";

import {
    getUsers,
    updateUser,
    deleteUser
} from "../controllers/admin/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/role.middleware.js";

const router = express.Router();

// All routes require authentication and admin role
router.use(authMiddleware);
router.use(authorizeRole("Admin"));

// Dashboard
router.get("/dashboard", getDashboardStats);

// User Management
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

// Assessment Management
router.get("/assessments", getAssessments);

// Analytics
router.get("/analytics", getAnalytics);

// Activity Logs
router.get("/activity-logs", getActivityLogs);

export default router;
