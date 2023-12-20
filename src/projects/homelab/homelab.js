import './homelab.css';
import React from 'react';
import homelabLogo from '../../images/homelab.png';
import Header from '../../header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faComments, faPlay, faPause, faForward, faList, faVolumeLow, faCirclePlay, faLayerGroup, faSquarePollVertical, faLanguage, faLink, faTrash, faBroom } from '@fortawesome/free-solid-svg-icons';
import Footer from '../../footer/Footer';

function Homelab() {
    return (
        <div>
            <Header />
            <div className="discord-container">
                <div className="logo-container">
                    <img src={homelabLogo} alt="Discord Logo" className="discord-logo" />
                </div>
                <div className="text-container">
                    <h1 className="homelab-title">Agni,<br /><span style={{ color: "white" }}>A Homelab Setup</span></h1>
                </div>
            </div>
            <div className="additional-text two-paragraphs">
                <div className="paragraph">
                    <ul>
                        <li><FontAwesomeIcon icon={faHammer} />Prometheus</li>
                    </ul>
                </div>
                <div className="paragraph">
                    <ul>
                        <li><FontAwesomeIcon icon={faCirclePlay} />Plex</li>
                    </ul>
                </div>
            </div>
            <div className="additional-text two-paragraphs">
                <div className="paragraph">
                    <ul>
                        <li><FontAwesomeIcon icon={faLayerGroup} />Home Assistant</li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div >
    )
}

export default Homelab