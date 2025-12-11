import StatsService from "../../services/assessor/stats.service.js";

export const getAssessorStats = async (req, res) => {
  try {
    const assessorId = req.user.id;
    const stats = await StatsService.getAssessorStats(assessorId);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error("Error fetching assessor stats:", error);
    res.status(500).json({
      success: false,
      message: "統計情報の取得に失敗しました",
      error: error.message
    });
  }
};