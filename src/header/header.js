import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';

const NAV = [
    { label: 'Projects', key: 'projects' },
    { label: 'About', key: 'about' },
];

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const onHomePage = location.pathname === '/';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname, location.hash]);

    const onBrandClick = (event) => {
        if (!onHomePage) return;
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate('/', { replace: true });
    };

    const onSectionClick = (event, id) => {
        if (!onHomePage) return;
        event.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        navigate(`/#${id}`, { replace: true });
        setIsMobileMenuOpen(false);
    };

    return (
        <header className="site-header">
            <div className="header-container">
                <Link to="/" className="brand" onClick={onBrandClick}>Rahul Mahajan</Link>

                <button
                    type="button"
                    className="menu-button"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen((open) => !open)}
                >
                    Menu
                </button>

                <nav className={isMobileMenuOpen ? 'open' : ''} aria-label="Main navigation">
                    {NAV.map((item) => (
                        <Link
                            key={item.key}
                            to={`/#${item.key}`}
                            onClick={(event) => onSectionClick(event, item.key)}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <a href="https://github.com/Rahul-M01" target="_blank" rel="noreferrer">GitHub ↗</a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
