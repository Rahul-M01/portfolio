import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './header.css';
import { smoothTo } from '../common/smoothScroll';

const NAV = [
    { label: 'Home',        key: 'top' },
    { label: 'Services',    key: 'work' },
    { label: 'Apps',        key: 'apps' },
    { label: 'Experiments', key: 'experiments' },
    { label: 'Stack',       key: 'skills' },
];

const SECTION_IDS = NAV.filter((n) => n.key !== 'top').map((n) => n.key);
const HEADER_OFFSET = 90;

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const onHomePage = location.pathname === '/';

    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeHash, setActiveHash] = useState(location.hash);

    useEffect(() => {
        let raf = 0;
        const compute = () => {
            raf = 0;
            setScrolled(window.scrollY > 8);
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };
        compute();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            if (raf) cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    useEffect(() => setActiveHash(location.hash), [location.hash]);

    // Scroll spy: last section whose top passed the probe line wins.
    useEffect(() => {
        if (!onHomePage) return undefined;

        let raf = 0;
        const compute = () => {
            raf = 0;
            if (window.scrollY < 80) { setActiveHash(''); return; }
            const probe = window.innerHeight * 0.35;
            let current = '';
            SECTION_IDS.forEach((id) => {
                const el = document.getElementById(id);
                if (!el) return;
                const r = el.getBoundingClientRect();
                if (r.top <= probe && r.bottom > 0) current = `#${id}`;
            });
            setActiveHash(current);
        };
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute); };

        const timer = setTimeout(compute, 200);
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => {
            clearTimeout(timer);
            if (raf) cancelAnimationFrame(raf);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
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
        smoothTo(0);
        if (location.hash) navigate('/', { replace: true });
    };

    const onNavClick = (e, item) => {
        closeMobile();

        if (item.key === 'top') {
            if (!onHomePage) return;
            e.preventDefault();
            smoothTo(0);
            if (location.hash) navigate('/', { replace: true });
            return;
        }

        if (!onHomePage) return;

        e.preventDefault();
        const el = document.getElementById(item.key);
        if (!el) return;
        smoothTo(el, { offset: -HEADER_OFFSET });
        setActiveHash(`#${item.key}`);
        if (location.hash !== `#${item.key}`) {
            navigate(`/#${item.key}`, { replace: true });
        }
    };

    return (
        <header>
            <div className={`header-container ${scrolled ? 'sticky' : ''} ${isMobileMenuOpen ? 'navbar-open' : ''}`}>
                <Link to="/" className="brand" onClick={onBrandClick}>
                    <span className="brand-mark">R</span>
                    <span className="brand-name">Rahul Mahajan</span>
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
