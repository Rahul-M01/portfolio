import React, { useEffect } from 'react';
import './chrome.css';

const Chrome = ({ pageA = '37, 37, 34', pageB = '109, 106, 99' }) => {
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--page-a', pageA);
        root.style.setProperty('--page-b', pageB);
    }, [pageA, pageB]);

    useEffect(() => {
        const elements = document.querySelectorAll('.fade-up');

        if (typeof IntersectionObserver === 'undefined') {
            elements.forEach((element) => element.classList.add('in-view'));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -20px' }
        );

        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, []);

    return null;
};

export default Chrome;
