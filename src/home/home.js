import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './home.css';
import Header from '../header/header';
import Footer from '../footer/Footer';
import Chrome from '../common/Chrome';
import discordLogo from '../images/discord.png';
import homelabLogo from '../images/homelab.png';
import videoLogo from '../images/video.png';
import drishtiLogo from '../images/drishti.png';

const services = [
    {
        title: 'Bhima',
        tag: 'Discord bot',
        desc: 'Moderation, music, poker, blackjack, leveling, polls, translation and live analytics. Runs 24/7 on the homelab.',
        href: '/bot',
        img: discordLogo,
        hue: '#7d8cff',
        stack: ['Node.js', 'Discord.js', 'SQL'],
    },
    {
        title: 'Agni',
        tag: 'Homelab',
        desc: 'Self-hosted personal cloud, media server and networking stack. Nextcloud, Plex and secure remote access.',
        href: '/homelab',
        img: homelabLogo,
        hue: '#ff7a45',
        stack: ['Docker', 'Nginx', 'Linux'],
    },
    {
        title: 'Drishyam',
        tag: 'Video platform',
        desc: 'Browser-native video host that also auto-downloads content from a pasted link. Built for quick personal archives.',
        href: '/drishyam',
        img: videoLogo,
        hue: '#2ff8ff',
        stack: ['React', 'FFmpeg', 'Node'],
    },
];

const desktopApps = [
    {
        title: 'Lekhak',
        tag: 'Notes and tasks',
        desc: 'Privacy-first desktop tasks, rich notes and scheduled reminders. Local SQLite, system tray, dark and light themes.',
        href: '/lekhak',
        mono: 'ल',
        hue: '#e8e4d8',
        stack: ['Electron', 'React 19', 'Tailwind', 'SQLite'],
    },
    {
        title: 'Kubera',
        tag: 'Finance tracker',
        desc: 'Open banking dashboard with balances, spend analytics, category budgets and recurring payment detection. Stays on your machine.',
        href: '/kubera',
        mono: '₹',
        hue: '#f5c518',
        stack: ['Electron', 'Express', 'SQLite'],
    },
    {
        title: 'Yudhishtra',
        tag: 'Code auditor',
        desc: 'Offline analyser for local git repos. Scans for vulnerabilities, generates tests and suggests next steps via Ollama.',
        href: '/yudhishtra',
        mono: 'यु',
        hue: '#6b7bff',
        stack: ['Electron', 'React', 'TypeScript', 'SQLite', 'Ollama'],
    },
    {
        title: 'Drishti',
        tag: 'Health monitor',
        desc: 'Collects Prometheus metrics from every service on the lab into a single desktop dashboard.',
        href: '/drishti',
        img: drishtiLogo,
        hue: '#4fd1c5',
        stack: ['Electron', 'Express', 'Prometheus'],
    },
];

const experiments = [
    {
        title: 'Simulation',
        tag: 'Browser demo',
        desc: 'Interactive simulation with physics, particles and playful maths. Hosted on GitHub Pages.',
        href: 'https://rahul-m01.github.io/simulation/',
        external: true,
        mono: '∿',
        hue: '#ff2d87',
        stack: ['JavaScript', 'Canvas', 'WebGL'],
    },
];

const allProjects = [...services, ...desktopApps, ...experiments];

const elsewhere = [
    {
        title: 'Gravitational-wave analysis',
        note: 'MSc thesis. Machine-learning methods for binary black-hole and neutron-star data.',
    },
    {
        title: 'Stock-market analysis pipeline',
        note: '20 years of market data, 30+ engineered indicators, walk-forward validation.',
    },
    {
        title: 'AI game development',
        note: 'Won two international AI game-development competitions.',
    },
];

