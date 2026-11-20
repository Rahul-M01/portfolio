import React from 'react';
import Footer from '../footer/Footer';
import { identity, elsewhere, skillGroups } from '../content/portfolio';
import { PhotoCredit } from '../projects/ProjectPlate';
import { photographs } from '../content/spacePhotographs';
import ProjectAtlas from './ProjectAtlas';
import './home.css';

export default function Home() {
    return <div className="site-page home-universe">
        <main tabIndex={-1} id="main-content">
            <ProjectAtlas />
            <section className="profile-spread shell" id="about" aria-labelledby="about-heading">
                <div className="profile-heading"><p>Cardiff, UK</p><h2 id="about-heading">About <em>me.</em></h2></div>
                <div className="profile-text"><p>{identity.blurb}</p><p>{identity.study}</p></div>
                <div className="profile-notes" id="elsewhere">{elsewhere.map(item => <details key={item.title}>
                    <summary>{item.title}<span aria-hidden="true">+</span></summary><p>{item.note}</p></details>)}</div>
            </section>
            <section className="instruments shell" id="skills" aria-labelledby="skills-heading">
                <h2 id="skills-heading">What I <em>use.</em></h2>
                <div>{skillGroups.map(group => <div className="instrument-row" key={group.label}><h3>{group.label}</h3>
                    <ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div>
            </section>
            <details className="photo-notes shell"><summary>Photography credits</summary><ul>
                {Object.values(photographs).filter(photo => photo.source).map(photo => <li key={photo.source}><PhotoCredit photo={photo} /></li>)}
            </ul></details>
        </main>
        <Footer />
    </div>;
}
