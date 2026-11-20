import React from 'react';
import { photographs } from '../content/spacePhotographs';
import './project-plate.css';

export function PhotoCredit({ photo }) {
    return <a href={photo.source} target="_blank" rel="noreferrer">
        {photo.subject}<span className="photo-byline"> — {photo.credit}</span>
    </a>;
}

export default function ProjectPlate({ path, detail = false, children }) {
    const photo = photographs[path];
    if (!photo) return null;
    const picture = <div className="plate" style={{ '--photo-position': photo.focus }}>
        <img src={photo.large} srcSet={photo.small + ' 640w, ' + photo.large + ' ' + photo.width + 'w'}
            sizes={detail ? '(max-width: 700px) 100vw, (max-width: 1300px) 92vw, 1160px' : '(max-width: 700px) 100vw, (max-width: 1300px) 52vw, 700px'}
            width={photo.width} height={photo.height} loading={detail ? 'eager' : 'lazy'}
            alt={detail ? photo.subject : ''} />
        {children}
    </div>;
    if (!detail) return picture;
    return <figure className="project-figure">{picture}
        {photo.source && <figcaption><PhotoCredit photo={photo} /></figcaption>}
    </figure>;
}
