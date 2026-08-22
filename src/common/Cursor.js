import { useEffect, useRef, useState } from 'react';
import './cursor.css';

/* Dot tracks the pointer directly, ring lerps behind it and swells
   over interactive elements. Fine pointers only. */
const Cursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const [enabled] = useState(() =>
        typeof window !== 'undefined' &&
        window.matchMedia('(pointer: fine)').matches &&
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );

    useEffect(() => {
        if (!enabled) return undefined;
        const root = document.documentElement;
        root.classList.add('fx-cursor');

        const dot = dotRef.current;
        const ring = ringRef.current;

        let mx = -100, my = -100, rx = -100, ry = -100;
        let raf = 0, seen = false, lastMove = 0;

        const loop = () => {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0) translate(-50%, -50%)`;
            if (Math.abs(mx - rx) < 0.15 && Math.abs(my - ry) < 0.15 && performance.now() - lastMove > 300) {
                raf = 0;
                return;
            }
            raf = requestAnimationFrame(loop);
        };

        const onMove = (e) => {
            mx = e.clientX;
            my = e.clientY;
            lastMove = performance.now();
            if (!seen) { seen = true; rx = mx; ry = my; dot.style.opacity = 1; ring.style.opacity = 1; }
            dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
            if (!raf) raf = requestAnimationFrame(loop);
        };

        const HOVERABLE = 'a, button, [role="button"], input, textarea, select, label';
        const onOver = (e) => { if (e.target.closest(HOVERABLE)) ring.classList.add('is-hover'); };
        const onOut = (e) => { if (e.target.closest(HOVERABLE)) ring.classList.remove('is-hover'); };
        const onLeave = () => { dot.style.opacity = 0; ring.style.opacity = 0; };
        const onEnter = () => { if (seen) { dot.style.opacity = 1; ring.style.opacity = 1; } };

        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);
        root.addEventListener('mouseleave', onLeave);
        root.addEventListener('mouseenter', onEnter);

        return () => {
            root.classList.remove('fx-cursor');
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
            root.removeEventListener('mouseleave', onLeave);
            root.removeEventListener('mouseenter', onEnter);
            if (raf) cancelAnimationFrame(raf);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <div className="fx-ring" ref={ringRef} aria-hidden="true" />
            <div className="fx-dot" ref={dotRef} aria-hidden="true" />
        </>
    );
};

export default Cursor;
