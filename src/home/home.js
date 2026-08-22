import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, MotionConfig } from 'framer-motion';
import './home.css';
import Header from '../header/header';
import Footer from '../footer/Footer';
import Chrome from '../common/Chrome';
import { smoothTo } from '../common/smoothScroll';
import { identity, groups, elsewhere, skillGroups } from '../content/portfolio';

const EASE = [0.16, 1, 0.3, 1];

const reduceMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const finePointer = () =>
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches;

/* Project row: quiet editorial list item with a hue accent on hover. */
const ProjectRow = ({ p, num }) => {
    const ref = useRef(null);

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
                <span className="row-arrow" aria-hidden>
                    {p.external ? '↗' : '→'}
                </span>
            </span>
        </>
    );

    const props = {
        ref,
        className: 'project-row fade-up',
        style: { '--hue': p.hue },
    };

    if (p.external) {
        return <a href={p.href} target="_blank" rel="noreferrer" {...props}>{inner}</a>;
    }
    return <Link to={p.href} {...props}>{inner}</Link>;
};

/* Section head + list rows reveal via framer-motion whileInView. */
const headMotion = (i = 0) => ({
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '0px 0px -8% 0px' },
    transition: { duration: 0.85, ease: EASE, delay: i * 0.08 },
});

const ProjectGroup = ({ id, numeral, title, sub, projects, start = 1 }) => (
    <section className="work" id={id}>
        <motion.div className="work-head" {...headMotion()}>
            <span className="work-numeral">{numeral}</span>
            <h2 className="work-title">{title}</h2>
            <p className="work-sub">{sub}</p>
        </motion.div>
        <div className="project-list">
            {projects.map((p, i) => (
                <ProjectRow key={p.title} p={p} num={String(start + i).padStart(2, '0')} />
            ))}
        </div>
    </section>
);


const RevealName = ({ text, delay = 0, italic = false }) => {
    return (
        <span className={`rn-line ${italic ? 'rn-italic' : ''}`}>
            {text.split('').map((ch, i) => (
                <span className="rn-char" key={i} style={{ '--cd': `${delay + i * 34}ms` }}>
                    {ch === ' ' ? '\u00A0' : ch}
                </span>
            ))}
        </span>
    );
};


const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);

