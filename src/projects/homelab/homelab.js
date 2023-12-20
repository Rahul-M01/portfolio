import './homelab.css';
import React from 'react';
import discordLogo from '../../images/discord.png';
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
                    <img src={discordLogo} alt="Discord Logo" className="discord-logo" />
                </div>
                <div className="text-container">
                    <h1 className="bot-title">Agni,<br /><span style={{ color: "white" }}>A Homelab Setup</span></h1>
                </div>
            </div>
            <div className="additional-text two-paragraphs">

            </div>
            <Footer />
        </div >
    )
}

export default Homelab