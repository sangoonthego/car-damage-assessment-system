import mongoose from "mongoose";

const damageReportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  images: [{ type: String, required: true }],
  status: { type: String, enum: ["Pending", "Processing", "Completed"], default: "Pending" },
  aiResult: { type: mongoose.Schema.Types.Mixed },
  assessorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model("DamageReport", damageReportSchema);
