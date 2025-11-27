import ManualAssessment from "../models/ManualAssessment.js";
import DamageReport from "../models/DamageReport.js";

class ManualAssessmentService {
  async createAssessment({ damageReportId, assessorId, notes, finalDamageScore }) {
    const report = await DamageReport.findById(damageReportId);
    if (!report) throw new Error("Damage Report not found!");

    const assessment = await ManualAssessment.create({
      damageReportId,
      assessorId,
      notes,
      finalDamageScore,
    });

    return assessment;
  }

  async getByReportId(damageReportId) {
    return await ManualAssessment.find({ damageReportId })
      .populate("assessorId", "username email")
      .sort({ createdAt: -1 });
  }

  async getByAssessor(assessorId) {
    return await ManualAssessment.find({ assessorId })
      .populate("damageReportId")
      .sort({ createdAt: -1 });
  }

  async deleteAssessment(id) {
    const deleted = await ManualAssessment.findByIdAndDelete(id);
    if (!deleted) throw new Error("Assessment not found!");
    return deleted;
  }
}

export default new ManualAssessmentService();
