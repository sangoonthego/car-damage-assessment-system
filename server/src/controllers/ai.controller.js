import { detectObjectsService, segmentObjectsService } from "../services/ai.service.js";

// Detection
export const detectObjects = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded or wrong key (must be 'car_image')" });
    }

    console.log("req.file:", req.file); 
    const saved = await detectObjectsService(req.file.path);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Segmentation
export const segmentObjects = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded or wrong key (must be 'car_image')" });
    }

    console.log("req.file:", req.file); 
    const saved = await segmentObjectsService(req.file.path);
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

