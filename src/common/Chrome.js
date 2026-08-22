import { useEffect } from 'react';
import './chrome.css';
import { initSmoothScroll } from './smoothScroll';
import Cursor from './Cursor';
import Cosmos from './Cosmos';

const Chrome = ({ pageA = '139, 92, 246', pageB = '47, 248, 255' }) => {
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--page-a', pageA);
        root.style.setProperty('--page-b', pageB);
    }, [pageA, pageB]);

    // Lenis smooth scroll, shared by all pages.
    useEffect(() => initSmoothScroll(), []);

    useEffect(() => {
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add('in-view');
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );
        const scan = () => {
            document.querySelectorAll('.fade-up:not(.in-view)').forEach((el) => obs.observe(el));
        };
        scan();
        const mo = new MutationObserver(scan);
        mo.observe(document.body, { childList: true, subtree: true });
        return () => { obs.disconnect(); mo.disconnect(); };
    }, []);

    return (
        <>
            <Cursor />
            <Cosmos />
        </>
    );
};

export default Chrome;
