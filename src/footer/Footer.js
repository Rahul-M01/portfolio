import React from 'react';
import { smoothTo } from '../common/smoothScroll';
import './Footer.css';

export default function Footer({ compact = false }) {
    return <footer className={`site-footer shell ${compact ? 'is-compact' : ''}`} id="contact">
        <div className="footer-main"><div><h2>Get in touch</h2><p>I'm looking for my next software development role.</p></div><div className="footer-socials"><a href={process.env.REACT_APP_GITHUB_URL || 'https://github.com/Rahul-M01'} target="_blank" rel="noreferrer">Find me on GitHub <span aria-hidden="true">↗</span></a>{process.env.REACT_APP_LINKEDIN_URL && <a href={process.env.REACT_APP_LINKEDIN_URL} target="_blank" rel="noreferrer">Connect on LinkedIn <span aria-hidden="true">↗</span></a>}</div></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Rahul Mahajan</span><span>I host this site at home.</span><button onClick={() => smoothTo(0)}>Back to top <span aria-hidden="true">↑</span></button></div>
    </footer>;
}
