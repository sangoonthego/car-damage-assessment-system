import ManualAssessmentService from "../services/manualAssessment.service.js";

export const createManualAssessment = async (req, res) => {
  try {
    const { damageReportId, assessorId, notes, finalDamageScore } = req.body;

    const result = await ManualAssessmentService.createAssessment({
      damageReportId,
      assessorId,
      notes,
      finalDamageScore,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAssessmentsByReport = async (req, res) => {
  try {
    const { damageReportId } = req.params;
    const list = await ManualAssessmentService.getByReportId(damageReportId);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAssessmentsByAssessor = async (req, res) => {
  try {
    const { assessorId } = req.params;
    const list = await ManualAssessmentService.getByAssessor(assessorId);
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteManualAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ManualAssessmentService.deleteAssessment(id);
    res.status(200).json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
