import { useState, useCallback } from 'react';

export interface PaginationState {
    page: number;
    limit: number;
}

export interface UsePaginationReturn {
    page: number;
    limit: number;
    setPage: (page: number) => void;
    setLimit: (limit: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    goToPage: (page: number) => void;
    reset: () => void;
}

/**
 * Hook for pagination state management
 */
export const usePagination = (
    initialPage: number = 1,
    initialLimit: number = 10
): UsePaginationReturn => {
    const [page, setPage] = useState(initialPage);
    const [limit, setLimit] = useState(initialLimit);

    const nextPage = useCallback(() => {
        setPage(prev => prev + 1);
    }, []);

    const prevPage = useCallback(() => {
        setPage(prev => Math.max(1, prev - 1));
    }, []);

    const goToPage = useCallback((newPage: number) => {
        setPage(Math.max(1, newPage));
    }, []);

    const reset = useCallback(() => {
        setPage(initialPage);
        setLimit(initialLimit);
    }, [initialPage, initialLimit]);

    return {
        page,
        limit,
        setPage,
        setLimit,
        nextPage,
        prevPage,
        goToPage,
        reset
    };
};

export default usePagination;
