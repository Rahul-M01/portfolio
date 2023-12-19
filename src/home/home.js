import React, { useState, useEffect } from 'react';
import './home.css';
import Header from '../header/header';
import Footer from '../footer/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
    const words = ["Hello", "مرحبًا", "नमस्ते", "Bonjour", "こんにちは"];
    const [word, setWord] = useState('');
    const [stage, setStage] = useState('start');

    useEffect(() => {
        const randomWord = words[Math.floor(Math.random() * words.length)];
        setWord(randomWord);

        setTimeout(() => setStage('drop'), 500); // Start drop animation
        setTimeout(() => setStage('zoom'), 1000); // Start zoom animation
        setTimeout(() => setStage('reveal'), 2000); // Reveal the new content
    }, []);

    const languages = ['Python', 'Java', 'C', 'Javascript', 'React', 'TypeScript', 'Django', 'Databases']
    return (
        <main>
            <div className="app">
                {(stage === 'start' || stage === 'drop') && <div className="hello-text">{word}</div>}
                {stage === 'drop' && <div className="drop"></div>}
                {stage === 'zoom' && <div className="hello-text zoom">{word}</div>}
                {stage === 'reveal' && (
                    <div className="page-content">
                        <Header />
                        <h1 class="title">Full Stack &<br /> <span style={{ color: "white" }}>Software Developer</span></h1>
                        <p class="home-text">I am a software developer with 1 year of professional experience,<br />
                            and 2 years of freelancing experience. I have been coding for the past 5 years,<br /> and have knowledge of a wide range of languages and frameworks like:<br /></p>
                        <div className="languages-list">
                            {languages.map((language, index) => (
                                <div key={index} className="language-item">
                                    <FontAwesomeIcon icon={faCode} className="language-icon" />
                                    <span className="language-name">{language}</span>
                                </div>
                            ))}
                        </div>
                        <Footer />
                    </div>
                )}
            </div>
        </main>
    );
};

export default Home;
