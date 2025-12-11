import DamageReport from "../../models/DamageReport.js";
import CostEstimate from "../../models/CostEstimate.js";
import User from "../../models/User.js";

class DashboardService {
  static async getDashboardStats() {
    try {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

      // Total assessments this month
      const assessmentsThisMonth = await DamageReport.countDocuments({
        createdAt: { $gte: startOfMonth }
      });

      const assessmentsLastMonth = await DamageReport.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
      });

      // Completion rate
      const completedThisMonth = await DamageReport.countDocuments({
        status: "Completed",
        createdAt: { $gte: startOfMonth }
      });

      const completionRate = assessmentsThisMonth > 0
        ? ((completedThisMonth / assessmentsThisMonth) * 100).toFixed(1)
        : 0;

      // Average processing time (mock for now)
      const avgProcessingTime = "2.3秒";

      // Total repair costs
      const costEstimates = await CostEstimate.aggregate([
        { $match: { createdAt: { $gte: startOfMonth } } },
        { $group: { _id: null, total: { $sum: "$totalEstimate" } } }
      ]);

      const totalCosts = costEstimates[0]?.total || 0;

      // Weekly assessment data
      const weeklyData = await DamageReport.aggregate([
        { $match: { createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } } },
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id": 1 } }
      ]);

      // Damage type distribution (from AI results)
      const damageTypes = await DamageReport.aggregate([
        { $match: { "aiResult.classes": { $exists: true } } },
        { $unwind: "$aiResult.classes" },
        {
          $group: {
            _id: "$aiResult.classes.name",
            count: { $sum: 1 }
          }
        },
        { $sort: { count: -1 } },
        { $limit: 5 }
      ]);

      // Recent assessments
      const recentAssessments = await DamageReport.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("userId", "firstname lastname")
        .populate("assessorId", "firstname lastname");

      return {
        stats: {
          assessmentsThisMonth,
          assessmentsTrend: ((assessmentsThisMonth - assessmentsLastMonth) / (assessmentsLastMonth || 1) * 100).toFixed(1),
          completionRate,
          avgProcessingTime,
          totalCosts,
          costsTrend: "+18%"
        },
        weeklyData,
        damageTypes,
        recentAssessments
      };
    } catch (error) {
      throw new Error(`Error fetching dashboard stats: ${error.message}`);
    }
  }

  static async getAnalytics(period = '30d') {
    try {
      const now = new Date();
      let startDate;

      switch (period) {
        case '7d':
          startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          break;
        case '90d':
          startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      }

      // Assessment trends
      const assessmentTrends = await DamageReport.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            count: { $sum: 1 }
          }
        },
        { $sort: { "_id": 1 } }
      ]);

      // Status distribution
      const statusDistribution = await DamageReport.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 }
          }
        }
      ]);

      // Cost trends
      const costTrends = await CostEstimate.aggregate([
        { $match: { createdAt: { $gte: startDate } } },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            total: { $sum: "$totalEstimate" }
          }
        },
        { $sort: { "_id": 1 } }
      ]);

      // Assessor performance
      const assessorPerformance = await DamageReport.aggregate([
        { $match: { createdAt: { $gte: startDate }, assessorId: { $exists: true } } },
        {
          $group: {
            _id: "$assessorId",
            assessments: { $sum: 1 },
            avgTime: { $avg: { $subtract: ["$$NOW", "$createdAt"] } }
          }
        },
        {
          $lookup: {
            from: "users",
            localField: "_id",
            foreignField: "_id",
            as: "assessor"
          }
        },
        { $limit: 10 }
      ]);

      return {
        assessmentTrends,
        statusDistribution,
        costTrends,
        assessorPerformance
      };
    } catch (error) {
      throw new Error(`Error fetching analytics: ${error.message}`);
    }
  }

  static async getActivityLogs(filter = {}, page = 1, limit = 50) {
    try {
      const skip = (page - 1) * limit;
      
      // Placeholder for activity logs - can be expanded with ActivityLog model
      const logs = await DamageReport.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("userId", "firstname lastname email")
        .populate("assessorId", "firstname lastname");

      const total = await DamageReport.countDocuments(filter);

      return {
        data: logs,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      };
    } catch (error) {
      throw new Error(`Error fetching activity logs: ${error.message}`);
    }
  }
}

export default DashboardService;
