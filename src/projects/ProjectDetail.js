import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../footer/Footer';
import { allProjects } from '../content/portfolio';
import { photographs } from '../content/spacePhotographs';
import LINKS from '../config/links';
import BlackjackSample from './BlackjackSample';
import { PhotoCredit } from './ProjectPlate';
import './project-page.css';

function ProjectLink({ project, children }) {
    return project.external
        ? <a href={project.href} target="_blank" rel="noreferrer">{children}</a>
        : <Link viewTransition to={project.href}>{children}</Link>;
}

export default function ProjectDetail({ path, description, features, sectionTitle }) {
    const index = allProjects.findIndex(item => item.href === path);
    const project = allProjects[index];
    const photo = photographs[path];
    const links = LINKS[path === '/bot' ? 'bhima' : path.slice(1)] || {};
    const next = allProjects[(index + 1) % allProjects.length];
    const previous = allProjects[(index + allProjects.length - 1) % allProjects.length];
    const [expanded, setExpanded] = useState([0]);
    const allExpanded = expanded.length === features.length;
    function toggleFeature(i) {
        setExpanded(current => current.includes(i) ? current.filter(item => item !== i) : [...current, i]);
    }

    return <div className="site-page case-page">
        <main tabIndex={-1} id="main-content">
            <header className="case-opening">
                <div className="case-mast shell"><Link viewTransition to={'/#preview-' + project.title.toLowerCase()}>← Project atlas</Link><span>{project.group} <i>/</i> {project.year}</span></div>
                <div className="case-spread shell">
                    <div className="case-lead"><p className="case-kind">{project.tag}</p>
                        <h1 id="project-name">{project.title}</h1><p className="case-description">{description}</p>
                        <div className="case-actions">
                            {links.download && <a className="button button-primary" href={links.download} target="_blank" rel="noreferrer">Download for desktop</a>}
                            {links.invite && <a className="button button-primary" href={links.invite} target="_blank" rel="noreferrer">Add to Discord</a>}
                            {path === '/drishyam' && <Link viewTransition className="button button-primary" to="/drishyam_home">Open Drishyam</Link>}
                            {path === '/homelab' && <a className="button button-primary" href="#features">Explore the services ↓</a>}
                            {links.repo && <a className="text-link" href={links.repo} target="_blank" rel="noreferrer">Source on GitHub ↗</a>}
                        </div>
                    </div>
                    <figure className="case-portrait">
                        <img src={photo.large} srcSet={photo.small+' 640w, '+photo.large+' '+photo.width+'w'} sizes="(max-width: 740px) 94vw, 56vw"
                            alt={photo.subject} width={photo.width} height={photo.height} style={{objectPosition:photo.focus}} />
                        {photo.source && <figcaption><PhotoCredit photo={photo} /></figcaption>}
                    </figure>
                </div>
                <div className="case-materials shell"><span>Built with</span><ul>{project.stack.map(item => <li key={item}>{item}</li>)}</ul></div>
            </header>
            <div className="shell case-content">
                {path === '/bot' && <BlackjackSample />}
                <section className="case-features" id="features" aria-labelledby="features-title">
                    <aside className="chapter-guide"><h2 id="features-title">{sectionTitle}</h2>
                        <button className="case-expand-all" onClick={() => setExpanded(allExpanded ? [] : features.map((_,i) => i))}>{allExpanded ? 'Collapse all details' : 'Expand all details'}</button>
                    </aside>
                    <div className="chapter-list">{features.map((feature,i) => {
                        const open = expanded.includes(i);
                        const id = 'detail-' + i;
                        return <article className="detail-feature" key={feature.title}>
                            <h3 aria-label={feature.title}><button aria-label={(open ? 'Less detail about ' : 'More detail about ') + feature.title} aria-controls={id} aria-expanded={open}
                                onClick={() => toggleFeature(i)}>{feature.title}<span aria-hidden="true">{open ? '−' : '+'}</span></button></h3>
                            <p>{feature.summary}</p><div id={id} hidden={!open}><p>{feature.detail}</p>
                                {feature.href && <a href={feature.href} target="_blank" rel="noreferrer">Open {feature.title} ↗</a>}
                            </div>
                        </article>;
                    })}</div>
                </section>
                <nav className="case-pager" aria-label="Project navigation">
                    {[previous,next].map((related,i) => <ProjectLink project={related} key={related.href}>
                        <img src={photographs[related.href].small} alt="" /><div><small>{i ? 'Next project' : 'Previous project'}</small><strong>{related.title}</strong></div>
                        <span aria-hidden="true">{i ? '→' : '←'}</span>
                    </ProjectLink>)}
                    <Link viewTransition to={'/#' + project.groupId}>Back to all projects</Link>
                </nav>
            </div>
        </main><Footer compact />
    </div>;
}
