import AssessmentWorkflowService from "../../services/assessor/workflow.service.js";

export const getAssessmentQueue = async (req, res) => {
  try {
    const { page = 1, limit = 10, priority, status = 'Pending', sortBy } = req.query;
    const result = await AssessmentWorkflowService.getAssessmentQueue(
      { priority, status, sortBy },
      page,
      limit
    );
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error("Error fetching assessment queue:", error);
    res.status(500).json({
      success: false,
      message: "評価キューの取得に失敗しました",
      error: error.message
    });
  }
};

export const claimAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const assessorId = req.user.id;

    const report = await AssessmentWorkflowService.claimAssessment(id, assessorId);
    res.json({
      success: true,
      data: report,
      message: "Assessment claimed successfully"
    });
  } catch (error) {
    console.error("Error claiming assessment:", error);
    res.status(error.message.includes("not found") ? 404 : 400).json({
      success: false,
      message: "評価の取得に失敗しました",
      error: error.message
    });
  }
};

export const updateAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await AssessmentWorkflowService.updateAssessment(id, req.body);
    res.json({
      success: true,
      data: report,
      message: "Assessment updated successfully"
    });
  } catch (error) {
    console.error("Error updating assessment:", error);
    res.status(error.message.includes("not found") ? 404 : 500).json({
      success: false,
      message: "評価の更新に失敗しました",
      error: error.message
    });
  }
};

export const submitReview = async (req, res) => {
  try {
    const { id } = req.params;
    const assessorId = req.user.id;

    const result = await AssessmentWorkflowService.submitReview(id, assessorId, req.body);
    res.json({
      success: true,
      data: result,
      message: "Review submitted successfully"
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(error.message.includes("not found") ? 404 : 500).json({
      success: false,
      message: "レビューの提出に失敗しました",
      error: error.message
    });
  }
};


