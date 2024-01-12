import React, { useState, useEffect } from 'react';
import './header.css';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <header>
            <div className={`header-container ${isSticky ? 'sticky' : ''}`}>
                <div className="logo-box">
                    {/* Logo here */}
                </div>
                <div className={`hamburger ${isMobileMenuOpen ? 'open' : 'closed'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <nav className={`navbar ${isMobileMenuOpen ? 'open' : ''}`}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/bot">Bot</a></li>
                        <li><a href="/homelab">Homelab</a></li>
                        <li><a href="">Eternal Horizon</a></li>
                        <li><a href="">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
