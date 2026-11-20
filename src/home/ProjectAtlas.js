import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ProjectReel from './ProjectReel';
import BlackHole from '../common/BlackHole';
import { allProjects } from '../content/portfolio';
import { photographs } from '../content/spacePhotographs';
import './atlas.css';

const archive = allProjects.map(project => ({ ...project, photo: photographs[project.href] }));
const dissolveMs = 440;

function AtlasPhoto({ item, active }) {
    const [retained, setRetained] = useState(active);
    useEffect(() => {
        if (active) {
            setRetained(true);
            return undefined;
        }
        if (!retained) return undefined;
        const timer = window.setTimeout(() => setRetained(false), dissolveMs + 40);
        return () => window.clearTimeout(timer);
    }, [active, retained]);

    if (!active && !retained) return null;
    return <div className={'atlas-photo' + (item.external ? ' archival-photo' : '')} data-current={active} aria-hidden="true">
        <img src={item.photo.large} alt="" style={{
            objectPosition:item.photo.focus, backgroundPosition:item.photo.focus,
            backgroundImage:'url("' + item.photo.small + '")',
        }} />
    </div>;
}

const firstFilm = archive.findIndex(project => project.href === '/drishyam');

function groupSelection(hash) {
    const preview = archive.findIndex(item => hash === '#preview-' + item.title.toLowerCase());
    if (preview !== -1) return preview;
    const group = { '#apps': 'apps', '#experiments': 'experiments', '#services': 'work' }[hash];
    return group ? archive.findIndex(project => project.groupId === group) : null;
}

function ProjectDestination({ project, children, ...props }) {
    return project.external
        ? <a {...props} href={project.href} target="_blank" rel="noreferrer">{children}</a>
        : <Link viewTransition {...props} to={project.href}>{children}</Link>;
}

export default function ProjectAtlas() {
    const location = useLocation();
    const navigate = useNavigate();
    const [selected, setSelected] = useState(() => groupSelection(location.hash));
    const [indexOpen, setIndexOpen] = useState(false);
    const title = useRef(null);
    const swipeStart = useRef(null);
    const project = archive[selected];
    const browsing = selected !== null;

    useEffect(() => {
        if (!location.hash || location.hash === '#work' || groupSelection(location.hash) !== null) {
            setSelected(groupSelection(location.hash));
            setIndexOpen(false);

        }
    }, [location.hash, location.key]);

    function select(i, focus = false) {
        setIndexOpen(false);

        const next = (i + archive.length) % archive.length;
        setSelected(next);
        navigate('/#preview-' + archive[next].title.toLowerCase(), { replace:true });
        if (focus) requestAnimationFrame(() => title.current?.focus({ preventScroll: true }));
    }

    function reset() {
        setSelected(null);
        navigate('/#work', { replace:true });
        setIndexOpen(false);

        requestAnimationFrame(() => title.current?.focus({ preventScroll: true }));
    }

    function startSwipe(event) {
        swipeStart.current = null;
        if (event.pointerType !== 'touch' || !event.isPrimary || event.target.closest('button, a')) return;
        swipeStart.current = { x:event.clientX, y:event.clientY };
    }

    function finishSwipe(event) {
        const start = swipeStart.current;
        swipeStart.current = null;
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) > 52 && Math.abs(dx) > Math.abs(dy) * 1.7) {
            select((selected ?? (dx < 0 ? -1 : 0)) + (dx < 0 ? 1 : -1));
        }
    }

    function handleKeys(event) {
        if (event.key === 'Escape' && (indexOpen || browsing)) {
            event.preventDefault();
            reset();
        }
        if (!indexOpen && (event.key === 'ArrowRight' || event.key === 'ArrowLeft')) {
            event.preventDefault();
            const next = ((selected ?? firstFilm) + (event.key === 'ArrowRight' ? 1 : -1) + archive.length) % archive.length;
            select(next);
            if (event.target.closest('.work-reel')) document.querySelectorAll('.reel-tile')[next]?.focus({ preventScroll:true });
        }
    }

    return <section id="work" className={'atlas' + (browsing ? ' has-selection' : '') + (indexOpen ? ' index-open' : '')}
        onKeyDown={handleKeys} aria-label="Project atlas" style={{'--dissolve-time':dissolveMs + 'ms'}}>
        {['apps','services','experiments'].map(id => <span className="atlas-anchor" aria-hidden="true" id={id} key={id} />)}
        <div className="atlas-stage">
        <div className="atlas-backdrop" aria-hidden="true">{!browsing && !indexOpen && <BlackHole />}</div>
        {archive.map(item => <AtlasPhoto key={item.href} item={item} active={!indexOpen && project === item} />)}
        <div className="atlas-frame">
            <div className="atlas-bar">
                <button className="atlas-home" onClick={reset} aria-label="Show project atlas"><span className="atlas-symbol" aria-hidden="true">✧</span> Project atlas</button>
                <button className="index-button" aria-expanded={indexOpen} aria-controls="atlas-index" onClick={() => { setIndexOpen(!indexOpen); }}>
                    <span className="index-icon" aria-hidden="true">☷</span>{indexOpen ? 'Close index' : 'Project index'}
                </button>
            </div>
            <div className="atlas-body" hidden={indexOpen} onPointerDown={startSwipe} onPointerUp={finishSwipe} onPointerCancel={() => { swipeStart.current = null; }}>
                {!project ? <>
                    <div className="atlas-copy atlas-identity">
                        <p className="atlas-kicker">Software developer <span aria-hidden="true">/</span> Cardiff</p>
                        <h1 ref={title} tabIndex={-1}>Rahul<br /><em>Mahajan</em><span>.</span></h1>
                        <p className="atlas-description">I build software and study<br /> gravitational waves.</p>
                        <Link className="atlas-cta" to="/#selected-work">Explore my work <span aria-hidden="true">↓</span></Link>
                    </div>
                </> : <div className="atlas-copy project-copy" key={project.href}>
                    <p className="atlas-kicker">{project.group} <span aria-hidden="true">/</span> {project.year}</p>
                    <h1 ref={title} tabIndex={-1}>{project.title}</h1>
                    <p className="atlas-description">{project.desc}</p>
                    <ProjectDestination project={project} className="atlas-cta">{project.external ? 'Run simulation' : 'Open project'} <span aria-hidden="true">{project.external ? '↗' : '→'}</span></ProjectDestination>
                </div>}
            </div>
            <div className="atlas-index" id="atlas-index" hidden={!indexOpen}>
                <h1>Project <em>index.</em></h1>
                <div className="index-list">{archive.map((item,i) => <ProjectDestination key={item.href} project={item} style={{'--step':i}}>
                    <img src={item.photo.small} alt="" /><strong>{item.title}</strong><span>{item.tag}</span><i aria-hidden="true">{item.external ? '↗' : '→'}</i>
                </ProjectDestination>)}</div>
            </div>
        </div>
        </div>
        {!indexOpen && <ProjectReel projects={archive} selected={selected} onSelect={select} onReset={reset} />}
    </section>;
}
