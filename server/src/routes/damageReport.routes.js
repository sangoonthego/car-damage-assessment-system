import express from "express";
import {
  createReport,
  getReportsByUser,
  getAllReports,
  getReportById,
  updateStatus,
  updateAiResult
} from "../controllers/damageReport.controller.js";

const router = express.Router();

router.post("/", createReport);
router.get("/user/:userId", getReportsByUser);
router.get("/", getAllReports);
router.get("/:id", getReportById);
router.put("/status/:id", updateStatus);
router.put("/ai/:id", updateAiResult);

export default router;
