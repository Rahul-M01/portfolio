import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import usePageTracker from './useTracker';
import { jumpTo } from '../common/smoothScroll';

function LayoutWithTracker({ children }) {
    const { pathname, hash } = useLocation();
    usePageTracker();

    useEffect(() => {
        if (hash) return;
        jumpTo(0);
    }, [pathname, hash]);

    return <>{children}</>;
}

export default LayoutWithTracker;
