// Header.js
import React from 'react';
import './header.css';

const Header = () => {
    // You would have state and functions here for handling mobile menu toggle

    return (
        <header>
            <div class="header-container">
                <div class="logo-box">
                </div>
                <nav class="navbar">
                    <ul>
                        <li><a href="/">home</a></li>
                        <li><a href="/bot">Bot</a></li>
                        <li><a href="">product</a></li>
                        <li><a href="">about</a></li>
                        <li><a href="">contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>

    );
};

export default Header;
