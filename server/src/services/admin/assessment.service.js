import DamageReport from "../../models/DamageReport.js";
import { executePaginatedQuery, buildFilterQuery, buildDateRangeFilter } from "../../models/utils/model.utils.js";

class AssessmentService {
  static async getAssessments(filters = {}, page = 1, limit = 10) {
    try {
      const {
        status,
        assessorId,
        startDate,
        endDate,
        search
      } = filters;

      const filter = buildFilterQuery({
        ...(status && { status }),
        ...(assessorId && { assessorId }),
        ...buildDateRangeFilter('createdAt', startDate, endDate),
        ...(search && {
          $or: [
            { _id: { $regex: search, $options: 'i' } }
          ]
        })
      });

      const result = await executePaginatedQuery(DamageReport, filter, {
        page,
        limit,
        sort: '-createdAt',
        populate: [
          { path: 'userId', select: 'firstname lastname email' },
          { path: 'assessorId', select: 'firstname lastname' }
        ]
      });

      return result;
    } catch (error) {
      throw new Error(`Error fetching assessments: ${error.message}`);
    }
  }
}

export default AssessmentService;
