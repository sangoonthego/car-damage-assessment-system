import CostEstimateService from "../services/costEstimate.service.js";

export const createCostEstimate = async (req, res) => {
  try {
    const data = await CostEstimateService.createCostEstimate({
      ...req.body,
      createdBy: req.user.id
    });
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const approveEstimate = async (req, res) => {
  try {
    const data = await CostEstimateService.approveEstimate(req.params.id);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getEstimateByDamageReport = async (req, res) => {
  try {
    const data = await CostEstimateService.getEstimateByDamageReport(req.params.damageReportId);
    res.json(data);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
