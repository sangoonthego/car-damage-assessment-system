import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  type: { type: String, enum: ["classification", "detection", "segmentation"], required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  imagePath: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Result", resultSchema);
