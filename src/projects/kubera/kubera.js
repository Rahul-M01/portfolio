import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './kubera.css';
import '../project-page.css';
import Header from '../../header/header';
import Footer from '../../footer/Footer';
import Chrome from '../../common/Chrome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faWallet, faCreditCard, faMagnifyingGlass, faTags,
    faChartPie, faArrowTrendUp, faRankingStar, faClock,
    faBullseye, faArrowsRotate, faRotate, faLock,
    faDatabase, faServer
} from '@fortawesome/free-solid-svg-icons';

const ACCENT = '#F5C518';
const ACCENT_RGB = '245, 197, 24';

const features = [
    {
        num: '01',
        title: 'Live Balances',
        items: [
            { icon: faWallet, text: 'Current balance and today\'s spend pulled straight from Monzo.' },
            { icon: faCreditCard, text: 'Full transaction history with merchant names and categories.' },
            { icon: faMagnifyingGlass, text: 'Search and filter by merchant, amount, category or date.' },
            { icon: faTags, text: 'Auto-categorisation with manual overrides that stick.' },
        ],
    },
    {
        num: '02',
        title: 'Analytics',
        items: [
            { icon: faChartPie, text: 'Spending breakdown by category, merchant and tag.' },
            { icon: faArrowTrendUp, text: 'Trend lines over 1-month, 3-month and 6-month windows.' },
            { icon: faRankingStar, text: 'Top merchants and recurring outflows, ranked.' },
            { icon: faClock, text: 'Six months of history backfilled automatically on first run.' },
        ],
    },
    {
        num: '03',
        title: 'Budgets',
        items: [
            { icon: faBullseye, text: 'Set a monthly cap per category. Watch the bar fill up.' },
            { icon: faArrowsRotate, text: 'Recurring transactions flagged automatically — rent, subs, bills.' },
            { icon: faRotate, text: 'Rollover rules for categories that vary month to month.' },
        ],
    },
    {
        num: '04',
        title: 'Stays Private',
        items: [
            { icon: faLock, text: 'OAuth credentials stored locally — never leave the machine.' },
            { icon: faDatabase, text: 'SQL.js database in your OS user-data directory. Fully portable.' },
            { icon: faServer, text: 'Local Express server on port 3000 — no third-party backend.' },
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

const Kubera = () => {
    return (
        <div
            className="project-page"
            style={{ '--accent': ACCENT, '--accent-rgb': ACCENT_RGB }}
        >
            <Chrome pageA={ACCENT_RGB} pageB="138, 43, 226" />
            <Header />

            <section className="project-hero">
                <div className="ph-meta">
                    <span className="ph-tag">{'// PROJECT 05 — FINANCE'}</span>
                    <span className="ph-status">MONZO · LOCAL-ONLY</span>
                </div>

                <div className="ph-body">
                    <div className="ph-logo-wrap">
                        <span className="ph-mono" aria-hidden>₹</span>
                    </div>
                    <div className="ph-text">
                        <h1 className="ph-title">
                            <span className="line">
                                <span className="w" style={{ '--wd': '0ms' }}>Kubera</span>
                                <span className="w serif" style={{ '--wd': '140ms' }}>,</span>
                            </span>
                            <span className="line">
                                <span className="w w-white" style={{ '--wd': '260ms' }}>a</span>{' '}
                                <span className="w w-white" style={{ '--wd': '320ms' }}>Finance</span>{' '}
                                <span className="w w-white" style={{ '--wd': '380ms' }}>Tracker.</span>
                            </span>
                        </h1>
                        <p className="ph-desc">
                            A personal finance dashboard for Monzo users. Live balances, transaction
                            search, category analytics, budgets and recurring-spend detection — all
                            running locally on an Electron + Express stack. Your tokens never leave
                            the machine.
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
                    <h2 className="section-title">What <em>Kubera</em> tracks.</h2>
                </div>
                <div className="feature-grid">
                    {features.map((f, i) => <FeatureCard key={f.num} f={f} index={i} />)}
                </div>
            </section>

            <nav className="project-nav">
                <Link to="/lekhak" className="prev">
                    <span className="label">← Previous</span>
                    <span className="dest">Lekhak</span>
                </Link>
                <Link to="/yudhishtra" className="next">
                    <span className="label">Next project →</span>
                    <span className="dest">Yudhishtra</span>
                </Link>
            </nav>

            <Footer />
        </div>
    );
};

export default Kubera;
