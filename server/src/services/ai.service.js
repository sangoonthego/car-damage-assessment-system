// services/ai.service.js
import Result from "../models/Result.js";
import { runPython } from "../helpers/pythonRunner.js";

export const detectObjectsService = async (imagePath) => {
  const result = await runPython("yolov8/utils/detect_utils.py", [imagePath]);

  const saved = await Result.create({
    type: "detection",
    data: result,
    imagePath,
  });

  return saved;
};

export const segmentObjectsService = async (imagePath) => {
  const result = await runPython("yolov8/utils/segment_utils.py", [imagePath]);

  const saved = await Result.create({
    type: "segmentation",
    data: result,
    imagePath,
  });

  return saved;
};
