import { useState, useEffect, useCallback } from 'react';
import * as adminApi from '../api/admin.api';
import type {
    DashboardData,
    User,
    UserFilters,
    UpdateUserRequest,
    DamageReport,
    AssessmentFilters
} from '../api/types';

/**
 * Hook for admin dashboard statistics
 */
export const useAdminDashboard = () => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchDashboard = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await adminApi.getDashboardStats();
            setData(result);
        } catch (err: any) {
            setError(err.message || 'ダッシュボードの読み込みに失敗しました');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboard();
    }, [fetchDashboard]);

    return { data, loading, error, refetch: fetchDashboard };
};

/**
 * Hook for user management
 */
export const useUsers = (filters: UserFilters = {}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await adminApi.getUsers(filters);
            setUsers(result.data || []);
            setPagination(result.pagination);
        } catch (err: any) {
            setError(err.message || 'ユーザーの読み込みに失敗しました');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const updateUser = async (id: string, data: UpdateUserRequest) => {
        try {
            await adminApi.updateUser(id, data);
            await fetchUsers(); // Refresh list
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    const deleteUser = async (id: string) => {
        try {
            await adminApi.deleteUser(id);
            await fetchUsers(); // Refresh list
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    return {
        users,
        pagination,
        loading,
        error,
        refetch: fetchUsers,
        updateUser,
        deleteUser
    };
};

/**
 * Hook for assessment management
 */
export const useAssessments = (filters: AssessmentFilters = {}) => {
    const [assessments, setAssessments] = useState<DamageReport[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAssessments = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await adminApi.getAssessments(filters);
            setAssessments(result.data || []);
            setPagination(result.pagination);
        } catch (err: any) {
            setError(err.message || '評価の読み込みに失敗しました');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchAssessments();
    }, [fetchAssessments]);

    return {
        assessments,
        pagination,
        loading,
        error,
        refetch: fetchAssessments
    };
};

/**
 * Hook for analytics
 */
export const useAnalytics = (period: string = '30d') => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAnalytics = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await adminApi.getAnalytics(period);
            setData(result);
        } catch (err: any) {
            setError(err.message || '分析データの読み込みに失敗しました');
        } finally {
            setLoading(false);
        }
    }, [period]);

    useEffect(() => {
        fetchAnalytics();
    }, [fetchAnalytics]);

    return { data, loading, error, refetch: fetchAnalytics };
};

export default {
    useAdminDashboard,
    useUsers,
    useAssessments,
    useAnalytics
};
