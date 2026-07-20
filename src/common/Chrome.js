import React, { useEffect } from 'react';
import './chrome.css';

const Chrome = ({ pageA = '138, 43, 226', pageB = '47, 248, 255' }) => {
    useEffect(() => {
        const root = document.documentElement;
        root.style.setProperty('--page-a', pageA);
        root.style.setProperty('--page-b', pageB);
    }, [pageA, pageB]);

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

    useEffect(() => {
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const ring = document.createElement('div');
        ring.className = 'cursor-ring';
        const dot = document.createElement('div');
        dot.className = 'cursor-dot';
        document.body.appendChild(ring);
        document.body.appendChild(dot);

        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let rx = x;
        let ry = y;
        let raf;

        const onMove = (e) => { x = e.clientX; y = e.clientY; };
        const loop = () => {
            dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
            rx += (x - rx) * 0.16;
            ry += (y - ry) * 0.16;
            ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
            raf = requestAnimationFrame(loop);
        };

        const isInteractive = (t) => t && t.closest && t.closest('a, button, .project-card, .feature-card, .skill-pill');
        const onOver = (e) => { if (isInteractive(e.target)) ring.classList.add('hov'); };
        const onOut = (e) => { if (!isInteractive(e.relatedTarget)) ring.classList.remove('hov'); };

        window.addEventListener('mousemove', onMove);
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);
        loop();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
            ring.remove();
            dot.remove();
        };
    }, []);

    useEffect(() => {
        const bar = document.createElement('div');
        bar.className = 'scroll-bar';
        document.body.appendChild(bar);
        const onScroll = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            const r = h > 0 ? window.scrollY / h : 0;
            bar.style.transform = `scaleX(${r})`;
        };
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            bar.remove();
        };
    }, []);

    return (
        <>
            <div className="aurora" aria-hidden />
            <div className="grid-lines" aria-hidden />
        </>
    );
};

export default Chrome;
