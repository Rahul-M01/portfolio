import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import './drishyam.css';
import '../project-page.css';
import videoLogo from '../../images/video.png';
import Header from '../../header/header';
import Footer from '../../footer/Footer';
import Chrome from '../../common/Chrome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faVideo, faCloudArrowDown, faLink, faPlay,
    faServer, faShieldHalved, faFilm, faFolderOpen,
    faKeyboard, faWandMagicSparkles
} from '@fortawesome/free-solid-svg-icons';

const ACCENT = '#2ff8ff';
const ACCENT_RGB = '47, 248, 255';

const features = [
    {
        num: '01',
        title: 'Upload & Host',
        items: [
            { icon: faVideo, text: 'Drop any video file into the browser — encoded and stored instantly.' },
            { icon: faFolderOpen, text: 'Organised library with thumbnails, durations and metadata.' },
            { icon: faPlay, text: 'Adaptive HTML5 player, works on every modern device.' },
        ],
    },
    {
        num: '02',
        title: 'Auto-Download',
        items: [
            { icon: faLink, text: 'Paste any video URL — Drishyam fetches it in the background.' },
            { icon: faCloudArrowDown, text: 'Supports hundreds of sources via a yt-dlp pipeline.' },
            { icon: faWandMagicSparkles, text: 'Automatic transcoding to a clean, portable format.' },
        ],
    },
    {
        num: '03',
        title: 'Self-Hosted',
        items: [
            { icon: faServer, text: 'Runs on my homelab — no third-party storage, no data collection.' },
            { icon: faShieldHalved, text: 'Private by default. Authentication gated.' },
            { icon: faFilm, text: 'Built for personal archives: videos stay yours, forever.' },
        ],
    },
    {
        num: '04',
        title: 'Fast Controls',
        items: [
            { icon: faKeyboard, text: 'Full keyboard shortcuts for playback and navigation.' },
            { icon: faPlay, text: 'One-click share links with expiry.' },
            { icon: faFolderOpen, text: 'Tag, rename and bulk-manage from a single view.' },
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

const Drishyam = () => {
    return (
        <div
            className="project-page"
            style={{ '--accent': ACCENT, '--accent-rgb': ACCENT_RGB }}
        >
            <Chrome pageA={ACCENT_RGB} pageB="138, 43, 226" />
            <Header />

            <section className="project-hero">
                <div className="ph-meta">
                    <span className="ph-tag">{'// PROJECT 03 — VIDEO PLATFORM'}</span>
                    <span className="ph-status">SELF-HOSTED</span>
                </div>

                <div className="ph-body">
                    <div className="ph-logo-wrap">
                        <img src={videoLogo} alt="Drishyam" className="ph-logo" />
                    </div>
                    <div className="ph-text">
                        <h1 className="ph-title">
                            <span className="line">
                                <span className="w" style={{ '--wd': '0ms' }}>Drishyam</span>
                                <span className="w serif" style={{ '--wd': '140ms' }}>,</span>
                            </span>
                            <span className="line">
                                <span className="w w-white" style={{ '--wd': '260ms' }}>a</span>{' '}
                                <span className="w w-white" style={{ '--wd': '320ms' }}>Video</span>{' '}
                                <span className="w w-white" style={{ '--wd': '380ms' }}>Platform.</span>
                            </span>
                        </h1>
                        <p className="ph-desc">
                            A browser-native video host built for personal archives. Upload directly,
                            or paste a link and let Drishyam auto-download, transcode and catalogue
                            it. Everything stays on my homelab.
                        </p>
                        <div className="ph-actions">
                            <a
                                href="/drishyam_home"
                                className="ph-action primary"
                            >
                                <span>Visit Drishyam</span>
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
                    <span className="section-tag">{'// What it does'}</span>
                    <h2 className="section-title">Built for <em>keeping things</em>.</h2>
                </div>
                <div className="feature-grid">
                    {features.map((f, i) => <FeatureCard key={f.num} f={f} index={i} />)}
                </div>
            </section>

            <nav className="project-nav">
                <Link to="/homelab" className="prev">
                    <span className="label">← Previous</span>
                    <span className="dest">Agni</span>
                </Link>
                <Link to="/lekhak" className="next">
                    <span className="label">Next project →</span>
                    <span className="dest">Lekhak</span>
                </Link>
            </nav>

            <Footer />
        </div>
    );
};

export default Drishyam;
