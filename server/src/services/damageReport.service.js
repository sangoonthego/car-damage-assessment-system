import DamageReport from "../models/DamageReport.js";

class DamageReportService {
  async createReport(data) {
    const report = new DamageReport(data);
    return await report.save();
  }

  async getReportsByUser(userId) {
    return await DamageReport.find({ userId }).sort({ createdAt: -1 });
  }

  async getAllReports() {
    return await DamageReport.find()
      .populate("userId", "username email")
      .populate("assessorId", "username email")
      .sort({ createdAt: -1 });
  }

  async getReportById(reportId) {
    return await DamageReport.findById(reportId)
      .populate("userId", "username email")
      .populate("assessorId", "username email");
  }

  async updateStatus(reportId, status, assessorId = null) {
    return await DamageReport.findByIdAndUpdate(
      reportId,
      {
        status,
        assessorId,
        updatedAt: Date.now()
      },
      { new: true }
    );
  }

  async updateAiResult(reportId, aiResult) {
    return await DamageReport.findByIdAndUpdate(
      reportId,
      {
        aiResult,
        updatedAt: Date.now()
      },
      { new: true }
    );
  }
}

export default new DamageReportService();
