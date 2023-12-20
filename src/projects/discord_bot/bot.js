import React from 'react';
import './bot.css';
import Header from '../../header/header';

const Bot = () => {
    return (
        <div>
            <Header />
            <div className="text-reveal-container">
                <div className="text-part-one">Bhima:</div>
                <div className="text-part-two">
                    <span>A discord bot</span>
                </div>
            </div>
        </div>
    );
};

export default Bot;
