import React from 'react';
import './bot.css';
import discordLogo from '../../images/discord.png';
import Header from '../../header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faComments, faPlay, faPause, faForward, faList, faVolumeLow, faCirclePlay, faLayerGroup, faSquarePollVertical, faLanguage, faLink, faTrash, faBroom } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../footer/Footer';

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
                        <li><FontAwesomeIcon icon={faComments} />List of most used words, total messages sent,
                            list of top users by messages sent.</li>
                        <li><FontAwesomeIcon icon={faTrash} />Undo deletion of a message done by a user</li>
                        <li><FontAwesomeIcon icon={faBroom} />Clean up server by wiping x number of messages</li>
                    </ul>
                </div>
                <div className="paragraph">
                    It has the ability to
                    play music, and has a variety of commands to control the music:
                    <ul>
                        <li><FontAwesomeIcon icon={faCirclePlay} />Play</li>
                        <li><FontAwesomeIcon icon={faPause} />Pause</li>
                        <li><FontAwesomeIcon icon={faPlay} />Resume</li>
                        <li><FontAwesomeIcon icon={faForward} />Skip</li>
                        <li><FontAwesomeIcon icon={faList} />Queue</li>
                        <li><FontAwesomeIcon icon={faVolumeLow} />Adjust Volume</li>
                    </ul>
                </div>
            </div>
            <div className="additional-text two-paragraphs">
                <div className="paragraph">
                    It also has a variety of fun commands, like:
                    <ul>
                        <li><FontAwesomeIcon icon={faLayerGroup} />Leveling system</li>
                        <li><FontAwesomeIcon icon={faSquarePollVertical} />User defined polls</li>
                        <li><FontAwesomeIcon icon={faLanguage} />Translation of Text</li>
                        <li><FontAwesomeIcon icon={faLink} />Shortening URL</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default Bot;
