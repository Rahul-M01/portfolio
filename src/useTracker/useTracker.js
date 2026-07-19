import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTracker() {
    const location = useLocation();

    useEffect(() => {
        const trackingUrl = import.meta.env.VITE_TRACKING_URL;
        if (!trackingUrl) return;

        const controller = new AbortController();
        fetch(trackingUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ path: location.pathname }),
            signal: controller.signal,
        }).catch(() => {
            // Analytics must never interrupt navigation.
        });

        return () => controller.abort();
    }, [location.pathname]);

    return null;
}

export default usePageTracker;
