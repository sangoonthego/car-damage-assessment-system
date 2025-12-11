/**
 * Model utility functions for queries, pagination, and data manipulation
 */

/**
 * Build pagination options
 */
export const buildPaginationOptions = (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    return {
        skip,
        limit: parseInt(limit),
        page: parseInt(page)
    };
};

/**
 * Build sort options from query string
 * @param {string} sortBy - Field to sort by (prefix with - for descending)
 * @returns {object} - Mongoose sort object
 */
export const buildSortOptions = (sortBy = '-createdAt') => {
    const sortOptions = {};
    if (sortBy.startsWith('-')) {
        sortOptions[sortBy.substring(1)] = -1;
    } else {
        sortOptions[sortBy] = 1;
    }
    return sortOptions;
};

/**
 * Build filter query from request query parameters
 */
export const buildFilterQuery = (filters = {}) => {
    const query = {};

    Object.keys(filters).forEach(key => {
        const value = filters[key];

        // Skip empty values
        if (value === null || value === undefined || value === '') {
            return;
        }

        // Handle special filter types
        if (key.endsWith('_min')) {
            const field = key.replace('_min', '');
            query[field] = { ...query[field], $gte: value };
        } else if (key.endsWith('_max')) {
            const field = key.replace('_max', '');
            query[field] = { ...query[field], $lte: value };
        } else if (key.endsWith('_like')) {
            const field = key.replace('_like', '');
            query[field] = { $regex: value, $options: 'i' };
        } else if (key.endsWith('_in')) {
            const field = key.replace('_in', '');
            query[field] = { $in: Array.isArray(value) ? value : [value] };
        } else {
            query[key] = value;
        }
    });

    return query;
};

/**
 * Build date range filter
 */
export const buildDateRangeFilter = (field, startDate, endDate) => {
    const filter = {};

    if (startDate || endDate) {
        filter[field] = {};
        if (startDate) filter[field].$gte = new Date(startDate);
        if (endDate) filter[field].$lte = new Date(endDate);
    }

    return filter;
};

/**
 * Execute paginated query
 */
export const executePaginatedQuery = async (
    model,
    filter = {},
    options = {}
) => {
    const {
        page = 1,
        limit = 10,
        sort = '-createdAt',
        populate = null,
        select = null
    } = options;

    const { skip, limit: parsedLimit } = buildPaginationOptions(page, limit);
    const sortOptions = buildSortOptions(sort);

    let query = model.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(parsedLimit);

    if (populate) {
        query = query.populate(populate);
    }

    if (select) {
        query = query.select(select);
    }

    const [data, total] = await Promise.all([
        query.exec(),
        model.countDocuments(filter)
    ]);

    return {
        data,
        pagination: {
            page: parseInt(page),
            limit: parsedLimit,
            total,
            pages: Math.ceil(total / parsedLimit)
        }
    };
};

/**
 * Calculate aggregate statistics
 */
export const calculateStats = async (model, field, filter = {}) => {
    const stats = await model.aggregate([
        { $match: filter },
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
                total: { $sum: `$${field}` },
                avg: { $avg: `$${field}` },
                min: { $min: `$${field}` },
                max: { $max: `$${field}` }
            }
        }
    ]);

    return stats[0] || { count: 0, total: 0, avg: 0, min: 0, max: 0 };
};

/**
 * Group by field and count
 */
export const groupByAndCount = async (model, field, filter = {}) => {
    return await model.aggregate([
        { $match: filter },
        {
            $group: {
                _id: `$${field}`,
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } }
    ]);
};

/**
 * Search across multiple fields
 */
export const buildSearchQuery = (searchTerm, fields = []) => {
    if (!searchTerm || fields.length === 0) return {};

    return {
        $or: fields.map(field => ({
            [field]: { $regex: searchTerm, $options: 'i' }
        }))
    };
};

export default {
    buildPaginationOptions,
    buildSortOptions,
    buildFilterQuery,
    buildDateRangeFilter,
    executePaginatedQuery,
    calculateStats,
    groupByAndCount,
    buildSearchQuery
};