const skillGroups = [
    {
        label: 'Languages',
        items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'C++', 'C', 'Go'],
    },
    {
        label: 'Frameworks',
        items: ['Spring Boot', 'Angular', 'React', 'Django', 'Electron'],
    },
    {
        label: 'Data',
        items: ['PostgreSQL', 'MySQL', 'SQLite', 'NumPy', 'Pandas', 'scikit-learn', 'TensorFlow'],
    },
    {
        label: 'Infra & testing',
        items: ['Docker', 'Kubernetes', 'Azure Pipelines', 'Selenium', 'Playwright', 'Cucumber', 'Git', 'Linux'],
    },
];

const reduceMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const finePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches;

/* ---------------------------------------------------------
   Cursor-tracked preview panel
   --------------------------------------------------------- */
const Preview = ({ active }) => {
    const wrapRef = useRef(null);
    const stateRef = useRef({ x: 0, y: 0, tx: 0, ty: 0, raf: 0, on: false });

    useEffect(() => {
        if (!finePointer() || reduceMotion()) return;
        const s = stateRef.current;
        s.x = window.innerWidth * 0.7;
        s.y = window.innerHeight * 0.5;
        s.tx = s.x;
        s.ty = s.y;

        const onMove = (e) => { s.tx = e.clientX; s.ty = e.clientY; };

        const loop = () => {
            s.x += (s.tx - s.x) * 0.12;
            s.y += (s.ty - s.y) * 0.12;
            const el = wrapRef.current;
            if (el) {
                const skew = Math.max(-8, Math.min(8, (s.tx - s.x) * 0.35));
                el.style.transform =
                    `translate3d(${s.x}px, ${s.y}px, 0) translate(-50%, -50%) rotate(${skew * 0.35}deg) skewX(${skew * 0.2}deg)`;
            }
            s.raf = requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        s.raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', onMove);
            cancelAnimationFrame(s.raf);
        };
    }, []);

    return (
        <div
            ref={wrapRef}
            className={`preview ${active ? 'on' : ''}`}
            aria-hidden
        >
            {allProjects.map((p) => (
                <div
                    key={p.title}
                    className={`preview-panel ${active === p.title ? 'show' : ''}`}
                    style={{ '--hue': p.hue }}
                >
                    {p.img
                        ? <img src={p.img} alt="" />
                        : <span className="preview-glyph">{p.mono}</span>}
                    <span className="preview-name">{p.title}</span>
                </div>
            ))}
        </div>
    );
};

/* ---------------------------------------------------------
   Project row
   --------------------------------------------------------- */
const ProjectRow = ({ p, num, onEnter, onLeave }) => {
    const ref = useRef(null);
    const arrowRef = useRef(null);
    const magnet = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: 0, live: false });

    const spring = () => {
        const m = magnet.current;
        m.cx += (m.tx - m.cx) * 0.16;
        m.cy += (m.ty - m.cy) * 0.16;
        if (arrowRef.current) {
            arrowRef.current.style.transform =
                `translate3d(${m.cx.toFixed(2)}px, ${m.cy.toFixed(2)}px, 0)`;
        }
        const settled = Math.abs(m.tx - m.cx) < 0.1 && Math.abs(m.ty - m.cy) < 0.1;
        if (m.live || !settled) {
            m.raf = requestAnimationFrame(spring);
        } else {
            m.raf = 0;
        }
    };

    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--px', `${((e.clientX - r.left) / r.width) * 100}%`);

        const a = arrowRef.current;
        if (!a || reduceMotion()) return;
        const ar = a.getBoundingClientRect();
        const dx = e.clientX - (ar.left + ar.width / 2);
        const dy = e.clientY - (ar.top + ar.height / 2);
        const d = Math.hypot(dx, dy) || 1;
        const pull = Math.min(1, 220 / (d + 60));
        const m = magnet.current;
        m.tx = (dx / d) * 12 * pull;
        m.ty = (dy / d) * 12 * pull;
        m.live = true;
        if (!m.raf) m.raf = requestAnimationFrame(spring);
    };

    const releaseMagnet = () => {
        const m = magnet.current;
        m.tx = 0; m.ty = 0; m.live = false;
        if (!m.raf) m.raf = requestAnimationFrame(spring);
    };

    useEffect(() => () => {
        const m = magnet.current;
        if (m.raf) cancelAnimationFrame(m.raf);
    }, []);

    const inner = (
        <>
            <span className="row-num">{num}</span>

            <span className="row-main">
                <span className="row-titleline">
                    <span className="row-title" data-text={p.title}>
                        <span className="row-title-in">{p.title}</span>
                        <span className="row-title-out" aria-hidden>{p.title}</span>
                    </span>
                    <span className="row-tag">{p.tag}</span>
                </span>
                <span className="row-desc">{p.desc}</span>
            </span>

            <span className="row-stack">
                {p.stack.map((s) => <span key={s} className="row-chip">{s}</span>)}
            </span>

            <span className="row-end">
                <span className="row-arrow" ref={arrowRef} aria-hidden>
                    {p.external ? '↗' : '→'}
                </span>
            </span>

            <span className="row-sheen" aria-hidden />
        </>
    );

    const props = {
        ref,
        className: 'project-row fade-up',
        style: { '--hue': p.hue },
        onMouseEnter: () => onEnter(p.title),
        onMouseLeave: () => { releaseMagnet(); onLeave(); },
        onMouseMove: onMove,
    };

    if (p.external) {
        return <a href={p.href} target="_blank" rel="noreferrer" {...props}>{inner}</a>;
    }
    return <Link to={p.href} {...props}>{inner}</Link>;
};

