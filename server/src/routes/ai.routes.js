import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { detectObjects, segmentObjects } from "../controllers/ai.controller.js";

const router = express.Router();

// router.post("/classify", upload.single("image"), classifyImage);
router.post("/detect", (req, res, next) => {
  console.log("req.body:", req.body);
  console.log("req.files:", req.files);
  next();
}, upload.single("car_image"), detectObjects);

router.post("/segment", upload.single("car_image"), segmentObjects);

export default router;
