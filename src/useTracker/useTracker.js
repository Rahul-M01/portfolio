import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTracker() {
    const location = useLocation();

    useEffect(() => {
        console.log(location);
        const trackPageView = () => {
            fetch('http://localhost:5000/track', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    path: location.pathname,
                }),
            }).then(response => response.text())
                .then(message => console.log(message))
                .catch(err => console.error('Error tracking page:', err));
        };

        trackPageView();
    }, [location]);

    return null;
}

export default usePageTracker;
