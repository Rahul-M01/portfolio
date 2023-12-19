import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faGithub, faDiscord, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="social-footer">
            <a href="https://www.linkedin.com" className="icon linkedIn" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedin} />
            </a>

            <a href="https://github.com" className="icon github" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
            </a>

            <a href="https://discord.com" className="icon discord" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faDiscord} />
            </a>

            <a href="https://twitter.com" className="icon twitter" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
            </a>

            <a href="https://instagram.com" className="icon instagram" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
            </a>
        </footer>
    );
};

export default Footer;
