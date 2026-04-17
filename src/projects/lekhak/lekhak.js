import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './lekhak.css';
import '../project-page.css';
import Header from '../../header/header';
import Footer from '../../footer/Footer';
import Chrome from '../../common/Chrome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faListCheck, faCalendarDay, faFlag, faFilter,
    faNoteSticky, faThumbtack, faMagnifyingGlass, faFloppyDisk,
    faBell, faArrowsRotate, faMoon, faWindowRestore
} from '@fortawesome/free-solid-svg-icons';

const ACCENT = '#E8E4D8';
const ACCENT_RGB = '232, 228, 216';

const features = [
    {
        num: '01',
        title: 'Prioritised Tasks',
        items: [
            { icon: faListCheck, text: 'Quick-capture to-dos with low / medium / high priority tags.' },
            { icon: faCalendarDay, text: 'Calendar-aware due dates and overdue badges.' },
            { icon: faFlag, text: 'Status filters — open, done, snoozed — all in the sidebar.' },
            { icon: faFilter, text: 'Keyword search across every task in your history.' },
        ],
    },
    {
        num: '02',
        title: 'Rich Notes',
        items: [
            { icon: faNoteSticky, text: 'Minimalist note editor built for writing, not formatting wars.' },
            { icon: faThumbtack, text: 'Pin notes to keep recurring references one click away.' },
            { icon: faMagnifyingGlass, text: 'Instant full-text search across every note.' },
            { icon: faFloppyDisk, text: 'Auto-save on every keystroke — no "save" button to forget.' },
        ],
    },
    {
        num: '03',
        title: 'Reminders',
        items: [
            { icon: faBell, text: 'Native OS notifications for one-off or recurring events.' },
            { icon: faArrowsRotate, text: 'Daily, weekly or monthly repeats with flexible rules.' },
            { icon: faWindowRestore, text: 'System tray persistence — closing the window doesn\'t stop alerts.' },
        ],
    },
    {
        num: '04',
        title: 'Designed for You',
        items: [
            { icon: faMoon, text: 'High-contrast dark and light modes that match your system.' },
            { icon: faFloppyDisk, text: 'All data lives in a local SQLite file. No accounts, no sync, no cloud.' },
            { icon: faWindowRestore, text: 'Built for Windows first. Fast, keyboard-driven, tiny footprint.' },
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

const Lekhak = () => {
    return (
        <div
            className="project-page"
            style={{ '--accent': ACCENT, '--accent-rgb': ACCENT_RGB }}
        >
            <Chrome pageA={ACCENT_RGB} pageB="138, 43, 226" />
            <Header />

            <section className="project-hero">
                <div className="ph-meta">
                    <span className="ph-tag">{'// PROJECT 04 — PRODUCTIVITY'}</span>
                    <span className="ph-status">DESKTOP · WINDOWS</span>
                </div>

                <div className="ph-body">
                    <div className="ph-logo-wrap">
                        <span className="ph-mono" aria-hidden>ल</span>
                    </div>
                    <div className="ph-text">
                        <h1 className="ph-title">
                            <span className="line">
                                <span className="w" style={{ '--wd': '0ms' }}>Lekhak</span>
                                <span className="w serif" style={{ '--wd': '140ms' }}>,</span>
                            </span>
                            <span className="line">
                                <span className="w w-white" style={{ '--wd': '260ms' }}>tasks,</span>{' '}
                                <span className="w w-white" style={{ '--wd': '320ms' }}>notes,</span>{' '}
                                <span className="w w-white" style={{ '--wd': '380ms' }}>reminders.</span>
                            </span>
                        </h1>
                        <p className="ph-desc">
                            A privacy-first productivity app for Windows. Prioritised tasks, rich
                            notes and scheduled reminders, all backed by a local SQLite file. Closes
                            to the system tray so alerts keep firing in the background.
                        </p>
                        <div className="ph-actions">
                            <a href="#features" className="ph-action primary">
                                <span>Explore features</span>
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

            <section className="project-features" id="features">
                <div className="feature-block-head fade-up">
                    <span className="section-tag">{'// Feature map'}</span>
                    <h2 className="section-title">What <em>Lekhak</em> ships with.</h2>
                </div>
                <div className="feature-grid">
                    {features.map((f, i) => <FeatureCard key={f.num} f={f} index={i} />)}
                </div>
            </section>

            <nav className="project-nav">
                <Link to="/drishyam" className="prev">
                    <span className="label">← Previous</span>
                    <span className="dest">Drishyam</span>
                </Link>
                <Link to="/kubera" className="next">
                    <span className="label">Next project →</span>
                    <span className="dest">Kubera</span>
                </Link>
            </nav>

            <Footer />
        </div>
    );
};

export default Lekhak;
