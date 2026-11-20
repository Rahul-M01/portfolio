import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function ProjectReel({ projects, selected, onSelect, onReset }) {
    const viewport = useRef(null);
    const direction = useRef(1);
    const [paused, setPaused] = useState(false);
    const [interacting, setInteracting] = useState(false);
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(true);
    const [reduced, setReduced] = useState(() => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false);

    useEffect(() => {
        const media = window.matchMedia?.('(prefers-reduced-motion: reduce)');
        const sync = () => setReduced(media.matches);
        media?.addEventListener?.('change', sync);
        const observer = typeof IntersectionObserver !== 'undefined' && new IntersectionObserver(
            ([entry]) => setVisible(entry.isIntersecting)
        );
        if (observer) observer.observe(viewport.current);
        return () => { media?.removeEventListener?.('change', sync); if (observer) observer.disconnect(); };
    }, []);

    useEffect(() => {
        if (paused || interacting || focused || reduced || !visible) return undefined;
        const el = viewport.current;
        let frame;
        let last;
        let position = el.scrollLeft;
        function advance(time) {
            if (last !== undefined) {
                const limit = el.scrollWidth - el.clientWidth;
                const distance = Math.min(time - last, 40) * .065;
                position = Math.max(0, Math.min(limit, position + direction.current * distance));
                el.scrollLeft = position;
                if (limit > 0 && (position >= limit || position <= 0)) direction.current = position >= limit ? -1 : 1;
            }
            last = time;
            frame = requestAnimationFrame(advance);
        }
        function sync() {
            cancelAnimationFrame(frame);
            last = undefined;
            position = el.scrollLeft;
            if (!document.hidden) frame = requestAnimationFrame(advance);
        }
        sync();
        document.addEventListener('visibilitychange', sync);
        return () => { cancelAnimationFrame(frame); document.removeEventListener('visibilitychange', sync); };
    }, [paused, interacting, focused, reduced, visible]);

    useLayoutEffect(() => {
        if (selected === null) return;
        const el = viewport.current;
        setPaused(true);
        const tile = el.children[selected];
        el.scrollTo?.({ left: tile.offsetLeft - (el.clientWidth - tile.offsetWidth) / 2, behavior: reduced ? 'instant' : 'smooth' });
    }, [selected, reduced]);

    function step(sign) {
        setPaused(true);
        const el = viewport.current;
        const max = el.scrollWidth - el.clientWidth;
        const wrapped = sign > 0 ? el.scrollLeft >= max - 2 : el.scrollLeft <= 2;
        const left = wrapped ? (sign > 0 ? 0 : max) : el.scrollLeft + sign * (el.children[1].offsetLeft - el.children[0].offsetLeft);
        el.scrollTo({ left, behavior:reduced ? 'instant' : 'smooth' });
        direction.current = sign;
    }

    return <section className="work-reel" aria-labelledby="reel-heading" id="selected-work">
        <div className="reel-head"><h2 id="reel-heading">Selected <em>work.</em></h2>
            <div className="reel-controls">
                {selected !== null && <button className="reel-reset" onClick={onReset}>Overview</button>}
                {!reduced && <button aria-label={paused ? 'Play project reel' : 'Pause project reel'} onClick={() => setPaused(!paused)}>
                    <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span>
                </button>}
                <button aria-label="Scroll projects left" onClick={() => step(-1)}>←</button>
                <button aria-label="Scroll projects right" onClick={() => step(1)}>→</button>
            </div>
        </div>
        <div className="reel-window" ref={viewport} data-lenis-prevent-touch=""
            onPointerEnter={e => { if (e.pointerType === 'mouse') setInteracting(true); }}
            onPointerLeave={() => setInteracting(false)}
            onPointerDown={e => { if (e.pointerType !== 'mouse') setPaused(true); }}
            onWheel={e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey) setPaused(true); }}
            onFocus={() => setFocused(true)}
            onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false); }}>
            {projects.map((project,i) => <button key={project.href} className="reel-tile" aria-label={'Preview ' + project.title}
                aria-pressed={i === selected} onClick={() => { setPaused(true); onSelect(i, true); }}>
                <img alt="" src={project.photo.small} style={{objectPosition:project.photo.focus}} />
                <span className="reel-caption"><strong>{project.title}</strong><small>{project.tag}</small></span>
            </button>)}
        </div>
    </section>;
}
