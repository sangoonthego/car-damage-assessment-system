import { useState, useCallback } from "react";

type ApiError = string | null;

/**
 * Generic hook for POST API calls with FormData
 * T = expected response type
 */
const useApi = <T = any>(url: string) => {
    const [results, setResults] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<ApiError>(null);

    const postData = useCallback(
        async (formData: FormData | null) => {
            if (!formData) return;

            setLoading(true);
            setError(null);
            setResults(null);

            try {
                const response = await fetch(url, {
                    method: "POST",
                    body: formData,
                });

                if (!response.ok) {
                    const errData = await response.json().catch(() => ({
                        message: "Undefined Server Error!!!",
                    }));

                    throw new Error(errData.message || `HTTP error ${response.status}`);
                }

                const data: T = await response.json();
                setResults(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("Error occurs when calling API!!!");
                }
            } finally {
                setLoading(false);
            }
        },
        [url]
    );

    return { results, loading, error, postData };
};

export default useApi;
