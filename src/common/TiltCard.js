import React, { useRef } from 'react';

const reduceMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const finePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches;

/**
 * Card wrapper that feeds --mx/--my (cursor glow position) and a gentle
 * 3D tilt via --rx/--ry custom properties. Pure CSS does the rendering,
 * so this stays cheap even with many cards on screen. Tilt is skipped
 * for touch pointers and under reduced motion; the cursor glow still works.
 */
const TiltCard = ({ className = '', style, children, ...rest }) => {
    const ref = useRef(null);

    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
        if (reduceMotion() || !finePointer()) return;
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty('--rx', `${(-py * 4).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(px * 6).toFixed(2)}deg`);
    };

    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
    };

    return (
        <div
            ref={ref}
            className={className}
            style={style}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            {...rest}
        >
            {children}
        </div>
    );
};

export default TiltCard;
