import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import usePageTracker from './useTracker';

function LayoutWithTracker({ children }) {
    const { pathname, hash } = useLocation();
    usePageTracker();

    useEffect(() => {
        if (hash) return;
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, [pathname, hash]);

    return <>{children}</>;
}

export default LayoutWithTracker;
