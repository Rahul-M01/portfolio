import React, { useRef } from 'react';
import './yudhishtra.css';
import '../project-page.css';
import yudhishtraLogo from '../../images/yudhishtra.png';
import Header from '../../header/header';
import Footer from '../../footer/Footer';
import Chrome from '../../common/Chrome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCodeBranch, faFolderTree, faCircleExclamation,
    faShieldHalved, faBugSlash, faTriangleExclamation,
    faVial, faCheckDouble, faTerminal,
    faLightbulb, faWandMagicSparkles, faListCheck,
    faDesktop, faNetworkWired
} from '@fortawesome/free-solid-svg-icons';

const ACCENT = '#6B7BFF';
const ACCENT_RGB = '107, 123, 255';

const features = [
    {
        num: '01',
        title: 'Repo Browser',
        items: [
            { icon: faCodeBranch, text: 'Finds every local git repo with unpushed commits or no remote configured.' },
            { icon: faFolderTree, text: 'One-click drill into repo state: branches, diffs, staged changes.' },
            { icon: faCircleExclamation, text: 'Surfaces "things you forgot" — WIP branches, stashed work, orphan tags.' },
        ],
    },
    {
        num: '02',
        title: 'Security Scanner',
        items: [
            { icon: faShieldHalved, text: 'Scans code for vulnerabilities before anything leaves the machine.' },
            { icon: faBugSlash, text: 'Categorised by severity — critical, high, medium, low.' },
            { icon: faTriangleExclamation, text: 'Explains each finding with remediation suggestions.' },
        ],
    },
    {
        num: '03',
        title: 'Test Generator',
        items: [
            { icon: faVial, text: 'Auto-generates tests using your project\'s existing test runner.' },
            { icon: faCheckDouble, text: 'Runs the tests locally and reports failures inline.' },
            { icon: faTerminal, text: 'Works with npm, pytest, go test, cargo — whatever\'s already wired up.' },
        ],
    },
    {
        num: '04',
        title: 'Feature Suggestions',
        items: [
            { icon: faLightbulb, text: 'Reads your codebase and proposes next steps to work on.' },
            { icon: faWandMagicSparkles, text: 'Suggestions tailored to the architecture it actually sees.' },
            { icon: faListCheck, text: 'Exportable as a TODO list you can paste into your tracker.' },
        ],
    },
    {
        num: '05',
        title: 'Fully Offline',
        items: [
            { icon: faDesktop, text: 'Runs entirely on your machine via Ollama — no API keys, no internet calls.' },
            { icon: faNetworkWired, text: 'Your code never leaves the box. Safe for work, safe for secrets.' },
            { icon: faTerminal, text: 'Model-agnostic — swap between deepseek-coder, qwen, llama as needed.' },
        ],
    },
];

const FeatureCard = ({ f, index }) => {
    const ref = useRef(null);
    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    return (
        <div
            ref={ref}
            className="feature-card fade-up"
            style={{ '--stagger': `${index * 90}ms` }}
            onMouseMove={onMove}
        >
            <div className="fc-glow" aria-hidden />
            <div className="fc-head">
                <span className="fc-num">{f.num}</span>
                <h3 className="fc-title accent">{f.title}</h3>
            </div>
            <ul className="fc-list">
                {f.items.map((it, i) => (
                    <li key={i}><FontAwesomeIcon icon={it.icon} />{it.text}</li>
                ))}
            </ul>
        </div>
    );
};

const Yudhishtra = () => {
    return (
        <div
            className="project-page"
            style={{ '--accent': ACCENT, '--accent-rgb': ACCENT_RGB }}
        >
            <Chrome pageA={ACCENT_RGB} pageB="138, 43, 226" />
            <Header />

            <section className="project-hero">
                <div className="ph-meta">
                    <span className="ph-tag">{'// PROJECT 06 — CODE AUDITOR'}</span>
                    <span className="ph-status">OFFLINE · OLLAMA</span>
                </div>

                <div className="ph-body">
                    <div className="ph-logo-wrap">
                        <img src={yudhishtraLogo} alt="Yudhishtra" className="ph-logo" />
                    </div>
                    <div className="ph-text">
                        <h1 className="ph-title">
                            <span className="line">
                                <span className="w" style={{ '--wd': '0ms' }}>Yudhishtra</span>
                                <span className="w serif" style={{ '--wd': '140ms' }}>,</span>
                            </span>
                            <span className="line">
                                <span className="w w-white" style={{ '--wd': '260ms' }}>a</span>{' '}
                                <span className="w w-white" style={{ '--wd': '320ms' }}>Code</span>{' '}
                                <span className="w w-white" style={{ '--wd': '380ms' }}>Auditor.</span>
                            </span>
                        </h1>
                        <p className="ph-desc">
                            A desktop app for reviewing local git repos before you push. Vulnerability
                            scanning, test generation and next-step suggestions — all running through
                            Ollama on your own machine. Your code never leaves the box.
                        </p>
                        <div className="ph-actions">
                            <a href="https://github.com/Rahul-M01/yudhishtra" target="_blank" rel="noreferrer" className="ph-action primary">
                                <span>View on GitHub</span>
                                <span className="arrow">↗</span>
                            </a>
                            <a href="/" className="ph-action ghost">
                                <span>Back to Home</span>
                                <span className="arrow">←</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="project-features">
                <div className="feature-block-head fade-up">
                    <span className="section-tag">{'// Feature map'}</span>
                    <h2 className="section-title">What <em>Yudhishtra</em> does.</h2>
                </div>
                <div className="feature-grid">
                    {features.map((f, i) => <FeatureCard key={f.num} f={f} index={i} />)}
                </div>
            </section>

            <nav className="project-nav">
                <a href="/kubera" className="prev">
                    <span className="label">← Previous</span>
                    <span className="dest">Kubera</span>
                </a>
                <a href="/drishti" className="next">
                    <span className="label">Next project →</span>
                    <span className="dest">Drishti</span>
                </a>
            </nav>

            <Footer />
        </div>
    );
};

export default Yudhishtra;