const useHeroName = (nameRef, active) => {
    useEffect(() => {
        if (!active) return undefined;
        const name = nameRef.current;
        if (!name) return undefined;

        const chars = Array.from(name.querySelectorAll('.rn-char'));
        if (!chars.length) return undefined;

        const isItalic = (el) => Boolean(el.closest('.rn-italic'));
        const setAxes = (el, opsz, wght) => {
            el.style.fontVariationSettings =
                `"opsz" ${opsz.toFixed(1)}, "wght" ${Math.round(wght * (isItalic(el) ? 0.62 : 1))}`;
        };

        const OPSZ_HI = 144, OPSZ_LO = 70;
        const WGHT_HI = 520, WGHT_LO = 330;

        if (reduceMotion()) {
            chars.forEach((c) => setAxes(c, OPSZ_HI, 440));
            return undefined;
        }

        let introDone = false;
        let raf = 0;
        let mx = -1e4, my = -1e4, pointerIn = false;

        // Scroll thins the base axes; the cursor blooms weight locally.
        const frame = () => {
            raf = 0;
            if (!introDone) return;
            const y = clamp01(window.scrollY / (window.innerHeight * 0.9));
            const bO = OPSZ_HI - (OPSZ_HI - OPSZ_LO) * y;
            const bW = WGHT_HI - (WGHT_HI - WGHT_LO) * y;
            let hot = false;
            chars.forEach((c) => {
                const r = c.getBoundingClientRect();
                const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
                const g = Math.exp(-(d * d) / (2 * 115 * 115));
                if (g > 0.02) hot = true;
                setAxes(c, bO + 48 * g, Math.min(600, bW + 320 * g));
            });
            if (pointerIn || hot) raf = requestAnimationFrame(frame);
        };
        const kick = () => { if (!raf && introDone) raf = requestAnimationFrame(frame); };
        const onScroll = () => kick();

        const INTRO = 900, STEP = 42;
        const t0 = performance.now();
        raf = requestAnimationFrame(function intro(now) {
            const elapsed = now - t0;
            let done = true;
            chars.forEach((c, i) => {
                const local = clamp01((elapsed - i * STEP) / INTRO);
                if (local < 1) done = false;
                const k = 1 - Math.pow(1 - local, 3);
                setAxes(c, 12 + (OPSZ_HI - 12) * k, 220 + (WGHT_HI - 220) * k);
            });
            if (!done) raf = requestAnimationFrame(intro);
            else {
                introDone = true;
                kick();
            }
        });

        const heroEl = name.closest('.hero');
        const onMove = (e) => { mx = e.clientX; my = e.clientY; kick(); };
        const onEnter = () => { pointerIn = true; kick(); };
        const onLeave = () => { pointerIn = false; mx = -1e4; my = -1e4; kick(); };

        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        if (heroEl && finePointer()) {
            heroEl.addEventListener('pointermove', onMove, { passive: true });
            heroEl.addEventListener('pointerenter', onEnter);
            heroEl.addEventListener('pointerleave', onLeave);
        }

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
            if (heroEl) {
                heroEl.removeEventListener('pointermove', onMove);
                heroEl.removeEventListener('pointerenter', onEnter);
                heroEl.removeEventListener('pointerleave', onLeave);
            }
        };
    }, [nameRef, active]);
};

/* Hero canvas: parallax starfield, two-arm inspiral waves, rocket
   that climbs with scroll progress. Disabled under reduced motion. */
