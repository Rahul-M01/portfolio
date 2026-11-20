import React from 'react';
import ProjectDetail from '../ProjectDetail';

const features = [
    {
        title: "Tasks",
        summary: "Tasks have a due date and one of three priorities.",
        detail: "I can filter out completed or snoozed tasks, find overdue work or search for something I’ve already finished.",
    },
    {
        title: "Notes",
        summary: "Changes save while I type. I can pin a note I keep coming back to.",
        detail: "Full-text search looks inside the notes as well as their titles.",
    },
    {
        title: "Reminders",
        summary: "A reminder shows up as a Windows notification.",
        detail: "It can repeat daily, weekly or monthly. The tray process keeps it running when the main window is closed.",
    },
    {
        title: "On your desktop",
        summary: "Notes and tasks live in a local SQLite file.",
        detail: "The editor has keyboard shortcuts and can follow the light or dark theme in Windows.",
    },
];

export default function Project() {
    return <ProjectDetail
        path="/lekhak"
        sectionTitle="Using Lekhak"
        description="I use Lekhak for notes, tasks and reminders on Windows. Closing the window leaves it in the system tray, so a reminder can still catch me later."
        features={features}
    />;
}
