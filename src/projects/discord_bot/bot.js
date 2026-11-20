import React from 'react';
import ProjectDetail from '../ProjectDetail';

const features = [
    {
        title: "Moderation",
        summary: "Moderators can mute, kick or ban a member from a channel.",
        detail: "They can also clear recent messages, recover deleted text, look up an edit and check who’s been active.",
    },
    {
        title: "Music",
        summary: "Give Bhima a song title or a link and it joins the music queue.",
        detail: "Players can see what’s coming up, pause, resume, skip a track or change the volume.",
    },
    {
        title: "Blackjack",
        summary: "The dealer runs the table inside Discord. Players bet with virtual chips.",
        detail: "Several people can join a game. Bhima keeps the scores and shows the standings after a hand.",
    },
    {
        title: "Texas Hold'em poker",
        summary: "Players share a table and bet with virtual chips.",
        detail: "The bot keeps hand histories, rankings and player statistics. It also supports Omaha and Seven-Card Stud.",
    },
    {
        title: "Other commands",
        summary: "Bhima can run a poll, translate a message or remind a role about something later.",
        detail: "There’s also a link shortener and an XP counter for server activity.",
    },
];

export default function Project() {
    return <ProjectDetail
        path="/bot"
        sectionTitle="Inside Bhima"
        description="Bhima runs in Discord. It can deal a hand of blackjack, queue the next song or help a moderator find an edited message. I run it on Agni."
        features={features}
    />;
}
