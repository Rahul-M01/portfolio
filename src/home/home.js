import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Header from '../header/header';
import Footer from '../footer/Footer';
import Chrome from '../common/Chrome';
import discordLogo from '../images/discord.png';
import homelabLogo from '../images/homelab.png';
import videoLogo from '../images/video.png';
import drishtiLogo from '../images/drishti.png';
import yudhishtraLogo from '../images/yudhishtra.png';

const services = [
    {
        title: 'Bhima',
        tag: 'Discord Bot',
        desc: 'Moderation, music, poker, blackjack, leveling, polls, translation and live analytics. Runs 24/7 on the homelab.',
        href: '/bot',
        color: '#FF7300',
        colorRgb: '255, 115, 0',
        img: discordLogo,
        stack: ['Node.js', 'Discord.js', 'SQL'],
    },
    {
        title: 'Agni',
        tag: 'Homelab Setup',
        desc: 'Self-hosted personal cloud, media server and networking stack — Nextcloud, Plex and secure remote access.',
        href: '/homelab',
        color: '#FF4500',
        colorRgb: '255, 69, 0',
        img: homelabLogo,
        stack: ['Docker', 'Nginx', 'Linux'],
    },
    {
        title: 'Drishyam',
        tag: 'Video Platform',
        desc: 'Browser-native video host that also auto-downloads content from a pasted link — built for quick personal archives.',
        href: '/drishyam',
        color: '#2ff8ff',
        colorRgb: '47, 248, 255',
        img: videoLogo,
        stack: ['React', 'FFmpeg', 'Node'],
    },
];

const desktopApps = [
    {
        title: 'Lekhak',
        tag: 'Productivity App',
        desc: 'Privacy-first desktop tasks, rich notes and scheduled reminders — local SQLite, system tray, dark & light themes.',
        href: '/lekhak',
        color: '#E8E4D8',
        colorRgb: '232, 228, 216',
        mono: 'ल',
        stack: ['Electron', 'React 19', 'Tailwind', 'SQLite'],
    },
    {
        title: 'Kubera',
        tag: 'Finance Tracker',
        desc: 'Personal Monzo finance dashboard — balances, spend analytics, category budgets, recurring detection. Stays on your machine.',
        href: '/kubera',
        color: '#F5C518',
        colorRgb: '245, 197, 24',
        mono: '₹',
        stack: ['Electron', 'Express', 'SQLite'],
    },
    {
        title: 'Yudhishtra',
        tag: 'Code Auditor',
        desc: 'Offline AI analyser for local git repos — scans for vulnerabilities, generates tests, suggests features. Powered by Ollama.',
        href: '/yudhishtra',
        color: '#6B7BFF',
        colorRgb: '107, 123, 255',
        img: yudhishtraLogo,
        stack: ['Electron', 'Vite', 'Ollama'],
    },
    {
        title: 'Drishti',
        tag: 'Health Monitor',
        desc: 'Cross-project health monitor — collects Prometheus metrics from every service on the lab into one desktop dashboard.',
        href: '/drishti',
        color: '#4FD1C5',
        colorRgb: '79, 209, 197',
        img: drishtiLogo,
        stack: ['Electron', 'Express', 'Prometheus'],
    },
];

const experiments = [
    {
        title: 'Simulation',
        tag: 'Web Experiment',
        desc: 'Interactive browser simulation — physics, particles and playful maths. Hosted on GitHub Pages.',
        href: 'https://rahul-m01.github.io/simulation/',
        external: true,
        color: '#FF2D87',
        colorRgb: '255, 45, 135',
        mono: '∿',
        stack: ['JavaScript', 'Canvas', 'WebGL'],
    },
];

const skills = [
    'Python', 'Java', 'C', 'JavaScript', 'TypeScript', 'React',
    'Node.js', 'Electron', 'Django', 'SQLite', 'Docker', 'Linux', 'Git',
];

const ProjectCard = ({ p, index }) => {
    const ref = useRef(null);

    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        el.style.setProperty('--mx', `${mx}px`);
        el.style.setProperty('--my', `${my}px`);
        const rx = ((my / r.height) - 0.5) * -6;
        const ry = ((mx / r.width) - 0.5) * 6;
        el.style.setProperty('--rx', `${rx}deg`);
        el.style.setProperty('--ry', `${ry}deg`);
    };

    const onLeave = () => {
        const el = ref.current;
        if (!el) return;
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
    };

    const sharedProps = {
        ref,
        className: 'project-card fade-up',
        style: {
            '--accent': p.color,
            '--accent-rgb': p.colorRgb,
            '--stagger': `${index * 110}ms`,
        },
        onMouseMove: onMove,
        onMouseLeave: onLeave,
    };

    const body = (
        <>
            <div className="pc-border" aria-hidden />
            <div className="pc-glow" aria-hidden />
            <div className="pc-head">
                {p.img
                    ? <img src={p.img} alt="" className="pc-logo" />
                    : <span className="pc-mono" aria-hidden>{p.mono}</span>}
                <span className="pc-tag">{p.tag}</span>
            </div>
            <h3 className="pc-title">{p.title}</h3>
            <p className="pc-desc">{p.desc}</p>
            <div className="pc-foot">
                <div className="pc-stack">
                    {p.stack.map((s) => <span key={s} className="pc-chip">{s}</span>)}
                </div>
                <span className="pc-cta">
                    <span>{p.external ? 'Open' : 'Explore'}</span>
                    <span className="pc-arrow">{p.external ? '↗' : '→'}</span>
                </span>
            </div>
        </>
    );

    if (p.external) {
        return (
            <a href={p.href} target="_blank" rel="noreferrer" {...sharedProps}>
                {body}
            </a>
        );
    }

    return (
        <Link to={p.href} {...sharedProps}>
            {body}
        </Link>
    );
};

