import React, { useEffect, useRef, useState } from 'react';
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
        stack: ['Node.js', 'Discord.js', 'SQL'],
    },
    {
        title: 'Agni',
        tag: 'Homelab',
        desc: 'Self-hosted personal cloud, media server and networking stack — Nextcloud, Plex and secure remote access.',
        href: '/homelab',
        img: homelabLogo,
        stack: ['Docker', 'Nginx', 'Linux'],
    },
    {
        title: 'Drishyam',
        tag: 'Video platform',
        desc: 'Browser-native video host that also auto-downloads content from a pasted link. Built for quick personal archives.',
        href: '/drishyam',
        img: videoLogo,
        stack: ['React', 'FFmpeg', 'Node'],
    },
];

const desktopApps = [
    {
        title: 'Lekhak',
        tag: 'Notes & tasks',
        desc: 'Privacy-first desktop tasks, rich notes and scheduled reminders. Local SQLite, system tray, dark and light themes.',
        href: '/lekhak',
        mono: 'ल',
        stack: ['Electron', 'React 19', 'Tailwind', 'SQLite'],
    },
    {
        title: 'Kubera',
        tag: 'Finance tracker',
        desc: 'Monzo dashboard with balances, spend analytics, category budgets and recurring payment detection. Stays on your machine.',
        href: '/kubera',
        mono: '₹',
        stack: ['Electron', 'Express', 'SQLite'],
    },
    {
        title: 'Yudhishtra',
        tag: 'Code auditor',
        desc: 'Offline analyser for local git repos. Scans for vulnerabilities, generates tests and suggests next steps via Ollama.',
        href: '/yudhishtra',
        mono: 'यु',
        stack: ['Electron', 'Vite', 'Ollama'],
    },
    {
        title: 'Drishti',
        tag: 'Health monitor',
        desc: 'Collects Prometheus metrics from every service on the lab into a single desktop dashboard.',
        href: '/drishti',
        img: drishtiLogo,
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
        stack: ['JavaScript', 'Canvas', 'WebGL'],
    },
];

const skills = [
    'Python', 'Java', 'C', 'JavaScript', 'TypeScript', 'React',
    'Node.js', 'Electron', 'Django', 'SQLite', 'Docker', 'Linux', 'Git',
];

const ProjectRow = ({ p, num }) => {
    const inner = (
        <>
            <span className="row-num">{num}</span>

            <span className="row-main">
                <span className="row-titleline">
                    <span className="row-title">{p.title}</span>
                    <span className="row-tag">{p.tag}</span>
                </span>
                <span className="row-desc">{p.desc}</span>
                <span className="row-stack">
                    {p.stack.map((s) => <span key={s} className="row-chip">{s}</span>)}
                </span>
            </span>

            <span className="row-end">
                <span className="row-mark" aria-hidden>
                    {p.img
                        ? <img src={p.img} alt="" />
                        : <span className="row-glyph">{p.mono}</span>}
                </span>
                <span className="row-arrow" aria-hidden>{p.external ? '↗' : '→'}</span>
            </span>
        </>
    );

    const cls = 'project-row fade-up';

    if (p.external) {
        return <a href={p.href} target="_blank" rel="noreferrer" className={cls}>{inner}</a>;
    }
    return <Link to={p.href} className={cls}>{inner}</Link>;
};

const ProjectGroup = ({ id, title, sub, projects, start = 1 }) => (
    <section className="work" id={id}>
        <div className="work-head fade-up">
            <h2 className="work-title">{title}</h2>
            <p className="work-sub">{sub}</p>
        </div>
        <div className="project-list">
            {projects.map((p, i) => (
                <ProjectRow key={p.title} p={p} num={String(start + i).padStart(2, '0')} />
            ))}
        </div>
    </section>
);

let introPlayed = false;

const Home = () => {
    const words = ["Hello", "مرحبًا", "नमस्ते", "Bonjour", "こんにちは"];
    const location = useLocation();
    const skipIntro = useRef(introPlayed || Boolean(location.hash));
    const [word, setWord] = useState('');
    const [stage, setStage] = useState(skipIntro.current ? 'reveal' : 'start');

    useEffect(() => {
        if (skipIntro.current) return;

        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);

        const t1 = setTimeout(() => setStage('drop'), 500);
        const t2 = setTimeout(() => setStage('zoom'), 1000);
        const t3 = setTimeout(() => {
            setStage('reveal');
            introPlayed = true;
        }, 2000);

        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (stage !== 'reveal' || !location.hash) return;
        const id = location.hash.slice(1);
        const raf = requestAnimationFrame(() => {
            const el = document.getElementById(id);
            if (!el) return;
            const y = el.getBoundingClientRect().top + window.scrollY - 90;
            window.scrollTo({ top: y, behavior: 'smooth' });
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
                    <div className="page-content">
                        <Chrome />
                        <Header />

                        <section className="hero">
                            <h1 className="title">
                                <span className="line">
                                    <span className="w" style={{ '--wd': '0ms' }}>Rahul</span>{' '}
                                    <span className="w" style={{ '--wd': '70ms' }}>Mahajan</span>
                                </span>
                            </h1>

                            <div className="hero-meta">
                                <p className="hero-role">Software developer</p>
                                <p className="home-text">
                                    Two years professional experience, BSc in Computer Applications
                                    from DCU. Web apps, desktop tools, and the homelab they run on.
                                    Everything below is built and hosted by me.
                                </p>
                            </div>

                            <div className="hero-rule" aria-hidden />

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
                            id="work"
                            title="Live services"
                            sub="Deployed on my homelab and running right now."
                            projects={services}
                            start={1}
                        />

                        <ProjectGroup
                            id="apps"
                            title="Desktop apps"
                            sub="Local-first tools I use daily. No accounts, no cloud."
                            projects={desktopApps}
                            start={services.length + 1}
                        />

                        <ProjectGroup
                            id="experiments"
                            title="Experiments"
                            sub="Smaller browser builds."
                            projects={experiments}
                            start={services.length + desktopApps.length + 1}
                        />

                        <section className="skills" id="skills">
                            <div className="work-head fade-up">
                                <h2 className="work-title">Stack</h2>
                                <p className="work-sub">Languages and tools I reach for.</p>
                            </div>
                            <ul className="skill-list fade-up">
                                {skills.map((s) => <li key={s}>{s}</li>)}
                            </ul>
                        </section>

                        <Footer />
                    </div>}
            </div>
        </main>
    );
};

export default Home;
