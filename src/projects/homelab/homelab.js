import React from 'react';
import ProjectDetail from '../ProjectDetail';

const features = [
    {
        title: "Indra",
        summary: "Indra is my Nextcloud installation. I keep my documents, notes and calendars there.",
        detail: "I can share a file from my phone, recover something I deleted or roll back to an earlier version. The files are encrypted on the server.",
        href: process.env.REACT_APP_INDRA_URL || null,
    },
    {
        title: "Plex",
        summary: "Plex puts my films, TV, music and photos in one library.",
        detail: "It fetches artwork and subtitles. Hardware transcoding lets me watch the same file on a phone or a TV.",
        href: process.env.REACT_APP_PLEX_URL || null,
    },
    {
        title: "Prometheus",
        summary: "I’m wiring up Prometheus to track CPU, memory and free disk space.",
        detail: "The next step is a Grafana dashboard and a phone alert when a service goes down.",
    },
    {
        title: "Home Assistant",
        summary: "Home Assistant is the part I’m working on for the house.",
        detail: "I want the lights, blinds and heating to keep working if the internet drops. Local voice control is on my list too.",
    },
];

export default function Project() {
    return <ProjectDetail
        path="/homelab"
        sectionTitle="Services on Agni"
        description="Agni is the Linux server I keep at home. It holds my files and serves my media library. Nextcloud and Plex run in Docker."
        features={features}
    />;
}