const ProjectGroup = ({ id, tag, title, sub, projects, offset = 0 }) => (
    <section className="work" id={id}>
        <div className="section-head fade-up">
            <span className="section-tag">{tag}</span>
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
            {sub && <p className="section-sub">{sub}</p>}
        </div>
        <div className="projects-grid">
            {projects.map((p, i) => <ProjectCard key={p.title} p={p} index={i + offset} />)}
        </div>
    </section>
);

const Home = () => {
    const words = ["Hello", "مرحبًا", "नमस्ते", "Bonjour", "こんにちは"];
    const [word, setWord] = useState('');
    const [stage, setStage] = useState('start');

    useEffect(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);

        const t1 = setTimeout(() => setStage('drop'), 500);
        const t2 = setTimeout(() => setStage('zoom'), 1000);
        const t3 = setTimeout(() => setStage('reveal'), 2000);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <main>
            <div className="app">
                {(stage === 'start' || stage === 'drop') && <div className="hello-text">{word}</div>}
                {stage === 'drop' && <div className="drop"></div>}
                {stage === 'zoom' && <div className="hello-text zoom">{word}</div>}
                {stage === 'reveal' &&
                    <div className="page-content">
                        <Chrome />
                        <Header />

                        <section className="hero">
                            <div className="hero-eyebrow">
                                <span className="eyebrow-dot" />
                                <span>AVAILABLE FOR WORK · PORTFOLIO / 2026</span>
                            </div>

                            <h1 className="title">
                                <span className="line">
                                    <span className="w" style={{ '--wd': '0ms' }}>Full</span>{' '}
                                    <span className="w" style={{ '--wd': '80ms' }}>Stack</span>{' '}
                                    <span className="w amp" style={{ '--wd': '160ms' }}>&amp;</span>
                                </span>
                                <span className="line">
                                    <span className="w w-white" style={{ '--wd': '280ms' }}>Software</span>{' '}
                                    <span className="w w-white" style={{ '--wd': '360ms' }}>Developer</span>
                                </span>
                            </h1>

                            <p className="home-text">
                                Hi there — welcome to my site. I'm a software developer with 2&nbsp;years
                                of professional experience, and a <em>BSc&nbsp;in&nbsp;Computer&nbsp;Applications</em> from DCU.
                                I build across web, desktop and infrastructure — every project on this site is
                                shipped and self-hosted by me.
                            </p>

                            <div className="hero-actions">
                                <a href="#work" className="cta cta-primary">
                                    <span className="cta-text">See my work</span>
                                    <span className="cta-arrow">↓</span>
                                </a>
                            </div>

                            <div className="hero-scroll" aria-hidden>
                                <span className="hero-scroll-label">SCROLL</span>
                                <span className="hero-scroll-line" />
                            </div>
                        </section>

                        <ProjectGroup
                            id="work"
                            tag="// Live services"
                            title="Things I've <em>built</em> and host."
                            sub="Running on my homelab right now. Click a card for the full breakdown."
                            projects={services}
                        />

                        <ProjectGroup
                            id="apps"
                            tag="// Desktop apps"
                            title="Offline-first <em>tools</em>."
                            sub="Native apps I use daily. Local data, no accounts, no cloud sync."
                            projects={desktopApps}
                            offset={services.length}
                        />

                        <ProjectGroup
                            id="experiments"
                            tag="// Experiments"
                            title="Fun <em>side quests</em>."
                            sub="Smaller things. Browser demos, visualisations, half-projects."
                            projects={experiments}
                            offset={services.length + desktopApps.length}
                        />

                        <section className="skills" id="skills">
                            <div className="section-head fade-up">
                                <span className="section-tag">{'// Toolbelt'}</span>
                                <h2 className="section-title">Languages &amp; <em>stack.</em></h2>
                            </div>
                            <div className="skill-marquee fade-up">
                                <div className="marquee-track">
                                    {[...skills, ...skills, ...skills].map((s, i) => (
                                        <span className="skill-pill" key={`${s}-${i}`}>
                                            <span className="pill-star">✦</span>
                                            {s}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <Footer />
                    </div>}
            </div>
        </main>
    );
};

export default Home;
