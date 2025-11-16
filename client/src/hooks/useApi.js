import { useState, useCallback } from 'react';

const useApi = (url) => {
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const postData = useCallback(async (formData) => {
        if (!formData) return;

        setLoading(true);
        setError(null);
        setResults(null);

        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({ message: 'Undefined Server Error!!!' }));
                throw new Error(errData.message || `HTTP error ${response.status}`);
            }

            const data = await response.json();
            setResults(data);

        } catch (err) {
            setError(err.message || 'Error occurs when calling API!!!');
        } finally {
            setLoading(false);
        }
    }, [url]);

    return { results, loading, error, postData };
};

export default useApi;
