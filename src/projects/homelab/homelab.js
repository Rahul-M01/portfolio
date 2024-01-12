import './homelab.css';
import React from 'react';
import homelabLogo from '../../images/homelab.png';
import Header from '../../header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faComments, faPlay, faPause, faForward, faList, faVolumeLow, faCirclePlay, faLayerGroup, faSquarePollVertical, faLanguage, faLink, faTrash, faBroom, faCloud, faVault, faLaptopFile } from '@fortawesome/free-solid-svg-icons';
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
                    <span class="indra-title">Indra - A NextCloud Service</span>
                    <ul>
                        <li><FontAwesomeIcon icon={faCloud} />Service to store and access important documents</li>
                        <li><FontAwesomeIcon icon={faVault} />Safe and Secure</li>
                        <li><FontAwesomeIcon icon={faLaptopFile} />Can be accessed from anywhere</li>
                        <div className="homelab-button"><span><a href="" style={{ "textDecoration": "none", "color": "white" }}>Visit Indra</a></span>
                            <svg>
                                <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            </svg>
                        </div>
                    </ul>
                </div>
                <div className="paragraph">
                    <ul>
                        <li><FontAwesomeIcon icon={faCirclePlay} />Plex - Media Hosting</li>
                        <div className="homelab-button"><span><a href="" style={{ "textDecoration": "none", "color": "white" }}>Visit Plex</a></span>
                            <svg>
                                <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            </svg>
                        </div>
                    </ul>
                </div>
            </div>
            <div className="additional-text two-paragraphs">
                <div className="paragraph">
                    <ul>
                        <li><FontAwesomeIcon icon={faHammer} />Prometheus</li>
                        <div className="homelab-button"><span><a href="" style={{ "textDecoration": "none", "color": "white" }}>Visit Prometheus</a></span>
                            <svg>
                                <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            </svg>
                        </div>
                    </ul>
                </div>
                <div className="paragraph">
                    <ul>
                        <li><FontAwesomeIcon icon={faLayerGroup} />Home Assistant</li>
                        <div className="homelab-button"><span><a href="" style={{ "textDecoration": "none", "color": "white" }}>Visit Home Assistant</a></span>
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
    )
}

export default Homelab