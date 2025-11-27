import express from "express";
import {
  createManualAssessment,
  getAssessmentsByReport,
  getAssessmentsByAssessor,
  deleteManualAssessment
} from "../controllers/manualAssessment.controller.js";

const router = express.Router();

router.post("/", createManualAssessment);
router.get("/report/:damageReportId", getAssessmentsByReport);
router.get("/assessor/:assessorId", getAssessmentsByAssessor);
router.delete("/:id", deleteManualAssessment);

export default router;
