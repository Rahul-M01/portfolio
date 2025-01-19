import React from 'react';
import './drishyam.css';
import videoLogo from '../../images/video.png';
import Header from '../../header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHammer, faComments, faPlay, faPause, faForward, faList, faVolumeLow,
    faCirclePlay, faLayerGroup, faSquarePollVertical, faLanguage, faLink, faTrash,
    faBroom, faBell, faMoneyBill, faUserGroup, faPenToSquare, faRankingStar,
    faChartSimple, faListUl, faScaleBalanced, faPeopleGroup
} from '@fortawesome/free-solid-svg-icons';
import Footer from '../../footer/Footer';
import { faUikit } from '@fortawesome/free-brands-svg-icons';

const Drishyam = () => {
    return (
        <div>
            <Header />
            <div className="discord-container">
                <div className="logo-container">
                    <img src={videoLogo} alt="Discord Logo" className="discord-logo" />
                </div>
                <div className="text-container">
                    <h1 className="drishyam-title">Drishyam,<br /><span style={{ color: "white" }}>A Video Hosting Platform</span></h1>
                </div>
            </div>
            <div className="additional-text bot-two-paragraphs">
                <div className="bot-paragraph">
                    <span class="drishyam-feature-title">Features</span>
                    <ul>
                        <li><FontAwesomeIcon icon={faHammer} />Video hosting platform</li>
                        <li><FontAwesomeIcon icon={faComments} />Auto-download videos using a link provided by user</li>
                        <div className="homelab-button"><span><a href="drishyam_home" class="button-text">Visit Drishyam</a></span>
                            <svg>
                                <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            </svg>
                        </div>
                    </ul>
                </div>
            </div>
            <Footer />
        </div >
    );
};

export default Drishyam;
