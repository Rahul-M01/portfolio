import React from 'react';
import './Footer.css';
import { clientConfig } from '../config';

const Footer = () => (
    <footer className="site-footer">
        <div className="footer-inner">
            <p>Rahul Mahajan</p>
            <div className="footer-links">
                <a href={clientConfig.githubUrl || 'https://github.com/Rahul-M01'} target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>
                {clientConfig.linkedinUrl && (
                    <a href={clientConfig.linkedinUrl} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                )}
            </div>
            <p>© {new Date().getFullYear()}</p>
        </div>
    </footer>
);

export default Footer;
