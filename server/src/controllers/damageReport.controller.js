import DamageReportService from "../services/damageReport.service.js";

export const createReport = async (req, res) => {
  try {
    const { userId, images } = req.body;

    if (!images || images.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }

    const report = await DamageReportService.createReport({
      userId,
      images
    });

    res.status(201).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReportsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const reports = await DamageReportService.getReportsByUser(userId);
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllReports = async (req, res) => {
  try {
    const reports = await DamageReportService.getAllReports();
    res.status(200).json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getReportById = async (req, res) => {
  try {
    const { id } = req.params;
    const report = await DamageReportService.getReportById(id);

    if (!report) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.status(200).json(report);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, assessorId } = req.body;

    const validStatuses = ["Pending", "Processing", "Completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await DamageReportService.updateStatus(
      id,
      status,
      assessorId
    );

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateAiResult = async (req, res) => {
  try {
    const { id } = req.params;
    const { aiResult } = req.body;

    const updated = await DamageReportService.updateAiResult(id, aiResult);

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
