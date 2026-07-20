import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="social-footer">
            <p className="footer-note">© {new Date().getFullYear()} Rahul Mahajan · Built and self-hosted by me</p>
            <div className="footer-links">
                <a href={process.env.REACT_APP_GITHUB_URL} className="icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a href={process.env.REACT_APP_LINKEDIN_URL} className="icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
