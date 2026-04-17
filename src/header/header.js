import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';

const NAV = [
    { label: 'Home',        href: '/',        hash: 'top',         match: (p, h) => p === '/' && !h },
    { label: 'Work',        href: '#work',    hash: 'work',        match: (_, h) => h === '#work' },
    { label: 'Apps',        href: '#apps',    hash: 'apps',        match: (_, h) => h === '#apps' },
    { label: 'Experiments', href: '#experiments', hash: 'experiments', match: (_, h) => h === '#experiments' },
    { label: 'Skills',      href: '#skills',  hash: 'skills',      match: (_, h) => h === '#skills' },
];

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [path, setPath] = useState(
        typeof window !== 'undefined' ? window.location.pathname : '/'
    );
    const [hash, setHash] = useState(
        typeof window !== 'undefined' ? window.location.hash : ''
    );

    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const onChange = () => {
            setPath(window.location.pathname);
            setHash(window.location.hash);
        };
        window.addEventListener('popstate', onChange);
        window.addEventListener('hashchange', onChange);
        return () => {
            window.removeEventListener('popstate', onChange);
            window.removeEventListener('hashchange', onChange);
        };
    }, []);

    const close = () => setIsMobileMenuOpen(false);

    const onNavClick = (e, item) => {
        close();
        const onHome = window.location.pathname === '/';
        if (!onHome) return; // Not on home: let the browser navigate to / (Home) or follow the href

        e.preventDefault();
        const headerOffset = 90;

        if (item.hash === 'top') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (window.location.hash) {
                window.history.pushState(null, '', '/');
                setHash('');
            }
            return;
        }

        const el = document.getElementById(item.hash);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            if (window.location.hash !== `#${item.hash}`) {
                window.history.pushState(null, '', `#${item.hash}`);
                setHash(`#${item.hash}`);
            }
        }
    };

    return (
        <header>
            <div className={`header-container ${isSticky ? 'sticky' : ''} ${isMobileMenuOpen ? 'navbar-open' : ''}`}>
                <Link to="/" className="brand" onClick={close}>
                    <span className="brand-mark">R</span>
                    <span className="brand-name">RAHUL<span className="brand-sep">·</span>MAHAJAN</span>
                </Link>

                <div
                    className={`hamburger ${isMobileMenuOpen ? 'open' : 'closed'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <nav className={`navbar ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul>
                        {NAV.map((item, i) => (
                            <li key={item.href} className={item.match(path, hash) ? 'active' : ''}>
                                <a href={item.href} onClick={(e) => onNavClick(e, item)}>
                                    <span className="nav-num">0{i + 1}</span>
                                    <span className="nav-label">{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
