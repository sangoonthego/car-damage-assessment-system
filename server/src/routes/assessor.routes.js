import express from "express";

import {
    getNotifications,
    markNotificationRead
} from "../controllers/assessor/notification.controller.js";

import {
    getAssessorStats
} from "../controllers/assessor/stats.controller.js";

import {
    getAssessmentQueue,
    claimAssessment,
    updateAssessment,
    submitReview
} from "../controllers/assessor/workflow.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRole from "../middlewares/role.middleware.js";

const router = express.Router();

// All routes require authentication and assessor role
router.use(authMiddleware);
router.use(authorizeRole("Assessor"));

// Assessment Queue
router.get("/queue", getAssessmentQueue);

// Claim Assessment
router.post("/claim/:id", claimAssessment);

// Update Assessment
router.put("/assessment/:id", updateAssessment);

// Submit Review
router.post("/submit/:id", submitReview);

// Personal Statistics
router.get("/stats", getAssessorStats);

// Notifications
router.get("/notifications", getNotifications);
router.put("/notifications/:id/read", markNotificationRead);

export default router;
