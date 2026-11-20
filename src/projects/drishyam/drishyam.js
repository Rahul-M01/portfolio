import React from 'react';
import ProjectDetail from '../ProjectDetail';

const features = [
    {
        title: "Uploads & playback",
        summary: "I can upload a file and watch it from the same page.",
        detail: "The library shows a thumbnail, duration and file details for each video. Playback uses the browser’s own video player.",
    },
    {
        title: "Save from a link",
        summary: "Pasting a supported link starts a background download.",
        detail: "Drishyam uses yt-dlp to fetch the video. FFmpeg converts the download for playback.",
    },
    {
        title: "Hosted at home",
        summary: "My video files stay on Agni, behind a sign-in.",
        detail: "Uploads and downloads end up in the same archive, so I only have one library to look through.",
    },
    {
        title: "Library controls",
        summary: "Tags and batch renaming help keep the library in order.",
        detail: "I can navigate with the keyboard or make a share link that expires.",
    },
];

export default function Project() {
    return <ProjectDetail
        path="/drishyam"
        sectionTitle="Inside the library"
        description="I built Drishyam so I could save a video and find it again later. I paste a link or upload a file, and my server takes care of the conversion."
        features={features}
    />;
}
