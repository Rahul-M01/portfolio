import { useEffect, useState } from 'react';
import './launch-intro.css';

let played = false;
function shouldPlay() {
    if (played || window.location.hash || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try { return !sessionStorage.getItem('portfolio-launch-v3'); } catch { return true; }
}
export default function LaunchIntro() {
    const [visible, setVisible] = useState(shouldPlay);
    useEffect(() => {
        if (!visible) return undefined;
        played = true;
        try { sessionStorage.setItem('portfolio-launch-v3', '1'); } catch { /* Private mode: in-memory flag is enough. */ }
        const timer = setTimeout(() => setVisible(false), 2650);
        const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const stop = () => { if (motion.matches) setVisible(false); };
        motion.addEventListener('change', stop);
        return () => { clearTimeout(timer); motion.removeEventListener('change', stop); };
    }, [visible]);
    if (!visible) return null;
    return <div className="launch-intro" aria-label="Launch introduction">
        <button className="launch-skip" onClick={() => setVisible(false)}>Skip intro <span aria-hidden="true">↗</span></button>
        <div className="launch-streaks" aria-hidden="true">{Array.from({ length: 22 }, (_, i) => <i key={i} style={{ '--x': `${(i * 37.13) % 100}%`, '--delay': `${(i % 6) * -0.18}s`, '--length': `${35 + i % 5 * 24}px` }} />)}</div>
        <div className="launch-horizon" aria-hidden="true" />
        <div className="launch-vehicle" aria-hidden="true">
            <svg className="launch-rocket" viewBox="0 0 100 220" fill="none">
                <defs><linearGradient id="rocket-body"><stop stopColor="#727a87" /><stop offset=".38" stopColor="#f3f0e9" /><stop offset=".65" stopColor="#c7c9cf" /><stop offset="1" stopColor="#535b6b" /></linearGradient><linearGradient id="rocket-nose" x2="0" y2="1"><stop stopColor="#e5e1d8" /><stop offset="1" stopColor="#949ba6" /></linearGradient></defs>
                <path d="M30 130 12 169v28l23-13M70 130l18 39v28l-23-13" fill="#596372" stroke="#9ba5b4" />
                <path d="M29 80Q29 37 50 9q21 28 21 71v101H29Z" fill="url(#rocket-body)" />
                <path d="M29 80Q29 37 50 9q21 28 21 71Z" fill="url(#rocket-nose)" />
                <path d="M29 82h42M29 151h42" stroke="#525d6b" strokeWidth="3" />
                <circle cx="50" cy="102" r="10" fill="#172733" stroke="#f1e6cd" strokeWidth="3" />
                <circle cx="48" cy="99" r="4" fill="#52728a" />
                <path d="M36 181h28l5 15H31Z" fill="#2d3542" stroke="#939ca9" />
                <path d="M50 142v58" stroke="#e5e3de" strokeWidth="4" />
            </svg>
            <div className="launch-flame"><i /><b /></div>
            <div className="launch-plume" />
        </div>
        <div className="launch-caption"><span>Rahul Mahajan</span><p>Software developer in Cardiff</p><div className="launch-progress"><i /></div></div>
    </div>;
}
