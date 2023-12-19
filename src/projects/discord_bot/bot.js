// Header.js
import React from 'react';
import './bot.css';
import Header from '../../header/header';

const Bot = () => {
    // You would have state and functions here for handling mobile menu toggle

    return (
        <div>
            <Header />
            <div className="discord-background">
                <div class="discord-embed">
                    <h2 class="embed-title">Embed Title</h2>
                    <p class="embed-description">Here's the description of the embed, where the main content goes.</p>
                    <div class="embed-footer">Embed Footer Text</div>
                </div>
            </div>
        </div>

    );
};

export default Bot;
