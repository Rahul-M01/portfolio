// App.js
import React from 'react';
import './home.css';
import Header from '../header/header';

function Home() {
    return (
        <main>
            <Header />
            <div className="container">
                <div className="background-image" />
                <div className="glass-box">
                    <h1>About Me</h1>
                    <p>I’m Rahul, a creative and passionate professional specializing in web development.
                        With 3 years of experience under my belt, I’ve honed my skills across many programming languages,
                        consistently delivering projects that engage and inspire. My journey has been driven by my curiosity to
                        explore new technologies and my commitment to making a tangible impact with my work.
                        When I’m not immersed in the digital world, you can find me [a personal hobby or interest - e.g., exploring the great outdoors, reading sci-fi novels,
                        or crafting culinary delights]. Let’s connect and create something extraordinary together!
                    </p>
                </div>
            </div>
        </main>
    );
}


export default Home;
