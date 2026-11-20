import React from 'react';
import ProjectDetail from '../ProjectDetail';

const features = [
    {
        title: "Repository browser",
        summary: "The browser shows branches, diffs and staged changes in one place.",
        detail: "It also helps me spot unpushed commits, missing remotes, stashes and orphan tags.",
    },
    {
        title: "Code checks",
        summary: "The model flags potential problems and groups them by severity.",
        detail: "Each finding comes with an explanation and a suggested change that I can review.",
    },
    {
        title: "Test generation",
        summary: "Yudhishtra writes tests for the runner the repository already uses.",
        detail: "I can run them locally and read the failures in the app. It supports npm, pytest, Go and Cargo projects.",
    },
    {
        title: "Suggestions",
        summary: "Suggestions refer back to the code in the open repository.",
        detail: "I can turn the ones I want to keep into a to-do list.",
    },
    {
        title: "Local models",
        summary: "Ollama handles the model calls on my computer.",
        detail: "That keeps the code on the machine and lets me switch between models such as DeepSeek Coder, Qwen and Llama.",
    },
];

export default function Project() {
    return <ProjectDetail
        path="/yudhishtra"
        sectionTitle="From folder to review"
        description="I open a local Git repository in Yudhishtra when I want a second look before a push. The model runs on my machine through Ollama."
        features={features}
    />;
}
