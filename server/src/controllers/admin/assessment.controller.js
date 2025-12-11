import AssessmentService from "../../services/admin/assessment.service.js";

export const getAssessments = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, assessorId, startDate, endDate, search } = req.query;
    const result = await AssessmentService.getAssessments(
      { status, assessorId, startDate, endDate, search },
      page,
      limit
    );
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error("Error fetching assessments:", error);
    res.status(500).json({
      success: false,
      message: "評価の取得に失敗しました",
      error: error.message
    });
  }
};
