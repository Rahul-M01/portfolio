import React, { useState, useEffect } from 'react';
import './home.css';
import Header from '../header/header';
import Footer from '../footer/Footer';

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

    const downloadFile = async () => {
        try {
          const response = await fetch("http://localhost:8080/api/files/download/resume.pdf", {
            method: "GET",
          });

          if (!response.ok) {
            throw new Error("Failed to download file");
          }

          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "Rahul Mahajan CV"; // Set the downloaded file name
          document.body.appendChild(a);
          a.click();
          a.remove();
        } catch (error) {
          console.error("Error downloading the file:", error);
        }
      };

    const languages = ['Python', 'Java', 'C', 'Javascript', 'React', 'TypeScript', 'Django', 'Databases']
    return (
        <main>
            <div className="app">
                {(stage === 'start' || stage === 'drop') && <div className="hello-text">{word}</div>}
                {stage === 'drop' && <div className="drop"></div>}
                {stage === 'zoom' && <div className="hello-text zoom">{word}</div>}
                {stage === 'reveal' &&
                    <div className="page-content">
                        <Header />
                        <h1 class="title">Full Stack &<br /> <span style={{ color: "white" }}>Software Developer</span></h1>
                        <p class="home-text">Hi there, welcome to my website. <br />
                            I am a software developer with 2 years of professional experience,<br />
                            I have graduated from DCU, with a BSc in Computer Applications.<br />
                            I have a variety of skills, and projects under my belt, which you can know more about through my Resume attached below.<br /></p>
                        <div class="resume-button-container">
                            <button class="cyberpunk-button" onClick={downloadFile}>RESUME</button>
                        </div>
                        <Footer />
                    </div>}
            </div>
        </main>
    );
};

export default Home;
