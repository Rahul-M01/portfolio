import './homelab.css';
import React from 'react';
import homelabLogo from '../../images/homelab.png';
import Header from '../../header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer, faLayerGroup, faCloud, faVault, faLaptopFile, faNetworkWired, faGlobe, faFolder } from '@fortawesome/free-solid-svg-icons';
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
                        <div className="homelab-button"><span><a href="" class="button-text">Indra</a></span>
                            <svg>
                                <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            </svg>
                        </div>
                    </ul>
                </div>
                <div className="paragraph">
                    <span class="plex-title">Plex - Media Hosting</span>
                    <ul>
                        <li><FontAwesomeIcon icon={faNetworkWired} />Centralizes all personal media collections—movies, TV shows, music, photos, and more.</li>
                        <li><FontAwesomeIcon icon={faGlobe} /> Accessible on any device, anywhere in the world.</li>
                        <li><FontAwesomeIcon icon={faFolder} />Automatically organises media based on type of content.</li>
                        <div className="homelab-button"><span><a href={process.env.REACT_APP_PLEX_URL} target='_blank' class="button-text">Plex</a></span>
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
                        <span class="plex-title">Prometheus - WIP</span>
                        <div className="homelab-button"><span><a href="" class="button-text disabled">Prometheus</a></span>
                            <svg>
                                <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                                <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                            </svg>
                        </div>
                    </ul>
                </div>
                <div className="paragraph">
                    <ul>
                        <span class="plex-title">Home Assistant - WIP</span>
                        <div className="homelab-button"><span><a href="" class="button-text disabled">Assistant</a></span>
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