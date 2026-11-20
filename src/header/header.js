import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './header.css';
import { smoothTo } from '../common/smoothScroll';

const navigation = [
    { label: 'Work', id: 'work' },
    { label: 'About', id: 'about' },
    { label: 'Stack', id: 'skills' },
];

export default function Header() {
    const { pathname, hash, key } = useLocation();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState(null);
    const header = useRef(null);
    const toggle = useRef(null);

    useLayoutEffect(() => {
        const sections = pathname === '/' ? navigation.map(item => document.getElementById(item.id)).filter(Boolean) : [];
        const update = () => {
            setScrolled(window.scrollY > 24);
            const current = sections.filter(section => section.getBoundingClientRect().top <= header.current.offsetHeight + 32).pop();
            setActive(current?.id || null);
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, [pathname]);

    useEffect(() => { setOpen(false); }, [key]);
    useEffect(() => {
        if (!open) return undefined;
        const escape = event => {
            if (event.key === 'Escape') {
                setOpen(false);
                toggle.current.focus();
            }
        };
        const outside = event => { if (!header.current?.contains(event.target)) setOpen(false); };
        document.addEventListener('keydown', escape);
        document.addEventListener('pointerdown', outside);
        document.addEventListener('focusin', outside);
        return () => {
            document.removeEventListener('keydown', escape);
            document.removeEventListener('pointerdown', outside);
            document.removeEventListener('focusin', outside);
        };
    }, [open]);

    function revisit(event, id) {
        setOpen(false);
        if (pathname !== '/' || hash !== '#' + id || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            target.tabIndex = -1;
            target.focus({ preventScroll: true });
            smoothTo(target, { offset: -(header.current.offsetHeight + 18) });
        }
    }

    return <header ref={header} className={`site-header ${scrolled ? 'is-scrolled' : ''} ${open ? 'menu-open' : ''}`}>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="header-inner shell">
            <Link viewTransition={pathname !== '/'} className="brand" to="/" aria-label="Rahul Mahajan, home" onClick={event => {
                if (pathname !== '/' || hash || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault();
                setOpen(false);
                smoothTo(0);
            }}><span className="brand-name">Rahul Mahajan</span></Link>
            <button ref={toggle} className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}><span /><span /></button>
            <nav id="site-navigation" className={`site-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
                {navigation.map(item => <Link viewTransition={pathname !== '/'} key={item.id} to={`/#${item.id}`} aria-current={active === item.id ? 'location' : undefined} onClick={event => revisit(event, item.id)}>{item.label}</Link>)}
                <a className="nav-external" href={process.env.REACT_APP_GITHUB_URL || 'https://github.com/Rahul-M01'} target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
            </nav>
        </div>
    </header>;
}
