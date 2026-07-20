import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Opt-in only. Without REACT_APP_TRACK_URL set at build time this is a no-op,
// so the deployed site makes no analytics requests and logs nothing.
const TRACK_URL = process.env.REACT_APP_TRACK_URL;

function usePageTracker() {
    const location = useLocation();

    useEffect(() => {
        if (!TRACK_URL) return;

        const controller = new AbortController();

        fetch(TRACK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path: location.pathname }),
            signal: controller.signal,
        }).catch(() => { /* tracking is best-effort; never surface to the user */ });

        return () => controller.abort();
    }, [location]);

    return null;
}

export default usePageTracker;
