import apiClient from './api.config';
import type {
    DashboardData,
    PaginatedApiResponse,
    User,
    UserFilters,
    UpdateUserRequest,
    DamageReport,
    AssessmentFilters,
    ApiResponse
} from './types';

/**
 * Admin API Service
 */

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (): Promise<DashboardData> => {
    const response = await apiClient.get<any, ApiResponse<DashboardData>>('/admin/dashboard');
    return response.data!;
};

/**
 * Get all users with pagination and filters
 */
export const getUsers = async (filters: UserFilters = {}): Promise<PaginatedApiResponse<User>> => {
    const response = await apiClient.get<any, PaginatedApiResponse<User>>('/admin/users', {
        params: filters
    });
    return response;
};

/**
 * Update user
 */
export const updateUser = async (id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> => {
    const response = await apiClient.put<any, ApiResponse<User>>(`/admin/users/${id}`, data);
    return response;
};

/**
 * Delete user
 */
export const deleteUser = async (id: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<any, ApiResponse<void>>(`/admin/users/${id}`);
    return response;
};

/**
 * Get all assessments with filters
 */
export const getAssessments = async (filters: AssessmentFilters = {}): Promise<PaginatedApiResponse<DamageReport>> => {
    const response = await apiClient.get<any, PaginatedApiResponse<DamageReport>>('/admin/assessments', {
        params: filters
    });
    return response;
};

/**
 * Get system analytics
 */
export const getAnalytics = async (period: string = '30d'): Promise<any> => {
    const response = await apiClient.get('/admin/analytics', {
        params: { period }
    });
    return response.data;
};

/**
 * Get activity logs
 */
export const getActivityLogs = async (page: number = 1, limit: number = 20): Promise<any> => {
    const response = await apiClient.get('/admin/activity-logs', {
        params: { page, limit }
    });
    return response;
};

export default {
    getDashboardStats,
    getUsers,
    updateUser,
    deleteUser,
    getAssessments,
    getAnalytics,
    getActivityLogs
};
