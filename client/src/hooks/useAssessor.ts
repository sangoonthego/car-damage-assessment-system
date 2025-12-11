import { useState, useEffect, useCallback } from 'react';
import * as assessorApi from '../api/assessor.api';
import type {
    QueueItem,
    QueueFilters,
    AssessorStatsData,
    Notification,
    SubmitReviewRequest
} from '../api/types';

/**
 * Hook for assessment queue
 */
export const useAssessmentQueue = (filters: QueueFilters = {}) => {
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchQueue = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await assessorApi.getAssessmentQueue(filters);
            setQueue(result.data || []);
            setPagination(result.pagination);
        } catch (err: any) {
            setError(err.message || 'キューの読み込みに失敗しました');
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchQueue();
    }, [fetchQueue]);

    const claimAssessment = async (id: string) => {
        try {
            await assessorApi.claimAssessment(id);
            await fetchQueue(); // Refresh queue
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    return {
        queue,
        pagination,
        loading,
        error,
        refetch: fetchQueue,
        claimAssessment
    };
};

/**
 * Hook for assessment operations
 */
export const useAssessment = (id: string | null) => {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateAssessment = async (data: any) => {
        if (!id) return { success: false, error: 'IDが指定されていません' };

        try {
            setSubmitting(true);
            setError(null);
            await assessorApi.updateAssessment(id, data);
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setSubmitting(false);
        }
    };

    const submitReview = async (data: SubmitReviewRequest) => {
        if (!id) return { success: false, error: 'IDが指定されていません' };

        try {
            setSubmitting(true);
            setError(null);
            await assessorApi.submitReview(id, data);
            return { success: true };
        } catch (err: any) {
            setError(err.message);
            return { success: false, error: err.message };
        } finally {
            setSubmitting(false);
        }
    };

    return {
        submitting,
        error,
        updateAssessment,
        submitReview
    };
};

/**
 * Hook for assessor statistics
 */
export const useAssessorStats = (period: string = '30d') => {
    const [data, setData] = useState<AssessorStatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStats = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await assessorApi.getAssessorStats(period);
            setData(result);
        } catch (err: any) {
            setError(err.message || '統計の読み込みに失敗しました');
        } finally {
            setLoading(false);
        }
    }, [period]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { data, loading, error, refetch: fetchStats };
};

/**
 * Hook for notifications
 */
export const useNotifications = (unreadOnly: boolean = false) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [pagination, setPagination] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotifications = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const result = await assessorApi.getNotifications(1, 20, unreadOnly);
            setNotifications(result.data || []);
            setPagination(result.pagination);
        } catch (err: any) {
            setError(err.message || '通知の読み込みに失敗しました');
        } finally {
            setLoading(false);
        }
    }, [unreadOnly]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const markAsRead = async (id: string) => {
        try {
            await assessorApi.markNotificationRead(id);
            await fetchNotifications(); // Refresh list
            return { success: true };
        } catch (err: any) {
            return { success: false, error: err.message };
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return {
        notifications,
        pagination,
        loading,
        error,
        unreadCount,
        refetch: fetchNotifications,
        markAsRead
    };
};

export default {
    useAssessmentQueue,
    useAssessment,
    useAssessorStats,
    useNotifications
};
