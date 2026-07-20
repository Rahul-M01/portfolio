import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './bot.css';
import '../project-page.css';
import discordLogo from '../../images/discord.png';
import Header from '../../header/header';
import Footer from '../../footer/Footer';
import Chrome from '../../common/Chrome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHammer, faComments, faPlay, faPause, faForward, faList, faVolumeLow,
    faCirclePlay, faLayerGroup, faSquarePollVertical, faLanguage, faLink, faTrash,
    faBroom, faBell, faMoneyBill, faUserGroup, faPenToSquare, faRankingStar,
    faChartSimple, faListUl, faScaleBalanced, faPeopleGroup
} from '@fortawesome/free-solid-svg-icons';
import { faUikit } from '@fortawesome/free-brands-svg-icons';

const ACCENT = '#FF7300';
const ACCENT_RGB = '255, 115, 0';

const features = [
    {
        num: '01',
        title: 'Moderation',
        items: [
            { icon: faHammer, text: 'Admins can kick, ban, and mute members across a server.' },
            { icon: faComments, text: 'Server-wide analytics: most used words, top talkers, total messages.' },
            { icon: faTrash, text: 'Undo message deletions performed by any user.' },
            { icon: faPenToSquare, text: 'See the original version of any edited message.' },
            { icon: faBroom, text: 'Clean up channels by wiping the last N messages.' },
        ],
    },
    {
        num: '02',
        title: 'Music',
        items: [
            { icon: faCirclePlay, text: 'Play tracks from links or search queries.' },
            { icon: faPause, text: 'Pause the current track.' },
            { icon: faPlay, text: 'Resume a paused track.' },
            { icon: faForward, text: 'Skip to the next queued song.' },
            { icon: faList, text: 'View the full live queue.' },
            { icon: faVolumeLow, text: 'Adjust playback volume on the fly.' },
        ],
    },
    {
        num: '03',
        title: 'Blackjack',
        items: [
            { icon: faScaleBalanced, text: 'Standard house rules.' },
            { icon: faPeopleGroup, text: 'Player vs. Player vs. Dealer tables.' },
            { icon: faMoneyBill, text: 'Accepts bets using virtual currency.' },
            { icon: faRankingStar, text: 'Leaderboards and rankings across sessions.' },
            { icon: faUikit, text: 'Rich embed UI for every command.' },
        ],
    },
    {
        num: '04',
        title: "Texas Hold'em Poker",
        items: [
            { icon: faUserGroup, text: 'Play against multiple opponents at a virtual table.' },
            { icon: faMoneyBill, text: 'Stakes are handled in virtual currency.' },
            { icon: faRankingStar, text: 'Leaderboards and per-player rankings.' },
            { icon: faChartSimple, text: 'Individual statistics and hand history.' },
            { icon: faListUl, text: '(ToDo) Variants: Omaha and Seven-Card Stud.' },
        ],
    },
    {
        num: '05',
        title: 'Quality of Life',
        items: [
            { icon: faLayerGroup, text: 'Server leveling system with activity-based XP.' },
            { icon: faSquarePollVertical, text: 'User-defined polls with live tallies.' },
            { icon: faLanguage, text: 'On-demand translation of any message.' },
            { icon: faLink, text: 'URL shortening with a quick inline command.' },
            { icon: faBell, text: 'Set reminders that ping you or a role.' },
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

const Bot = () => {
    return (
        <div
            className="project-page"
            style={{ '--accent': ACCENT, '--accent-rgb': ACCENT_RGB }}
        >
            <Chrome pageA={ACCENT_RGB} pageB="138, 43, 226" />
            <Header />

            <section className="project-hero">
                <div className="ph-meta">
                    <span className="ph-tag">{'// PROJECT 01 — DISCORD BOT'}</span>
                    <span className="ph-status">LIVE · 24/7</span>
                </div>

                <div className="ph-body">
                    <div className="ph-logo-wrap">
                        <img src={discordLogo} alt="Bhima" className="ph-logo" />
                    </div>
                    <div className="ph-text">
                        <h1 className="ph-title">
                            <span className="line">
                                <span className="w" style={{ '--wd': '0ms' }}>Bhima</span>
                                <span className="w serif" style={{ '--wd': '140ms' }}>,</span>
                            </span>
                            <span className="line">
                                <span className="w w-white" style={{ '--wd': '260ms' }}>a</span>{' '}
                                <span className="w w-white" style={{ '--wd': '320ms' }}>Discord</span>{' '}
                                <span className="w w-white" style={{ '--wd': '380ms' }}>Bot.</span>
                            </span>
                        </h1>
                        <p className="ph-desc">
                            A Discord bot running on my homelab. Moderation, music, two full casino
                            games and a set of quality-of-life commands, all delivered through rich
                            embeds.
                        </p>
                        <div className="ph-actions">
                            <a
                                href={process.env.REACT_APP_DISCORD_INVITE || '#'}
                                className="ph-action primary"
                                target={process.env.REACT_APP_DISCORD_INVITE ? '_blank' : undefined}
                                rel="noreferrer"
                            >
                                <span>Invite Bhima</span>
                                <span className="arrow">↗</span>
                            </a>
                            <Link to="/" className="ph-action ghost">
                                <span>Back to Home</span>
                                <span className="arrow">←</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="project-features">
                <div className="feature-block-head fade-up">
                    <span className="section-tag">{'// Feature map'}</span>
                    <h2 className="section-title">What <em>Bhima</em> can do.</h2>
                </div>
                <div className="feature-grid">
                    {features.map((f, i) => <FeatureCard key={f.num} f={f} index={i} />)}
                </div>
            </section>

            <nav className="project-nav">
                <Link to="/" className="prev">
                    <span className="label">← Home</span>
                    <span className="dest">Portfolio</span>
                </Link>
                <Link to="/homelab" className="next">
                    <span className="label">Next project →</span>
                    <span className="dest">Agni</span>
                </Link>
            </nav>

            <Footer />
        </div>
    );
};

export default Bot;
