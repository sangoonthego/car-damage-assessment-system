import { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface UseFiltersReturn<T> {
    filters: T;
    setFilter: (key: keyof T, value: any) => void;
    setFilters: (filters: Partial<T>) => void;
    resetFilters: () => void;
    clearFilter: (key: keyof T) => void;
}

/**
 * Hook for filter state management with URL sync
 */
export const useFilters = <T extends Record<string, any>>(
    initialFilters: T,
    syncWithUrl: boolean = false
): UseFiltersReturn<T> => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize from URL if sync is enabled
    const getInitialFilters = (): T => {
        if (!syncWithUrl) return initialFilters;

        const urlFilters: any = { ...initialFilters };
        searchParams.forEach((value, key) => {
            if (key in initialFilters) {
                urlFilters[key] = value;
            }
        });
        return urlFilters;
    };

    const [filters, setFiltersState] = useState<T>(getInitialFilters());

    // Update URL when filters change
    const updateUrl = useCallback((newFilters: T) => {
        if (!syncWithUrl) return;

        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                params.set(key, String(value));
            }
        });
        setSearchParams(params);
    }, [syncWithUrl, setSearchParams]);

    const setFilter = useCallback((key: keyof T, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFiltersState(newFilters);
        updateUrl(newFilters);
    }, [filters, updateUrl]);

    const setFilters = useCallback((newFilters: Partial<T>) => {
        const updatedFilters = { ...filters, ...newFilters };
        setFiltersState(updatedFilters);
        updateUrl(updatedFilters);
    }, [filters, updateUrl]);

    const resetFilters = useCallback(() => {
        setFiltersState(initialFilters);
        updateUrl(initialFilters);
    }, [initialFilters, updateUrl]);

    const clearFilter = useCallback((key: keyof T) => {
        const newFilters = { ...filters };
        delete newFilters[key];
        setFiltersState(newFilters);
        updateUrl(newFilters);
    }, [filters, updateUrl]);

    return {
        filters,
        setFilter,
        setFilters,
        resetFilters,
        clearFilter
    };
};

export default useFilters;
