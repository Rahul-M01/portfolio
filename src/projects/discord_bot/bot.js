import React from 'react';
import './bot.css';
import discordLogo from '../../images/discord.png';
import Header from '../../header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faComments, faPlay, faPause, faForward, faList, faVolumeLow, faCirclePlay } from '@fortawesome/free-solid-svg-icons';

const Bot = () => {
    return (
        <div>
            <Header />
            <div className="discord-container">
                <div className="logo-container">
                    <img src={discordLogo} alt="Discord Logo" className="discord-logo" />
                </div>
                <div className="text-container">
                    <h1 className="bot-title">Bhima,<br /><span style={{ color: "white" }}>A Discord Bot</span></h1>
                </div>
            </div>
            <div className="additional-text two-paragraphs">
                <div className="paragraph">
                    Bhima is a discord bot built with a variety of features. It has the ability to:
                    <ul>
                        <li><FontAwesomeIcon icon={faHammer} /> Moderate a server, giving admins power to kick, ban, mute members</li>
                        <li><FontAwesomeIcon icon={faComments} /> See a list of your most used words, how many messages you have sent,
                            as well as a list of top users by messages sent.</li>
                    </ul>
                </div>
                <div className="paragraph">
                    It has the ability to
                    play music, and has a variety of commands to control the music:
                    <ul>
                        <li><FontAwesomeIcon icon={faCirclePlay} />Play</li>
                        <li><FontAwesomeIcon icon={faPause} />pause</li>
                        <li><FontAwesomeIcon icon={faPlay} />resume</li>
                        <li><FontAwesomeIcon icon={faForward} />skip</li>
                        <li><FontAwesomeIcon icon={faList} />queue</li>
                        <li><FontAwesomeIcon icon={faVolumeLow} />volume</li>
                    </ul>
                </div>
            </div>
        </div >
    );
};

export default Bot;
