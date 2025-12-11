import DashboardService from "../../services/admin/dashboard.service.js";

export const getDashboardStats = async (req, res) => {
  try {
    const data = await DashboardService.getDashboardStats();
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({
      success: false,
      message: "ダッシュボード統計の取得に失敗しました",
      error: error.message
    });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const { period = '30d' } = req.query;
    const data = await DashboardService.getAnalytics(period);
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({
      success: false,
      message: "分析データの取得に失敗しました",
      error: error.message
    });
  }
};

export const getActivityLogs = async (req, res) => {
  try {
    const { page = 1, limit = 50 } = req.query;
    const data = await DashboardService.getActivityLogs({}, page, limit);
    res.json({
      success: true,
      ...data
    });
  } catch (error) {
    console.error("Error fetching activity logs:", error);
    res.status(500).json({
      success: false,
      message: "アクティビティログの取得に失敗しました",
      error: error.message
    });
  }
};