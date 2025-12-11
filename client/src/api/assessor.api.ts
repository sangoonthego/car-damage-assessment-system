import apiClient from './api.config';
import type {
    QueueItem,
    QueueFilters,
    PaginatedApiResponse,
    ApiResponse,
    DamageReport,
    AssessorStatsData,
    Notification,
    SubmitReviewRequest
} from './types';

/**
 * Assessor API Service
 */

/**
 * Get assessment queue with filters
 */
export const getAssessmentQueue = async (filters: QueueFilters = {}): Promise<PaginatedApiResponse<QueueItem>> => {
    const response = await apiClient.get<any, PaginatedApiResponse<QueueItem>>('/assessor/queue', {
        params: filters
    });
    return response;
};

/**
 * Claim an assessment
 */
export const claimAssessment = async (id: string): Promise<ApiResponse<DamageReport>> => {
    const response = await apiClient.post<any, ApiResponse<DamageReport>>(`/assessor/claim/${id}`);
    return response;
};

/**
 * Update assessment
 */
export const updateAssessment = async (id: string, data: Partial<DamageReport>): Promise<ApiResponse<DamageReport>> => {
    const response = await apiClient.put<any, ApiResponse<DamageReport>>(`/assessor/assessment/${id}`, data);
    return response;
};

/**
 * Submit review
 */
export const submitReview = async (id: string, data: SubmitReviewRequest): Promise<ApiResponse<DamageReport>> => {
    const response = await apiClient.post<any, ApiResponse<DamageReport>>(`/assessor/submit/${id}`, data);
    return response;
};

/**
 * Get personal statistics
 */
export const getAssessorStats = async (period: string = '30d'): Promise<AssessorStatsData> => {
    const response = await apiClient.get<any, ApiResponse<AssessorStatsData>>('/assessor/stats', {
        params: { period }
    });
    return response.data!;
};

/**
 * Get notifications
 */
export const getNotifications = async (page: number = 1, limit: number = 20, unreadOnly: boolean = false): Promise<PaginatedApiResponse<Notification>> => {
    const response = await apiClient.get<any, PaginatedApiResponse<Notification>>('/assessor/notifications', {
        params: { page, limit, unreadOnly }
    });
    return response;
};

/**
 * Mark notification as read
 */
export const markNotificationRead = async (id: string): Promise<ApiResponse<Notification>> => {
    const response = await apiClient.put<any, ApiResponse<Notification>>(`/assessor/notifications/${id}/read`);
    return response;
};

export default {
    getAssessmentQueue,
    claimAssessment,
    updateAssessment,
    submitReview,
    getAssessorStats,
    getNotifications,
    markNotificationRead
};