const ProjectGroup = ({ id, numeral, title, sub, projects, start = 1, onEnter, onLeave }) => (
    <section className="work" id={id}>
        <div className="work-head fade-up">
            <span className="work-numeral">{numeral}</span>
            <h2 className="work-title">{title}</h2>
            <p className="work-sub">{sub}</p>
        </div>
        <div className="project-list">
            {projects.map((p, i) => (
                <ProjectRow
                    key={p.title}
                    p={p}
                    num={String(start + i).padStart(2, '0')}
                    onEnter={onEnter}
                    onLeave={onLeave}
                />
            ))}
        </div>
    </section>
);

/* ---------------------------------------------------------
   Hero name, per character reveal
   --------------------------------------------------------- */
const RevealName = ({ text, delay = 0, italic = false }) => (
    <span className={`rn-line ${italic ? 'rn-italic' : ''}`}>
        {text.split('').map((ch, i) => (
            <span className="rn-char" key={i} style={{ '--cd': `${delay + i * 34}ms` }}>
                {ch === ' ' ? ' ' : ch}
            </span>
        ))}
    </span>
);

/* ---------------------------------------------------------
   Pinned hero stage.

   One rAF-driven timeline owns everything that reacts to scroll
   across the hero: the variable-font axes, the compress-and-dock
   transform, and the fade of the surrounding chrome. Running it
   from a single handler avoids two listeners fighting over the
   same elements.
   --------------------------------------------------------- */
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const useHeroStage = ({ trackRef, pinRef, nameRef, topRef, progressRef, stage }) => {
    useEffect(() => {
        if (stage !== 'reveal') return;

        const track = trackRef.current;
        const pin = pinRef.current;
        const name = nameRef.current;
        const top = topRef.current;
        if (!track || !pin || !name) return;

        const chars = Array.from(name.querySelectorAll('.rn-char'));
        const isItalic = (el) => Boolean(el.closest('.rn-italic'));
        const setAxes = (el, opsz, wght) => {
            el.style.fontVariationSettings =
                `"opsz" ${opsz.toFixed(1)}, "wght" ${Math.round(wght * (isItalic(el) ? 0.62 : 1))}`;
        };

        const OPSZ_HI = 144, OPSZ_LO = 46;
        const WGHT_HI = 520, WGHT_LO = 260;
        const END_SCALE = 0.3;

        // Static fallback: no pinning, no timeline.
        const staticLayout = () => {
            track.classList.add('is-static');
            chars.forEach((c) => setAxes(c, OPSZ_HI, 440));
            name.style.transform = '';
            progressRef.current = 0;
        };

        if (reduceMotion() || !window.matchMedia('(min-width: 901px)').matches) {
            staticLayout();
            return;
        }

        track.classList.remove('is-static');

        // Where the name should end up: roughly the header brand slot.
        let dock = { x: 0, y: 0 };
        const measure = () => {
            const prev = name.style.transform;
            name.style.transform = 'none';
            const r = name.getBoundingClientRect();
            const pinRect = pin.getBoundingClientRect();
            // target: left gutter of the pin, just below the top bar
            const targetX = pinRect.left + parseFloat(getComputedStyle(pin).paddingLeft || '0');
            const targetY = pinRect.top + 26;
            dock = { x: targetX - r.left, y: targetY - r.top };
            name.style.transform = prev;
        };

        let raf = 0;
        let introDone = false;

        const apply = () => {
            raf = 0;
            const span = Math.max(1, track.offsetHeight - window.innerHeight);
            const p = clamp01(-track.getBoundingClientRect().top / span);
            const e = easeInOut(p);

            const scale = 1 - (1 - END_SCALE) * e;
            name.style.transform =
                `translate3d(${(dock.x * e).toFixed(2)}px, ${(dock.y * e).toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;
            name.style.letterSpacing = `${(-0.045 - 0.012 * e).toFixed(4)}em`;

            if (introDone) {
                const opsz = OPSZ_HI - (OPSZ_HI - OPSZ_LO) * e;
                const wght = WGHT_HI - (WGHT_HI - WGHT_LO) * e;
                chars.forEach((c) => setAxes(c, opsz, wght));
            }

            if (top) {
                top.style.opacity = String(clamp01(1 - p * 2.4));
                top.style.transform = `translate3d(0, ${(-18 * e).toFixed(1)}px, 0)`;
            }
            pin.style.setProperty('--stage', e.toFixed(4));
            progressRef.current = p;
        };

        const onScroll = () => {
            if (!raf) raf = requestAnimationFrame(apply);
        };
        const onResize = () => { measure(); onScroll(); };

        // Character intro: optical size and weight open up, staggered.
        const INTRO = 900, STEP = 42;
        const t0 = performance.now();
        let introRaf = 0;
        const intro = (now) => {
            const elapsed = now - t0;
            let done = true;
            chars.forEach((c, i) => {
                const local = clamp01((elapsed - i * STEP) / INTRO);
                if (local < 1) done = false;
                const k = 1 - Math.pow(1 - local, 3);
                setAxes(c, 12 + (OPSZ_HI - 12) * k, 220 + (WGHT_HI - 220) * k);
            });
            if (!done) {
                introRaf = requestAnimationFrame(intro);
            } else {
                introDone = true;
                apply();
            }
        };

        measure();
        apply();
        introRaf = requestAnimationFrame(intro);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        return () => {
            cancelAnimationFrame(raf);
            cancelAnimationFrame(introRaf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            name.style.transform = '';
            name.style.letterSpacing = '';
            if (top) { top.style.opacity = ''; top.style.transform = ''; }
        };
    }, [trackRef, pinRef, nameRef, topRef, progressRef, stage]);
};

/* ---------------------------------------------------------
   Hero space field.

   Three layers on one canvas, one rAF:
     1. starfield with depth parallax
     2. a binary inspiral throwing off two-armed spiral waves,
        which is the quadrupole pattern of a gravitational-wave
        source (the thing the MSc is actually about)
     3. a rocket that climbs as the hero stage advances

   Skipped entirely on touch and under reduced motion.
   --------------------------------------------------------- */
const HeroSpace = ({ progressRef }) => {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!finePointer() || reduceMotion()) return;
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const DPR = Math.min(2, window.devicePixelRatio || 1);
        const FRAME = 1000 / 40;

        let W = 0, H = 0, raf = 0, last = 0, visible = true;
        let mx = 0, my = 0, cx = 0, cy = 0;

        let stars = [];
        const LAYERS = [
            { count: 90, r: 0.6, alpha: 0.30, par: 6 },
            { count: 46, r: 0.9, alpha: 0.52, par: 14 },
            { count: 20, r: 1.3, alpha: 0.85, par: 26 },
        ];

        const seed = () => {
            stars = [];
            LAYERS.forEach((L, li) => {
                const n = Math.round(L.count * Math.min(1.4, (W * H) / 900000));
                for (let i = 0; i < n; i++) {
                    stars.push({
                        x: Math.random() * W,
                        y: Math.random() * H,
                        r: L.r * (0.6 + Math.random() * 0.8),
                        a: L.alpha * (0.5 + Math.random() * 0.5),
                        par: L.par,
                        tw: Math.random() * Math.PI * 2,
                        tws: 0.0006 + Math.random() * 0.0012,
                        layer: li,
                    });
                }
            });
        };

        const resize = () => {
            const r = wrap.getBoundingClientRect();
            W = Math.max(1, Math.floor(r.width));
            H = Math.max(1, Math.floor(r.height));
            canvas.width = W * DPR;
            canvas.height = H * DPR;
            canvas.style.width = W + 'px';
            canvas.style.height = H + 'px';
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            seed();
        };

        // ---- binary inspiral, drawn as a rotating two-arm spiral ----
        const drawWaves = (t, ox, oy) => {
            const gx = W * 0.72 + ox * 0.4;
            const gy = H * 0.42 + oy * 0.4;
            const spin = t * 0.00016;
            const maxR = Math.min(W, H) * 0.46;

            ctx.lineWidth = 1;
            for (let arm = 0; arm < 2; arm++) {
                ctx.beginPath();
                const phase = arm * Math.PI + spin;
                let started = false;
                for (let th = 0.35; th < Math.PI * 5.2; th += 0.09) {
                    const r = 10 + th * (maxR / 16);
                    if (r > maxR) break;
                    const x = gx + Math.cos(th + phase) * r;
                    const y = gy + Math.sin(th + phase) * r * 0.42;
                    if (!started) { ctx.moveTo(x, y); started = true; }
                    else ctx.lineTo(x, y);
                }
                const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, maxR);
                grad.addColorStop(0, 'rgba(232, 131, 74, 0.30)');
                grad.addColorStop(0.55, 'rgba(232, 131, 74, 0.09)');
                grad.addColorStop(1, 'rgba(232, 131, 74, 0)');
                ctx.strokeStyle = grad;
                ctx.stroke();
            }

            // the two orbiting masses at the centre
            const orbit = 9;
            for (let m = 0; m < 2; m++) {
                const a = spin * 7 + m * Math.PI;
                const x = gx + Math.cos(a) * orbit;
                const y = gy + Math.sin(a) * orbit * 0.42;
                ctx.beginPath();
                ctx.arc(x, y, 1.7, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 214, 184, 0.85)';
                ctx.fill();
            }
        };

        // ---- rocket, climbing with stage progress ----
        const exhaust = [];
        const drawRocket = (t, p) => {
            if (p <= 0.001) return;
            const x = W * (0.18 + 0.1 * p);
            const y = H * (1.12 - 1.32 * p);
            const tilt = -0.16 + Math.sin(t * 0.0012) * 0.05;
            const fade = p < 0.08 ? p / 0.08 : p > 0.92 ? (1 - p) / 0.08 : 1;
            if (fade <= 0) return;

            if (Math.random() < 0.7) {
                exhaust.push({ x, y, life: 1, r: 1.4 + Math.random() * 1.6, vx: (Math.random() - 0.5) * 0.3 });
            }
            for (let i = exhaust.length - 1; i >= 0; i--) {
                const e = exhaust[i];
                e.life -= 0.022;
                e.y += 0.7;
                e.x += e.vx;
                if (e.life <= 0) { exhaust.splice(i, 1); continue; }
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.r * e.life, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(232, 131, 74, ${(0.30 * e.life * fade).toFixed(3)})`;
                ctx.fill();
            }

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(tilt);
            ctx.strokeStyle = `rgba(242, 240, 236, ${(0.75 * fade).toFixed(3)})`;
            ctx.lineWidth = 1.1;
            ctx.lineJoin = 'round';
            ctx.beginPath();
            ctx.moveTo(0, -16);
            ctx.bezierCurveTo(6, -6, 6, 6, 4.5, 13);
            ctx.lineTo(-4.5, 13);
            ctx.bezierCurveTo(-6, 6, -6, -6, 0, -16);
            ctx.closePath();
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(-4.5, 8); ctx.lineTo(-9, 16); ctx.lineTo(-4.5, 14);
            ctx.moveTo(4.5, 8);  ctx.lineTo(9, 16);  ctx.lineTo(4.5, 14);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, -2.5, 2.4, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(232, 131, 74, ${(0.9 * fade).toFixed(3)})`;
            ctx.stroke();
            ctx.restore();
        };

        const step = (now) => {
            raf = requestAnimationFrame(step);
            if (!visible || now - last < FRAME) return;
            last = now;

            cx += (mx - cx) * 0.05;
            cy += (my - cy) * 0.05;
            const ox = cx / (W || 1) - 0.5;
            const oy = cy / (H || 1) - 0.5;

            ctx.clearRect(0, 0, W, H);

            for (let i = 0; i < stars.length; i++) {
                const s2 = stars[i];
                s2.tw += s2.tws * 16;
                const tw = 0.72 + Math.sin(s2.tw) * 0.28;
                const px = s2.x - ox * s2.par;
                const py = s2.y - oy * s2.par;
                ctx.beginPath();
                ctx.arc(px, py, s2.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(242, 240, 236, ${(s2.a * tw).toFixed(3)})`;
                ctx.fill();
            }

            drawWaves(now, ox * 40, oy * 40);
            drawRocket(now, progressRef.current || 0);
        };

        const onMouse = (e) => {
            const r = canvas.getBoundingClientRect();
            mx = e.clientX - r.left;
            my = e.clientY - r.top;
        };

        const io = new IntersectionObserver(
            (es) => es.forEach((e) => { visible = e.isIntersecting; }),
            { threshold: 0.01 }
        );
        io.observe(wrap);

        resize();
        mx = W / 2; my = H / 2; cx = mx; cy = my;
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouse, { passive: true });
        raf = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouse);
        };
    }, [progressRef]);

    return (
        <div className="hero-field" ref={wrapRef} aria-hidden>
            <canvas ref={canvasRef} />
        </div>
    );
};

