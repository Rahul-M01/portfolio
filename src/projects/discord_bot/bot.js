import React from 'react';
import './bot.css';
import discordLogo from '../../images/discord.png';
import Header from '../../header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faComments, faPlay, faPause, faForward, faList, faVolumeLow, faCirclePlay, faLayerGroup, faSquarePollVertical, faLanguage, faLink, faTrash, faBroom, faBell, faDiamond, faHeart, faUsersBetweenLines, faMoneyBill, faUserGroup, faPenToSquare, faRankingStar, faChartSimple, faListUl, faScaleBalanced, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../footer/Footer';
import { faUikit } from '@fortawesome/free-brands-svg-icons';

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
            <div className="additional-text bot-two-paragraphs">
                <div className="bot-paragraph">
                    <span class="bot-feature-title">Features</span>
                    <ul>
                        <li><FontAwesomeIcon icon={faHammer} /> Moderate a server, giving admins power to kick, ban, mute members</li>
                        <li><FontAwesomeIcon icon={faComments} />List of most used words, total messages sent,
                            list of top users by messages sent.</li>
                        <li><FontAwesomeIcon icon={faTrash} />Undo deletion of a message done by a user</li>
                        <li><FontAwesomeIcon icon={faPenToSquare} />See original version of edited text</li>
                        <li><FontAwesomeIcon icon={faBroom} />Clean up server by wiping 'x' number of messages</li>
                    </ul>
                </div>
                <div className="bot-paragraph">
                    <span class="bot-feature-title">Music</span>
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
            <div className="additional-text bot-two-paragraphs">
                <div className="bot-paragraph">
                    <span class="bot-feature-title">Blackjack</span>
                    <ul>
                        <li><FontAwesomeIcon icon={faScaleBalanced} />Standard Rules</li>
                        <li><FontAwesomeIcon icon={faPeopleGroup} />Player vs Player vs Dealer</li>
                        <li><FontAwesomeIcon icon={faMoneyBill} /> Accepts bets using virtual(fake) currency</li>
                        <li><FontAwesomeIcon icon={faRankingStar} />Leaderboard and Rankings</li>
                        <li><FontAwesomeIcon icon={faUikit} />Well Built UI using Embeds</li>
                    </ul>
                </div>
                <div className="bot-paragraph">
                    <span class="bot-feature-title">Texas Hold'em Poker</span>
                    <ul>
                        <li><FontAwesomeIcon icon={faUserGroup} />Play against others</li>
                        <li><FontAwesomeIcon icon={faMoneyBill} />Uses virtual(fake) currency</li>
                        <li><FontAwesomeIcon icon={faRankingStar} />Leaderboard and Rankings</li>
                        <li><FontAwesomeIcon icon={faChartSimple} />Individual Statistics</li>
                        <li><FontAwesomeIcon icon={faListUl} />- (ToDo) Add variants like Omaha and Seven-Card Stud</li>
                    </ul>
                </div>
            </div>

            <div className="additional-text bot-two-paragraphs">
                <div className="bot-paragraph">
                    <span class="bot-feature-title">Quality of Life</span>
                    <ul>
                        <li><FontAwesomeIcon icon={faLayerGroup} />Leveling system</li>
                        <li><FontAwesomeIcon icon={faSquarePollVertical} />User defined polls</li>
                        <li><FontAwesomeIcon icon={faLanguage} />Translation of Text</li>
                        <li><FontAwesomeIcon icon={faLink} />Shortening URL</li>
                        <li><FontAwesomeIcon icon={faBell} />Set a Reminder</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default Bot;
