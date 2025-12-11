import DamageReport from "../../models/DamageReport.js";
import CostEstimate from "../../models/CostEstimate.js";
import ManualAssessment from "../../models/ManualAssessment.js";
import Notification from "../../models/Notification.js";
import { executePaginatedQuery, buildFilterQuery } from "../../models/utils/model.utils.js";

// Helper function - calculate wait time
function calculateWaitTime(createdAt) {
  const now = new Date();
  const diff = now - new Date(createdAt);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `${days}日前`;
  } else if (hours > 0) {
    return `${hours}時間${minutes}分`;
  } else {
    return `${minutes}分`;
  }
}

class AssessmentWorkflowService {
  static async getAssessmentQueue(filters = {}, page = 1, limit = 10) {
    try {
      const {
        priority,
        status = 'Pending',
        sortBy = '-createdAt'
      } = filters;

      const filter = buildFilterQuery({
        status: status === 'all' ? undefined : status,
        ...(priority && priority !== 'all' && { priority })
      });

      const result = await executePaginatedQuery(DamageReport, filter, {
        page,
        limit,
        sort: sortBy,
        populate: [
          { path: 'userId', select: 'firstname lastname email phone' }
        ]
      });

      // Enrich data with AI confidence and estimated costs
      const enrichedData = await Promise.all(
        result.data.map(async (report) => {
          const costEstimate = await CostEstimate.findOne({ damageReportId: report._id });

          return {
            ...report.toObject(),
            aiConfidence: report.aiResult?.confidence || 0,
            aiDamages: report.aiResult?.classes?.length || 0,
            estimatedCost: costEstimate?.totalEstimate || 0,
            images: report.images.length,
            waitTime: calculateWaitTime(report.createdAt)
          };
        })
      );

      return {
        data: enrichedData,
        pagination: result.pagination
      };
    } catch (error) {
      throw new Error(`Error fetching assessment queue: ${error.message}`);
    }
  }

  static async claimAssessment(reportId, assessorId) {
    try {
      const report = await DamageReport.findById(reportId);

      if (!report) {
        throw new Error("Assessment not found");
      }

      if (report.status !== "Pending") {
        throw new Error("Assessment is not available for claiming");
      }

      // Claim the assessment
      report.assessorId = assessorId;
      report.status = "In Review";
      report.claimedAt = new Date();
      await report.save();

      // Create notification for user
      await Notification.create({
        userId: report.userId,
        message: `Your assessment has been claimed by an assessor`,
        type: "assessment_claimed",
        relatedId: reportId
      });

      return report;
    } catch (error) {
      throw new Error(`Error claiming assessment: ${error.message}`);
    }
  }

  static async updateAssessment(reportId, updates) {
    try {
      const report = await DamageReport.findByIdAndUpdate(
        reportId,
        { $set: updates },
        { new: true, runValidators: true }
      );

      if (!report) {
        throw new Error("Assessment not found");
      }

      return report;
    } catch (error) {
      throw new Error(`Error updating assessment: ${error.message}`);
    }
  }

  static async submitReview(reportId, assessorId, reviewData) {
    try {
      // Create manual assessment record
      const manualAssessment = await ManualAssessment.create({
        damageReportId: reportId,
        assessorId,
        ...reviewData
      });

      // Update damage report
      const report = await DamageReport.findByIdAndUpdate(
        reportId,
        {
          status: "Completed",
          manualAssessmentId: manualAssessment._id,
          completedAt: new Date()
        },
        { new: true }
      );

      // Create notification
      await Notification.create({
        userId: report.userId,
        message: "Your assessment has been completed",
        type: "assessment_completed",
        relatedId: reportId
      });

      return {
        report,
        manualAssessment
      };
    } catch (error) {
      throw new Error(`Error submitting review: ${error.message}`);
    }
  }
}

export default AssessmentWorkflowService;