const MetaRow = ({ label, children }) => (
    <div className="meta-row">
        <span className="meta-label">{label}</span>
        <p className="meta-body">{children}</p>
    </div>
);

let introPlayed = false;

const Home = () => {
    const words = ["Hello", "مرحبًا", "नमस्ते", "Bonjour", "こんにちは"];
    const location = useLocation();
    const skipIntro = useRef(introPlayed || Boolean(location.hash));
    const [word, setWord] = useState('');
    const [stage, setStage] = useState(skipIntro.current ? 'reveal' : 'start');
    const [active, setActive] = useState(null);
    const nameRef = useRef(null);
    const trackRef = useRef(null);
    const pinRef = useRef(null);
    const topRef = useRef(null);
    const progressRef = useRef(0);

    useHeroStage({ trackRef, pinRef, nameRef, topRef, progressRef, stage });

    const onEnter = useCallback((t) => setActive(t), []);
    const onLeave = useCallback(() => setActive(null), []);

    useEffect(() => {
        if (skipIntro.current) return;
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);
        const t1 = setTimeout(() => setStage('drop'), 500);
        const t2 = setTimeout(() => setStage('zoom'), 1000);
        const t3 = setTimeout(() => { setStage('reveal'); introPlayed = true; }, 2000);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (stage !== 'reveal' || !location.hash) return;
        const id = location.hash.slice(1);
        const raf = requestAnimationFrame(() => {
            const el = document.getElementById(id);
            if (!el) return;
            window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
        });
        return () => cancelAnimationFrame(raf);
    }, [stage, location.hash]);

    return (
        <main>
            <div className="app">
                {(stage === 'start' || stage === 'drop') && <div className="hello-text">{word}</div>}
                {stage === 'drop' && <div className="drop"></div>}
                {stage === 'zoom' && <div className="hello-text zoom">{word}</div>}
                {stage === 'reveal' &&
                    <div className={`page-content ${active ? 'dimmed' : ''}`}>
                        <Chrome />
                        <Header />
                        <Preview active={active} />

                        <div className="hero-track" ref={trackRef}>
                        <section className="hero" ref={pinRef}>
                            <HeroSpace progressRef={progressRef} />
                            <div className="hero-top" ref={topRef}>
                                <span className="hero-avail">
                                    <span className="avail-dot" />
                                    Open to work
                                </span>
                                <span className="hero-loc">Cardiff, UK</span>
                            </div>

                            <h1 className="title" ref={nameRef}>
                                <RevealName text="Rahul" delay={0} />
                                <RevealName text="Mahajan." delay={260} italic />
                            </h1>

                            <div className="hero-meta">
                                <MetaRow label="Role">
                                    Software developer
                                </MetaRow>
                                <MetaRow label="At present">
                                    Two years of professional experience building full-stack features
                                    in Angular, Spring Boot and PostgreSQL, and the test automation
                                    around them.
                                </MetaRow>
                                <MetaRow label="Studying">
                                    Finishing an MSc in Data Intensive Astrophysics, applying machine
                                    learning to gravitational-wave data.
                                </MetaRow>
                                <MetaRow label="Colophon">
                                    Everything below is <span className="meta-hl">built and hosted by me</span>.
                                </MetaRow>
                            </div>

                        </section>
                        </div>

                        <section className="hero-after">
                            <div className="hero-index">
                                <a href="#work" className="index-link">
                                    <span className="index-n">01</span>
                                    <span className="index-l">Live services</span>
                                    <span className="index-c">3</span>
                                </a>
                                <a href="#apps" className="index-link">
                                    <span className="index-n">02</span>
                                    <span className="index-l">Desktop apps</span>
                                    <span className="index-c">4</span>
                                </a>
                                <a href="#experiments" className="index-link">
                                    <span className="index-n">03</span>
                                    <span className="index-l">Experiments</span>
                                    <span className="index-c">1</span>
                                </a>
                            </div>
                        </section>

                        <ProjectGroup
                            id="work" numeral="I" title="Live services"
                            sub="Deployed on my homelab and running right now."
                            projects={services} start={1}
                            onEnter={onEnter} onLeave={onLeave}
                        />

                        <ProjectGroup
                            id="apps" numeral="II" title="Desktop apps"
                            sub="Local-first tools I use daily. No accounts, no cloud."
                            projects={desktopApps} start={services.length + 1}
                            onEnter={onEnter} onLeave={onLeave}
                        />

                        <ProjectGroup
                            id="experiments" numeral="III" title="Experiments"
                            sub="Smaller browser builds."
                            projects={experiments}
                            start={services.length + desktopApps.length + 1}
                            onEnter={onEnter} onLeave={onLeave}
                        />

                        <section className="work" id="elsewhere">
                            <div className="work-head fade-up">
                                <span className="work-numeral">IV</span>
                                <h2 className="work-title">Elsewhere</h2>
                                <p className="work-sub">Work that doesn't have a page here.</p>
                            </div>
                            <div className="else-list">
                                {elsewhere.map((e) => (
                                    <div className="else-row fade-up" key={e.title}>
                                        <h3 className="else-title">{e.title}</h3>
                                        <p className="else-note">{e.note}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="skills" id="skills">
                            <div className="work-head fade-up">
                                <span className="work-numeral">V</span>
                                <h2 className="work-title">Stack</h2>
                                <p className="work-sub">What I work in.</p>
                            </div>
                            <div className="skill-groups">
                                {skillGroups.map((g) => (
                                    <div className="skill-group fade-up" key={g.label}>
                                        <h3 className="skill-label">{g.label}</h3>
                                        <ul className="skill-list">
                                            {g.items.map((s) => <li key={s}>{s}</li>)}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <Footer />
                    </div>}
            </div>
        </main>
    );
};

export default Home;
