import express from "express";
import { createCostEstimate, approveEstimate, getEstimateByDamageReport } from "../controllers/costEstimate.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createCostEstimate);
router.post("/:id/approve", authMiddleware, approveEstimate);
router.get("/:damageReportId", authMiddleware, getEstimateByDamageReport);

export default router;
