import React, { useCallback, useEffect, useRef, useState } from 'react';
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

    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    const itemRefs = useRef([]);
    const spySuspended = useRef(false);

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
                if (spySuspended.current) return;
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
                if (visible.length === 0) return;
                const topId = visible[0].target.id;
                setActiveHash((cur) => (cur === `#${topId}` ? cur : `#${topId}`));
            },
            { rootMargin: '-30% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
        );

        const onScrollTop = () => {
            if (spySuspended.current) return;
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

    const getActiveIndex = useCallback(() => {
        if (!onHomePage) return -1;
        if (!activeHash) return 0;
        const idx = NAV.findIndex((n) => `#${n.key}` === activeHash);
        return idx >= 0 ? idx : 0;
    }, [onHomePage, activeHash]);

    const positionIndicator = useCallback((targetEl) => {
        if (typeof window === 'undefined' || window.innerWidth <= 900) return;
        const nav = navRef.current;
        const ind = indicatorRef.current;
        if (!nav || !ind) return;
        if (!targetEl) {
            ind.style.opacity = '0';
            return;
        }
        const navRect = nav.getBoundingClientRect();
        const itemRect = targetEl.getBoundingClientRect();
        ind.style.transform = `translateX(${itemRect.left - navRect.left}px)`;
        ind.style.width = `${itemRect.width}px`;
        ind.style.opacity = '1';
    }, []);

    const settleToActive = useCallback(() => {
        const idx = getActiveIndex();
        positionIndicator(idx >= 0 ? itemRefs.current[idx] : null);
    }, [getActiveIndex, positionIndicator]);

    useEffect(() => {
        const raf = requestAnimationFrame(settleToActive);
        return () => cancelAnimationFrame(raf);
    }, [settleToActive]);

    useEffect(() => {
        const onResize = () => settleToActive();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, [settleToActive]);

    const closeMobile = useCallback(() => setIsMobileMenuOpen(false), []);

    const onItemEnter = (e) => positionIndicator(e.currentTarget);
    const onNavLeave = () => settleToActive();

    const suspendSpy = () => {
        spySuspended.current = true;
        setTimeout(() => { spySuspended.current = false; }, 800);
    };

    const onBrandClick = (e) => {
        closeMobile();
        if (!onHomePage) return;
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (location.hash) navigate('/', { replace: true });
        suspendSpy();
    };

    const onNavClick = (e, item) => {
        closeMobile();

        if (item.key === 'top') {
            if (!onHomePage) return;
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (location.hash) navigate('/', { replace: true });
            suspendSpy();
            return;
        }

        if (!onHomePage) return;

        e.preventDefault();
        const el = document.getElementById(item.key);
        if (!el) return;
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top: y, behavior: 'smooth' });
        suspendSpy();
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
                    <ul ref={navRef} onMouseLeave={onNavLeave}>
                        <span className="nav-indicator" ref={indicatorRef} aria-hidden />
                        {NAV.map((item, i) => {
                            const isActive = getActiveIndex() === i;
                            const to = item.key === 'top' ? '/' : `/#${item.key}`;
                            return (
                                <li key={item.key} className={isActive ? 'active' : ''}>
                                    <Link
                                        to={to}
                                        ref={(el) => (itemRefs.current[i] = el)}
                                        onClick={(e) => onNavClick(e, item)}
                                        onMouseEnter={onItemEnter}
                                        onFocus={onItemEnter}
                                    >
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
