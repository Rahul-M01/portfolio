import React from 'react';
import Footer from '../footer/Footer';

export default function UtilityLayout({ children }) {
    return <div className="site-page"><main tabIndex={-1} id="main-content" className="utility-main shell">{children}</main><Footer /></div>;
}
