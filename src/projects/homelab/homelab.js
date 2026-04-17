import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './homelab.css';
import '../project-page.css';
import homelabLogo from '../../images/homelab.png';
import Header from '../../header/header';
import Footer from '../../footer/Footer';
import Chrome from '../../common/Chrome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCloud, faLock, faLaptopFile, faUsersGear,
    faFilm, faGlobe, faFolderTree, faClosedCaptioning,
    faChartLine, faTriangleExclamation, faBell, faHouseChimney,
    faLightbulb, faPlug, faRobot
} from '@fortawesome/free-solid-svg-icons';

const ACCENT = '#FF4500';
const ACCENT_RGB = '255, 69, 0';

const services = [
    {
        num: '01',
        title: 'Indra',
        subtitle: 'NextCloud — Personal Cloud',
        accentRgb: '135, 206, 235',
        status: 'LIVE',
        href: process.env.REACT_APP_INDRA_URL || null,
        items: [
            { icon: faCloud, text: 'Self-hosted Nextcloud for documents, notes, and calendar sync.' },
            { icon: faLock, text: 'End-to-end encrypted — data never leaves the homelab unencrypted.' },
            { icon: faLaptopFile, text: 'Native clients on phone, tablet, desktop — plus browser access anywhere.' },
            { icon: faUsersGear, text: 'Fine-grained sharing, versioning, and trash recovery.' },
        ],
    },
    {
        num: '02',
        title: 'Plex',
        subtitle: 'Media Server',
        accentRgb: '229, 160, 13',
        status: 'LIVE',
        href: process.env.REACT_APP_PLEX_URL || null,
        items: [
            { icon: faFilm, text: 'Centralised library for movies, TV, music, and photos.' },
            { icon: faGlobe, text: 'Stream to any device, anywhere — phones, consoles, TVs.' },
            { icon: faFolderTree, text: 'Automatic metadata scraping and folder organisation.' },
            { icon: faClosedCaptioning, text: 'Subtitle sync, hardware transcoding, and multi-user profiles.' },
        ],
    },
    {
        num: '03',
        title: 'Prometheus',
        subtitle: 'Metrics & Observability',
        accentRgb: '255, 99, 72',
        status: 'WIP',
        href: null,
        items: [
            { icon: faChartLine, text: 'Full metrics pipeline for every service on the lab.' },
            { icon: faTriangleExclamation, text: 'Alerting for disk, CPU, memory and service health.' },
            { icon: faBell, text: 'Grafana dashboards with push notifications to phone.' },
        ],
    },
    {
        num: '04',
        title: 'Home Assistant',
        subtitle: 'Smart Home Control',
        accentRgb: '65, 189, 244',
        status: 'WIP',
        href: null,
        items: [
            { icon: faHouseChimney, text: 'Single control plane for every smart device in the house.' },
            { icon: faLightbulb, text: 'Scenes and automations — lights, climate, blinds.' },
            { icon: faPlug, text: 'Local-first — works even when the internet is down.' },
            { icon: faRobot, text: 'Voice-assistant integration, no cloud dependency.' },
        ],
    },
];

const ServiceCard = ({ s, index }) => {
    const ref = useRef(null);
    const onMove = (e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${e.clientX - r.left}px`);
        el.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    const disabled = s.status !== 'LIVE';
    return (
        <div
            ref={ref}
            className="feature-card fade-up"
            style={{
                '--stagger': `${index * 90}ms`,
                '--sub-accent-rgb': s.accentRgb,
            }}
            onMouseMove={onMove}
        >
            <div className="fc-glow" aria-hidden />
            <div className="fc-head">
                <span className="fc-num">{s.num}</span>
                <h3 className="fc-title accent" style={{ color: `rgb(${s.accentRgb})` }}>
                    {s.title}
                </h3>
            </div>
            <p className="fc-sub">{s.subtitle}</p>
            <ul className="fc-list">
                {s.items.map((it, i) => (
                    <li key={i}>
                        <FontAwesomeIcon
                            icon={it.icon}
                            style={{ color: `rgb(${s.accentRgb})` }}
                        />
                        {it.text}
                    </li>
                ))}
            </ul>
            <div className="fc-foot">
                {s.href ? (
                    <a
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        className="fc-link"
                        style={{
                            color: `rgb(${s.accentRgb})`,
                            borderColor: `rgba(${s.accentRgb}, 0.4)`,
                            background: `rgba(${s.accentRgb}, 0.05)`,
                        }}
                    >
                        Open {s.title} ↗
                    </a>
                ) : (
                    <span className="fc-link disabled">Not yet public</span>
                )}
                <span className={`fc-badge ${disabled ? 'wip' : 'live'}`}>{s.status}</span>
            </div>
        </div>
    );
};

const Homelab = () => {
    return (
        <div
            className="project-page"
            style={{ '--accent': ACCENT, '--accent-rgb': ACCENT_RGB }}
        >
            <Chrome pageA={ACCENT_RGB} pageB="135, 206, 235" />
            <Header />

            <section className="project-hero">
                <div className="ph-meta">
                    <span className="ph-tag">{'// PROJECT 02 — HOMELAB'}</span>
                    <span className="ph-status">ONLINE · UPTIME 99.9%</span>
                </div>

                <div className="ph-body">
                    <div className="ph-logo-wrap">
                        <img src={homelabLogo} alt="Agni" className="ph-logo" />
                    </div>
                    <div className="ph-text">
                        <h1 className="ph-title">
                            <span className="line">
                                <span className="w" style={{ '--wd': '0ms' }}>Agni</span>
                                <span className="w serif" style={{ '--wd': '140ms' }}>,</span>
                            </span>
                            <span className="line">
                                <span className="w w-white" style={{ '--wd': '260ms' }}>a</span>{' '}
                                <span className="w w-white" style={{ '--wd': '320ms' }}>Homelab</span>{' '}
                                <span className="w w-white" style={{ '--wd': '380ms' }}>Setup.</span>
                            </span>
                        </h1>
                        <p className="ph-desc">
                            My self-hosted personal cloud — a stack of services running in Docker on
                            a Linux box at home. Storage, media, monitoring and automation, all on
                            infrastructure I own end-to-end.
                        </p>
                        <div className="ph-actions">
                            <a href="#stack" className="ph-action primary">
                                <span>See the stack</span>
                                <span className="arrow">↓</span>
                            </a>
                            <Link to="/" className="ph-action ghost">
                                <span>Back to Home</span>
                                <span className="arrow">←</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="project-features" id="stack">
                <div className="feature-block-head fade-up">
                    <span className="section-tag">{'// Stack'}</span>
                    <h2 className="section-title">Services on <em>Agni</em>.</h2>
                </div>
                <div className="feature-grid">
                    {services.map((s, i) => <ServiceCard key={s.num} s={s} index={i} />)}
                </div>
            </section>

            <nav className="project-nav">
                <Link to="/bot" className="prev">
                    <span className="label">← Previous</span>
                    <span className="dest">Bhima</span>
                </Link>
                <Link to="/drishyam" className="next">
                    <span className="label">Next project →</span>
                    <span className="dest">Drishyam</span>
                </Link>
            </nav>

            <Footer />
        </div>
    );
};

export default Homelab;
