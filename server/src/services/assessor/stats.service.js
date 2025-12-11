import DamageReport from "../../models/DamageReport.js";
import User from "../../models/User.js";

class StatsService {
  static async getAssessorStats(assessorId) {
    try {
      // Total assessments completed
      const totalCompleted = await DamageReport.countDocuments({
        assessorId,
        status: "Completed"
      });

      // Assessments in progress
      const inProgress = await DamageReport.countDocuments({
        assessorId,
        status: "In Review"
      });

      // Pending assessments
      const pending = await DamageReport.countDocuments({
        status: "Pending"
      });

      // Average rating (if rating system exists)
      const assessor = await User.findById(assessorId);
      const averageRating = assessor?.averageRating || 0;

      // Completion rate this month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

      const completedThisMonth = await DamageReport.countDocuments({
        assessorId,
        status: "Completed",
        completedAt: { $gte: startOfMonth }
      });

      const assessedThisMonth = await DamageReport.countDocuments({
        assessorId,
        createdAt: { $gte: startOfMonth }
      });

      const completionRateThisMonth = assessedThisMonth > 0
        ? ((completedThisMonth / assessedThisMonth) * 100).toFixed(1)
        : 0;

      return {
        totalCompleted,
        inProgress,
        pending,
        averageRating,
        completionRateThisMonth,
        assessedThisMonth
      };
    } catch (error) {
      throw new Error(`Error fetching assessor stats: ${error.message}`);
    }
  }
}

export default StatsService;
