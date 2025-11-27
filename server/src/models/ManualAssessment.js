import mongoose from "mongoose";

const manualAssessmentSchema = new mongoose.Schema({
  damageReportId: { type: mongoose.Schema.Types.ObjectId, ref: "DamageReport", required: true },
  assessorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  notes: { type: String },
  finalDamageScore: { type: Number },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("ManualAssessment", manualAssessmentSchema);
