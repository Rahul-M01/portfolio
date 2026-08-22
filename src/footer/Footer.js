import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';
import { smoothTo } from '../common/smoothScroll';

const Footer = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        let fmt;
        try {
            fmt = new Intl.DateTimeFormat('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false,
                timeZone: 'Europe/London',
            });
        } catch {
            return undefined;
        }
        const tick = () => setTime(fmt.format(new Date()));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <footer className="social-footer">
            <div className="footer-bottom">
                <p className="footer-note">
                    © {new Date().getFullYear()} · Built and self-hosted by me
                    <span className="footer-clock">CARDIFF {time}</span>
                </p>

                <div className="footer-links">
                    <a
                        href={process.env.REACT_APP_GITHUB_URL}
                        className="icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                    <a
                        href={process.env.REACT_APP_LINKEDIN_URL}
                        className="icon"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                    <button
                        type="button"
                        className="icon icon-top"
                        onClick={() => smoothTo(0)}
                        aria-label="Back to top"
                    >
                        <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
