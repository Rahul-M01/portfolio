import React, { useRef } from 'react';
import './drishti.css';
import '../project-page.css';
import drishtiLogo from '../../images/drishti.png';
import Header from '../../header/header';
import Footer from '../../footer/Footer';
import Chrome from '../../common/Chrome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeartPulse, faGaugeHigh, faChartLine, faServer,
    faBell, faTriangleExclamation, faEnvelopeOpenText,
    faDesktop, faEye, faBoxesStacked,
    faWifi, faPlug
} from '@fortawesome/free-solid-svg-icons';

const ACCENT = '#4FD1C5';
const ACCENT_RGB = '79, 209, 197';

const features = [
    {
        num: '01',
        title: 'Unified Metrics',
        items: [
            { icon: faGaugeHigh, text: 'Collects Prometheus metrics from every service on the lab.' },
            { icon: faChartLine, text: 'Live CPU, memory, disk and request-rate graphs per service.' },
            { icon: faServer, text: 'Single desktop dashboard — no need to juggle browser tabs.' },
            { icon: faBoxesStacked, text: 'Group services by host, stack or tag.' },
        ],
    },
    {
        num: '02',
        title: 'Alerts',
        items: [
            { icon: faBell, text: 'Desktop notifications when a service crosses a threshold.' },
            { icon: faTriangleExclamation, text: 'Severity tiers — info, warning, critical — with colour coding.' },
            { icon: faEnvelopeOpenText, text: 'Daily digest so you know what happened overnight.' },
        ],
    },
    {
        num: '03',
        title: 'Network View',
        items: [
            { icon: faWifi, text: 'Live reachability probes for every registered service.' },
            { icon: faPlug, text: 'Automatic discovery via service labels.' },
            { icon: faEye, text: 'Highlights services that drop off the network.' },
        ],
    },
    {
        num: '04',
        title: 'Desktop-Native',
        items: [
            { icon: faDesktop, text: 'Electron app — feels like part of the OS, not a browser page.' },
            { icon: faHeartPulse, text: 'Minimal-footprint background daemon, <50MB RAM idle.' },
            { icon: faServer, text: 'All configuration lives in a single JSON file next to the binary.' },
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

const Drishti = () => {
    return (
        <div
            className="project-page"
            style={{ '--accent': ACCENT, '--accent-rgb': ACCENT_RGB }}
        >
            <Chrome pageA={ACCENT_RGB} pageB="138, 43, 226" />
            <Header />

            <section className="project-hero">
                <div className="ph-meta">
                    <span className="ph-tag">{'// PROJECT 07 — OBSERVABILITY'}</span>
                    <span className="ph-status">DESKTOP · DAEMON</span>
                </div>

                <div className="ph-body">
                    <div className="ph-logo-wrap">
                        <img src={drishtiLogo} alt="Drishti" className="ph-logo" />
                    </div>
                    <div className="ph-text">
                        <h1 className="ph-title">
                            <span className="line">
                                <span className="w" style={{ '--wd': '0ms' }}>Drishti</span>
                                <span className="w serif" style={{ '--wd': '140ms' }}>,</span>
                            </span>
                            <span className="line">
                                <span className="w w-white" style={{ '--wd': '260ms' }}>a</span>{' '}
                                <span className="w w-white" style={{ '--wd': '320ms' }}>Health</span>{' '}
                                <span className="w w-white" style={{ '--wd': '380ms' }}>Monitor.</span>
                            </span>
                        </h1>
                        <p className="ph-desc">
                            The watchtower for every service on the homelab. Drishti scrapes Prometheus
                            endpoints, aggregates health signals and surfaces them in a single desktop
                            dashboard — with native alerts when anything goes red.
                        </p>
                        <div className="ph-actions">
                            <a href="#features" className="ph-action primary">
                                <span>Explore features</span>
                                <span className="arrow">↓</span>
                            </a>
                            <a href="/" className="ph-action ghost">
                                <span>Back to Home</span>
                                <span className="arrow">←</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="project-features" id="features">
                <div className="feature-block-head fade-up">
                    <span className="section-tag">{'// Feature map'}</span>
                    <h2 className="section-title">What <em>Drishti</em> watches.</h2>
                </div>
                <div className="feature-grid">
                    {features.map((f, i) => <FeatureCard key={f.num} f={f} index={i} />)}
                </div>
            </section>

            <nav className="project-nav">
                <a href="/yudhishtra" className="prev">
                    <span className="label">← Previous</span>
                    <span className="dest">Yudhishtra</span>
                </a>
                <a href="/" className="next">
                    <span className="label">Back to →</span>
                    <span className="dest">Home</span>
                </a>
            </nav>

            <Footer />
        </div>
    );
};

export default Drishti;
