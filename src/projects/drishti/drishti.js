import React from 'react';
import ProjectDetail from '../ProjectDetail';

const features = [
    {
        title: "Project checks",
        summary: "Drishti checks the working tree, required files and dependencies in each repository.",
        detail: "It recognises Node, Python and Gradle projects. The dashboard records the recent checks so I can see when something changed.",
    },
    {
        title: "Dashboard updates",
        summary: "The desktop view updates as each set of checks comes in.",
        detail: "Server-sent events carry the results to the dashboard. Drishti also exposes a metrics endpoint for Prometheus.",
    },
    {
        title: "Network checks",
        summary: "A project can have a local service port to check.",
        detail: "The result sits alongside the repository checks. I can see when the files are in place but the service itself isn’t answering.",
    },
    {
        title: "Background monitoring",
        summary: "Drishti keeps checking from the system tray and can send desktop notifications.",
        detail: "A JSON file lists the projects to watch. The dashboard server listens on the local machine.",
    },
];

export default function Project() {
    return <ProjectDetail
        path="/drishti"
        sectionTitle="What Drishti checks"
        description="Drishti keeps an eye on my local projects. I can see which repositories have uncommitted changes, which dependencies are missing and whether a service is reachable."
        features={features}
    />;
}
