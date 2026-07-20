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

/* Variable-font choreography: Fraunces opsz/wght animate in on load,
   then track scroll so the name thins as it leaves. */
const useVariableName = (rootRef, stage) => {
    useEffect(() => {
        if (stage !== 'reveal') return;
        const root = rootRef.current;
        if (!root) return;

        const chars = Array.from(root.querySelectorAll('.rn-char'));
        if (!chars.length) return;

        // the italic surname sits lighter than the roman given name
        const isItalic = (el) => Boolean(el.closest('.rn-italic'));
        const scale = (el) => (isItalic(el) ? 0.62 : 1);

        const OPSZ_HI = 144, OPSZ_LO = 40;
        const WGHT_HI = 520, WGHT_LO = 250;

        const set = (el, opsz, wght) => {
            el.style.fontVariationSettings =
                `"opsz" ${opsz.toFixed(1)}, "wght" ${Math.round(wght * scale(el))}`;
        };

        if (reduceMotion()) {
            chars.forEach((c) => set(c, OPSZ_HI, 440));
            return;
        }

        const INTRO = 900;
        const STEP = 42;
        let raf = 0;
        let scrollRaf = 0;
        const t0 = performance.now();

        const applyScroll = () => {
            scrollRaf = 0;
            const span = window.innerHeight * 0.85;
            const y = Math.max(0, Math.min(1, window.scrollY / span));
            const opsz = OPSZ_HI - (OPSZ_HI - OPSZ_LO) * y;
            const wght = WGHT_HI - (WGHT_HI - WGHT_LO) * y;
            chars.forEach((c) => set(c, opsz, wght));
        };
        const onScroll = () => {
            if (scrollRaf) return;
            scrollRaf = requestAnimationFrame(applyScroll);
        };
        const startScrollBinding = () => {
            window.addEventListener('scroll', onScroll, { passive: true });
            applyScroll();
        };

        const intro = (now) => {
            const elapsed = now - t0;
            let done = true;
            chars.forEach((c, i) => {
                const local = Math.max(0, Math.min(1, (elapsed - i * STEP) / INTRO));
                if (local < 1) done = false;
                const e = 1 - Math.pow(1 - local, 3);
                set(c, 12 + (OPSZ_HI - 12) * e, 220 + (WGHT_HI - 220) * e);
            });
            if (!done) raf = requestAnimationFrame(intro);
            else startScrollBinding();
        };

        raf = requestAnimationFrame(intro);

        return () => {
            cancelAnimationFrame(raf);
            if (scrollRaf) cancelAnimationFrame(scrollRaf);
            window.removeEventListener('scroll', onScroll);
        };
    }, [rootRef, stage]);
};

/* Flow field behind the hero. Thin warm strokes that bend away from the cursor. */
const HeroField = () => {
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
        const BG = '10, 10, 11';

        let W = 0, H = 0, raf = 0, last = 0, visible = true;
        let mx = -9999, my = -9999;
        const pts = [];

        const resize = () => {
            const r = wrap.getBoundingClientRect();
            W = Math.max(1, Math.floor(r.width));
            H = Math.max(1, Math.floor(r.height));
            canvas.width = W * DPR;
            canvas.height = H * DPR;
            canvas.style.width = W + 'px';
            canvas.style.height = H + 'px';
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            pts.length = 0;
            const target = Math.min(220, Math.floor((W * H) / 9000));
            for (let i = 0; i < target; i++) {
                const x = Math.random() * W;
                const y = Math.random() * H;
                pts.push({ x, y, px: x, py: y });
            }
            ctx.fillStyle = `rgb(${BG})`;
            ctx.fillRect(0, 0, W, H);
        };

        const angleAt = (x, y, t) => (
            Math.sin(x * 0.0025 + t * 0.0003) * 1.2 +
            Math.cos(y * 0.00325 - t * 0.00025) * 1.1 +
            Math.sin((x + y) * 0.0015 + t * 0.0002) * 0.6
        );

        const step = (now) => {
            raf = requestAnimationFrame(step);
            if (!visible || now - last < FRAME) return;
            last = now;

            ctx.fillStyle = `rgba(${BG}, 0.075)`;
            ctx.fillRect(0, 0, W, H);
            ctx.strokeStyle = 'rgba(232, 131, 74, 0.13)';
            ctx.lineWidth = 0.6;
            ctx.beginPath();

            for (let i = 0; i < pts.length; i++) {
                const p = pts[i];
                const a = angleAt(p.x, p.y, now);
                let vx = Math.cos(a) * 0.6;
                let vy = Math.sin(a) * 0.6;

                const dx = p.x - mx;
                const dy = p.y - my;
                const d2 = dx * dx + dy * dy;
                if (d2 < 40000) {
                    const d = Math.sqrt(d2) || 1;
                    const f = (1 - d / 200) * 1.4;
                    vx += (dx / d) * f;
                    vy += (dy / d) * f;
                }

                p.px = p.x; p.py = p.y;
                p.x += vx; p.y += vy;

                if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) {
                    p.x = Math.random() * W;
                    p.y = Math.random() * H;
                    p.px = p.x; p.py = p.y;
                }
                ctx.moveTo(p.px, p.py);
                ctx.lineTo(p.x, p.y);
            }
            ctx.stroke();
        };

        const onMouse = (e) => {
            const r = canvas.getBoundingClientRect();
            mx = e.clientX - r.left;
            my = e.clientY - r.top;
        };
        const onOut = () => { mx = -9999; my = -9999; };

        const io = new IntersectionObserver(
            (es) => es.forEach((e) => { visible = e.isIntersecting; }),
            { threshold: 0.01 }
        );
        io.observe(wrap);

        resize();
        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', onMouse, { passive: true });
        document.addEventListener('mouseleave', onOut);
        raf = requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', onMouse);
            document.removeEventListener('mouseleave', onOut);
        };
    }, []);

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

    useVariableName(nameRef, stage);

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

    // parallax on the hero as you scroll away
    useEffect(() => {
        if (stage !== 'reveal' || reduceMotion()) return;
        const hero = document.querySelector('.hero');
        if (!hero) return;
        let raf;
        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => {
                const y = window.scrollY;
                if (y < window.innerHeight * 1.2) {
                    hero.style.setProperty('--sy', `${y * 0.22}px`);
                    hero.style.setProperty('--so', `${Math.max(0, 1 - y / (window.innerHeight * 0.75))}`);
                }
            });
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
    }, [stage]);

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

                        <section className="hero">
                            <HeroField />
                            <div className="hero-top">
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
