import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';

const NAV = [
    { label: 'Home',        key: 'top' },
    { label: 'Work',        key: 'work' },
    { label: 'Apps',        key: 'apps' },
    { label: 'Experiments', key: 'experiments' },
    { label: 'Skills',      key: 'skills' },
];

const SECTION_IDS = NAV.filter((n) => n.key !== 'top').map((n) => n.key);
const HEADER_OFFSET = 90;

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const onHomePage = location.pathname === '/';

    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState(location.hash);

    useEffect(() => {
        const onScroll = () => setIsSticky(window.scrollY > 30);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => setActiveHash(location.hash), [location.hash]);

    useEffect(() => {
        if (!onHomePage) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length === 0) return;
                setActiveHash(`#${visible[0].target.id}`);
            },
            { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        const onScrollTop = () => {
            if (window.scrollY < 80) setActiveHash((cur) => (cur ? '' : cur));
        };

        const timer = setTimeout(() => {
            SECTION_IDS.forEach((id) => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            });
            onScrollTop();
        }, 200);

        window.addEventListener('scroll', onScrollTop, { passive: true });

        return () => {
            clearTimeout(timer);
            observer.disconnect();
            window.removeEventListener('scroll', onScrollTop);
        };
    }, [onHomePage]);

    const activeIndex = onHomePage
        ? (activeHash ? NAV.findIndex((n) => `#${n.key}` === activeHash) : 0)
        : -1;

    const closeMobile = () => setIsMobileMenuOpen(false);

    const onBrandClick = (e) => {
        closeMobile();
        if (!onHomePage) return;
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (location.hash) navigate('/', { replace: true });
    };

    const onNavClick = (e, item) => {
        closeMobile();

        if (item.key === 'top') {
            if (!onHomePage) return;
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (location.hash) navigate('/', { replace: true });
            return;
        }

        if (!onHomePage) return;

        e.preventDefault();
        const el = document.getElementById(item.key);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setActiveHash(`#${item.key}`);
        if (location.hash !== `#${item.key}`) {
            navigate(`/#${item.key}`, { replace: true });
        }
    };

    return (
        <header>
            <div className={`header-container ${isSticky ? 'sticky' : ''} ${isMobileMenuOpen ? 'navbar-open' : ''}`}>
                <Link to="/" className="brand" onClick={onBrandClick}>
                    <span className="brand-mark">R</span>
                    <span className="brand-name">RAHUL<span className="brand-sep">·</span>MAHAJAN</span>
                </Link>

                <button
                    type="button"
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMobileMenuOpen}
                    className={`hamburger ${isMobileMenuOpen ? 'open' : 'closed'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`navbar ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul>
                        {NAV.map((item, i) => {
                            const to = item.key === 'top' ? '/' : `/#${item.key}`;
                            return (
                                <li key={item.key} className={activeIndex === i ? 'active' : ''}>
                                    <Link to={to} onClick={(e) => onNavClick(e, item)}>
                                        <span className="nav-num">0{i + 1}</span>
                                        <span className="nav-label">{item.label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
