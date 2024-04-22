import React from 'react';
import usePageTracker from './useTracker'; // Make sure the path is correct

function LayoutWithTracker({ children }) {
    usePageTracker();  // This hooks into the router context to track page views
    return <>{children}</>;  // Render children components
}

export default LayoutWithTracker;