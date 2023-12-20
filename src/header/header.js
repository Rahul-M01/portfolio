import React, { useState, useEffect } from 'react';
import './header.css';

const Header = () => {
    const [isSticky, setIsSticky] = useState(false);

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
                <nav className="navbar">
                    <ul>
                        <li><a href="/">home</a></li>
                        <li><a href="/bot">Bot</a></li>
                        <li><a href="">Homelab</a></li>
                        <li><a href="">about</a></li>
                        <li><a href="">contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
