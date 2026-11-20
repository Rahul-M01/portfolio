import React from 'react';
import ProjectDetail from '../ProjectDetail';

const features = [
    {
        title: "Accounts & transactions",
        summary: "The account view puts the balance and recent purchases together.",
        detail: "I can search by merchant, amount, category or date. If I correct a category, Kubera remembers the change.",
    },
    {
        title: "Spending breakdown",
        summary: "The charts let me compare spending over one, three or six months.",
        detail: "I can look at a merchant, tag or category. The first import covers six months of transactions and helps bring recurring payments into view.",
    },
    {
        title: "Budgets",
        summary: "I can set a monthly limit for groceries, transport or another category.",
        detail: "Regular bills and subscriptions show up alongside other spending. A category’s balance can carry over into the next month.",
    },
    {
        title: "Local storage",
        summary: "An Express server runs on my computer alongside the Electron app.",
        detail: "Credentials stay on the machine. Transaction history is stored locally using SQL.js.",
    },
];

export default function Project() {
    return <ProjectDetail
        path="/kubera"
        sectionTitle="Accounts and budgets"
        description="Kubera connects to my bank through an open banking API. I use the desktop app to look through transactions and see how much is left in a monthly budget."
        features={features}
    />;
}