const HeroSpace = () => {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (reduceMotion()) return;
        const wrap = wrapRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const DPR = Math.min(2, window.devicePixelRatio || 1);
        const FRAME = 1000 / 40;

        let W = 0, H = 0, raf = 0, last = 0, visible = true;
        let mx = 0, my = 0, cx = 0, cy = 0;
        let progress = 0;

        const readProgress = () => {
            const r = wrap.getBoundingClientRect();
            const span = Math.max(1, r.height);
            progress = Math.max(0, Math.min(1, -r.top / span));
        };

        let stars = [];
        const LAYERS = [
            { count: 90, r: 0.6, alpha: 0.30, par: 6 },
            { count: 46, r: 0.9, alpha: 0.52, par: 14 },
            { count: 20, r: 1.3, alpha: 0.85, par: 26 },
        ];

        const seed = () => {
            stars = [];
            LAYERS.forEach((L) => {
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
                grad.addColorStop(0, 'rgba(53, 214, 242, 0.30)');
                grad.addColorStop(0.55, 'rgba(53, 214, 242, 0.09)');
                grad.addColorStop(1, 'rgba(53, 214, 242, 0)');
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
                ctx.fillStyle = 'rgba(226, 240, 255, 0.9)';
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
                ctx.fillStyle = `rgba(53, 214, 242, ${(0.30 * e.life * fade).toFixed(3)})`;
                ctx.fill();
            }

            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(tilt);
            ctx.strokeStyle = `rgba(234, 239, 243, ${(0.75 * fade).toFixed(3)})`;
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
            ctx.strokeStyle = `rgba(53, 214, 242, ${(0.9 * fade).toFixed(3)})`;
            ctx.stroke();
            ctx.restore();
        };

        // ---- meteors: rare thin streaks across the upper field ----
        const meteors = [];
        const drawMeteors = () => {
            if (Math.random() < 0.006 && meteors.length < 2) {
                const speed = 6 + Math.random() * 5;
                const fromLeft = Math.random() < 0.5;
                meteors.push({
                    x: fromLeft ? -30 : W + 30,
                    y: Math.random() * H * 0.45,
                    vx: (fromLeft ? 1 : -1) * speed,
                    vy: speed * (0.3 + Math.random() * 0.2),
                    life: 1,
                });
            }
            for (let i = meteors.length - 1; i >= 0; i--) {
                const m = meteors[i];
                m.x += m.vx;
                m.y += m.vy;
                m.life -= 0.012;
                if (m.life <= 0 || m.x < -60 || m.x > W + 60) { meteors.splice(i, 1); continue; }
                const a = Math.sin(m.life * Math.PI) * 0.5;
                ctx.strokeStyle = `rgba(200, 230, 255, ${a.toFixed(3)})`;
                ctx.lineWidth = 1.1;
                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(m.x - m.vx * 9, m.y - m.vy * 9);
                ctx.stroke();
            }
        };

        // ---- gravity ripples: expanding distortion rings on click ----
        const ripples = [];
        const drawRipples = () => {
            for (let i = ripples.length - 1; i >= 0; i--) {
                const rp = ripples[i];
                rp.r += 6.5;
                rp.a *= 0.955;
                if (rp.a < 0.02) { ripples.splice(i, 1); continue; }
                ctx.strokeStyle = `rgba(53, 214, 242, ${rp.a.toFixed(3)})`;
                ctx.lineWidth = 1.2;
                ctx.beginPath();
                ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
                ctx.stroke();
                ctx.strokeStyle = `rgba(53, 214, 242, ${(rp.a * 0.45).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(rp.x, rp.y, rp.r * 0.62, 0, Math.PI * 2);
                ctx.stroke();
            }
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
                ctx.fillStyle = `rgba(234, 239, 243, ${(s2.a * tw).toFixed(3)})`;
                ctx.fill();
            }

            drawWaves(now, ox * 40, oy * 40);
            drawMeteors();
            drawRipples();
            readProgress();
            drawRocket(now, progress);
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

        const host = wrap.parentElement;
        const onHostDown = (e) => {
            if (e.target.closest('a, button')) return;
            const r = wrap.getBoundingClientRect();
            ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, r: 8, a: 0.5 });
        };
        if (host) host.addEventListener('pointerdown', onHostDown);

        resize();
        mx = W / 2; my = H / 2; cx = mx; cy = my;
        window.addEventListener('resize', resize);
        if (finePointer()) window.addEventListener('mousemove', onMouse, { passive: true });
        raf = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            if (host) host.removeEventListener('pointerdown', onHostDown);
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouse);
        };
    }, []);

    return (
        <div className="hero-field" ref={wrapRef} aria-hidden>
            <canvas ref={canvasRef} />
        </div>
    );
};

/* ---------------------------------------------------------
   Hero entrance choreography (framer-motion).
   --------------------------------------------------------- */
const heroTopMotion = {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay: 0.15 },
};

const metaWrap = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.55 } },
};

const metaItem = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const MetaRow = ({ label, children }) => (
    <motion.div className="meta-row" variants={metaItem}>
        <span className="meta-label">{label}</span>
        <p className="meta-body">{children}</p>
    </motion.div>
);

const ScrollCue = ({ onClick }) => (
    <motion.button
        type="button"
        className="scroll-cue"
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.7 }}
    >
        <span className="cue-label">Scroll</span>
        <span className="cue-line" aria-hidden />
    </motion.button>
);

/* Session intro: launch animation, skippable. */
const LaunchOverlay = ({ onSkip }) => (
    <div className="launch-overlay">
        <div className="stars-bg" aria-hidden />
        <div className="horizon" aria-hidden />
        <div className="flash" aria-hidden />
        <div className="rocket-wrap" aria-hidden>
            <svg className="rocket" width="44" height="72" viewBox="0 0 44 72" fill="none">
                <path
                    d="M22 2c7 9 11 19 11 30 0 8-2 15-5 21H16c-3-6-5-13-5-21C11 21 15 11 22 2Z"
                    stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
                />
                <path d="M16 53 4 66l12-5M28 53l12 13-12-5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
                <circle cx="22" cy="27" r="6" stroke="currentColor" strokeWidth="1.4" />
            </svg>
            <span className="trail" />
        </div>
        <button type="button" className="skip" onClick={onSkip}>Skip</button>
    </div>
);

let introPlayed = false;

/* GW chirp waveform drawn by scroll progress through the strip. */
const chirpSmooth = (x) => { const c = clamp01(x); return c * c * (3 - 2 * c); };

const ChirpStrip = () => {
    const wrapRef = useRef(null);
    const cvsRef = useRef(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const cvs = cvsRef.current;
        if (!wrap || !cvs) return undefined;
        const ctx = cvs.getContext('2d');
        if (!ctx) return undefined;

        const reduce = reduceMotion();
        const DPR = Math.min(2, window.devicePixelRatio || 1);
        const H = 120;
        let W = 0;
        let samples = [];
        let raf = 0;

        const build = () => {
            W = Math.max(2, Math.floor(wrap.getBoundingClientRect().width));
            cvs.width = W * DPR;
            cvs.height = H * DPR;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

            samples = new Array(W);
            let phase = 0;
            const F0 = 1.4, F1 = 24, RING = 0.86;
            for (let i = 0; i < W; i++) {
                const t = i / (W - 1);
                const f = F0 * Math.pow(F1 / F0, t);
                phase += (2 * Math.PI * f) / W;
                let A = 0.16 + 0.84 * chirpSmooth((t - 0.55) / 0.22);
                if (t > RING) A *= Math.exp(-(t - RING) * 30);
                samples[i] = Math.sin(phase) * A;
            }
        };

        const draw = (k) => {
            k = clamp01(k);
            ctx.clearRect(0, 0, W, H);

            ctx.strokeStyle = 'rgba(255,255,255,0.07)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, H / 2);
            ctx.lineTo(W, H / 2);
            ctx.stroke();

            const n = Math.max(1, Math.floor(k * (W - 1)));
            ctx.beginPath();
            for (let i = 0; i <= n; i++) {
                const y = H / 2 - samples[i] * H * 0.44;
                if (i === 0) ctx.moveTo(i, y); else ctx.lineTo(i, y);
            }
            ctx.strokeStyle = 'rgba(53,214,242,0.85)';
            ctx.lineWidth = 1.4;
            ctx.stroke();

            if (k > 0.002) {
                const y = H / 2 - samples[n] * H * 0.44;
                ctx.beginPath();
                ctx.arc(n, y, 7, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(53,214,242,0.25)';
                ctx.fill();
                ctx.beginPath();
                ctx.arc(n, y, 2.8, 0, Math.PI * 2);
                ctx.fillStyle = '#fff';
                ctx.fill();
            }
        };

        const update = () => {
            raf = 0;
            const r = wrap.getBoundingClientRect();
            draw(reduce ? 1 : (window.innerHeight * 0.88 - r.top) / (window.innerHeight * 0.45));
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
        const onResize = () => { build(); if (!raf) raf = requestAnimationFrame(update); };

        build();
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <section className="chirp" aria-label="Gravitational-wave chirp played by scrolling">
            <div className="chirp-figure">
                <canvas ref={cvsRef} className="chirp-canvas" />
                <div className="chirp-cap">
                    <span>Fig. 01 — Binary coalescence</span>
                    <span>h(t) strain ×10⁻²¹ · scroll to play</span>
                </div>
            </div>
        </section>
    );
};

/* Right-edge telemetry rail driven by page scroll progress. */
const RAIL_SECTORS = [
    ['work', 'STAGE I'],
    ['apps', 'STAGE II'],
    ['experiments', 'STAGE III'],
    ['elsewhere', 'TRANSIT'],
    ['skills', 'ORBIT'],
];

const AltRail = () => {
    const railRef = useRef(null);
    const altRef = useRef(null);
    const velRef = useRef(null);
    const secRef = useRef(null);

    useEffect(() => {
        let raf = 0;
        let vel = 0;
        let lastY = window.scrollY;
        let lastT = performance.now();
        let idle = 0;

        const decay = () => {
            vel *= 0.85;
            if (velRef.current) {
                velRef.current.textContent = `VEL ${String(Math.round(vel)).padStart(3, '0')} PX/S`;
            }
            if (vel > 1) requestAnimationFrame(decay);
        };

        const tick = () => {
            raf = 0;
            const doc = document.documentElement;
            const span = doc.scrollHeight - window.innerHeight;
            const p = span > 0 ? clamp01(window.scrollY / span) : 0;

            const now = performance.now();
            const dt = Math.max(16, now - lastT);
            vel = vel * 0.82 + (Math.abs(window.scrollY - lastY) / (dt / 1000)) * 0.18;
            lastY = window.scrollY;
            lastT = now;

            if (railRef.current) railRef.current.style.setProperty('--p', p.toFixed(4));
            if (altRef.current) altRef.current.textContent = `ALT ${(p * 100).toFixed(0)}%`;
            if (velRef.current) {
                velRef.current.textContent = `VEL ${String(Math.min(999, Math.round(vel))).padStart(3, '0')} PX/S`;
            }

            const probe = window.innerHeight * 0.35;
            let label = 'PRELAUNCH';
            RAIL_SECTORS.forEach(([id, name]) => {
                const el = document.getElementById(id);
                if (!el) return;
                const r = el.getBoundingClientRect();
                if (r.top <= probe) label = name;
            });
            if (secRef.current && secRef.current.textContent !== label) {
                secRef.current.textContent = label;
            }

            clearTimeout(idle);
            idle = setTimeout(() => requestAnimationFrame(decay), 150);
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };

        tick();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            clearTimeout(idle);
            window.removeEventListener('scroll', onScroll);
            if (raf) cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div className="alt-rail" ref={railRef} aria-hidden="true">
            <div className="rail-meta">
                <div ref={altRef}>ALT 000%</div>
                <div ref={velRef}>VEL 000 PX/S</div>
                <div ref={secRef}>PRELAUNCH</div>
            </div>
            <div className="rail-track">
                <div className="rail-fill" />
                <div className="rail-rocket">
                    <svg width="14" height="23" viewBox="0 0 44 72" fill="none">
                        <path
                            d="M22 2c7 9 11 19 11 30 0 8-2 15-5 21H16c-3-6-5-13-5-21C11 21 15 11 22 2Z"
                            stroke="currentColor" strokeWidth="2.6" strokeLinejoin="round"
                        />
                        <circle cx="22" cy="27" r="5" stroke="currentColor" strokeWidth="2.6" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

/* Accent the tail phrase of the colophon sentence. */
const COLOPHON_HL = 'built and hosted by me';
const hlIdx = identity.colophon.indexOf(COLOPHON_HL);
const coloPre = hlIdx >= 0 ? identity.colophon.slice(0, hlIdx) : identity.colophon;
const coloPost = hlIdx >= 0 ? identity.colophon.slice(hlIdx + COLOPHON_HL.length) : '';

const Home = () => {
    const location = useLocation();
    const skipIntro = useRef(introPlayed || Boolean(location.hash));
    const [stage, setStage] = useState(skipIntro.current ? 'reveal' : 'launch');
    const nameRef = useRef(null);

    useHeroName(nameRef, stage === 'reveal');

    const finishIntro = useCallback(() => {
        introPlayed = true;
        setStage('reveal');
    }, []);

    useEffect(() => {
        if (skipIntro.current) return;
        if (reduceMotion()) { finishIntro(); return; }
        const t = setTimeout(finishIntro, 2380);
        return () => clearTimeout(t);
    }, [finishIntro]);

    useEffect(() => {
        if (stage !== 'reveal' || !location.hash) return;
        const id = location.hash.slice(1);
        const raf = requestAnimationFrame(() => {
            const el = document.getElementById(id);
            if (!el) return;
            smoothTo(el, { offset: -90 });
        });
        return () => cancelAnimationFrame(raf);
    }, [stage, location.hash]);

    const scrollToWork = useCallback(() => {
        smoothTo(document.getElementById('work'), { offset: -90 });
    }, []);

    let running = 1;
    const groupSections = groups.map((g) => {
        const section = (
            <ProjectGroup
                key={g.id}
                id={g.id}
                numeral={g.numeral}
                title={g.title}
                sub={g.sub}
                projects={g.projects}
                start={running}
            />
        );
        running += g.projects.length;
        return section;
    });

    return (
        <main>
            <MotionConfig reducedMotion="user">
                <div className="app">
                {stage === 'launch' && <LaunchOverlay onSkip={finishIntro} />}
                {stage === 'reveal' &&
                    <div className="page-content">
                        <Chrome />
                        <Header />
                        <AltRail />

                        <section className="hero">
                            <HeroSpace />
                            <motion.div className="hero-top" {...heroTopMotion}>
                                <span className="hero-avail">
                                    <span className="avail-dot" />
                                    {identity.status}
                                </span>
                                <span className="hero-loc">{identity.location}</span>
                            </motion.div>

                            <h1 className="title" ref={nameRef}>
                                <RevealName text={identity.first} delay={0} />
                                <RevealName text={`${identity.last}.`} delay={260} italic />
                            </h1>

                            <motion.div
                                className="hero-meta"
                                variants={metaWrap}
                                initial="hidden"
                                animate="show"
                            >
                                <MetaRow label="Role">
                                    {identity.role}
                                </MetaRow>
                                <MetaRow label="At present">
                                    {identity.blurb}
                                </MetaRow>
                                <MetaRow label="Studying">
                                    {identity.study}
                                </MetaRow>
                                <MetaRow label="Colophon">
                                    {coloPre}<span className="meta-hl">{COLOPHON_HL}</span>{coloPost}
                                </MetaRow>
                            </motion.div>

                            <ScrollCue onClick={scrollToWork} />
                        </section>

                        <ChirpStrip />

                        {groupSections}

                        <section className="work" id="elsewhere">
                            <motion.div className="work-head" {...headMotion()}>
                                <span className="work-numeral">IV</span>
                                <h2 className="work-title">Elsewhere</h2>
                                <p className="work-sub">Work that doesn't have a page here.</p>
                            </motion.div>
                            <motion.div
                                className="else-list"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                                variants={{
                                    hidden: {},
                                    show: { transition: { staggerChildren: 0.08 } },
                                }}
                            >
                                {elsewhere.map((e) => (
                                    <motion.div className="else-row" variants={metaItem} key={e.title}>
                                        <h3 className="else-title">{e.title}</h3>
                                        <p className="else-note">{e.note}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>

                        <section className="skills" id="skills">
                            <motion.div className="work-head" {...headMotion()}>
                                <span className="work-numeral">V</span>
                                <h2 className="work-title">Stack</h2>
                                <p className="work-sub">What I work in.</p>
                            </motion.div>
                            <motion.div
                                className="skill-groups"
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                                variants={{
                                    hidden: {},
                                    show: { transition: { staggerChildren: 0.08 } },
                                }}
                            >
                                {skillGroups.map((g) => (
                                    <motion.div className="skill-group" variants={metaItem} key={g.label}>
                                        <h3 className="skill-label">{g.label}</h3>
                                        <ul className="skill-list">
                                            {g.items.map((s) => <li key={s}>{s}</li>)}
                                        </ul>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </section>

                        <Footer />
                    </div>}
                </div>
            </MotionConfig>
        </main>
    );
};

export default Home;
