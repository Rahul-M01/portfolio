/* ---------------------------------------------------------
   Single source of truth for portfolio content.
   All pages import their copy from here.
   --------------------------------------------------------- */
import discordLogo from '../images/discord.png';
import homelabLogo from '../images/homelab.png';
import videoLogo from '../images/video.png';
import drishtiLogo from '../images/drishti.png';

export const identity = {
    first: 'Rahul',
    last: 'Mahajan',
    role: 'Software developer',
    location: 'Cardiff, UK',
    status: 'Open to work',
    blurb:
        'Two years of professional experience building full-stack features in Angular, ' +
        'Spring Boot and PostgreSQL, and the test automation around them.',
    study:
        'Finishing an MSc in Data Intensive Astrophysics, applying machine learning to ' +
        'gravitational-wave data.',
    colophon: 'Everything below is built and hosted by me.',
};

export const services = [
    {
        title: 'Bhima',
        tag: 'Discord bot',
        desc:
            'Moderation, music, poker, blackjack, leveling, polls, translation and live ' +
            'analytics. Runs 24/7 on the homelab.',
        href: '/bot',
        img: discordLogo,
        mono: 'भ',
        hue: '#7d8cff',
        stack: ['Node.js', 'Discord.js', 'SQL'],
        year: '2023',
    },
    {
        title: 'Agni',
        tag: 'Homelab',
        desc:
            'Self-hosted personal cloud, media server and networking stack. Nextcloud, ' +
            'Plex and secure remote access.',
        href: '/homelab',
        img: homelabLogo,
        mono: 'अ',
        hue: '#ff7a45',
        stack: ['Docker', 'Nginx', 'Linux'],
        year: '2023',
    },
    {
        title: 'Drishyam',
        tag: 'Video platform',
        desc:
            'Browser-native video host that also auto-downloads content from a pasted ' +
            'link. Built for quick personal archives.',
        href: '/drishyam',
        img: videoLogo,
        mono: 'दृ',
        hue: '#2ff8ff',
        stack: ['React', 'FFmpeg', 'Node'],
        year: '2024',
    },
];

export const desktopApps = [
    {
        title: 'Lekhak',
        tag: 'Notes and tasks',
        desc:
            'Privacy-first desktop tasks, rich notes and scheduled reminders. Local ' +
            'SQLite, system tray, dark and light themes.',
        href: '/lekhak',
        mono: 'ल',
        hue: '#e8e4d8',
        stack: ['Electron', 'React 19', 'Tailwind', 'SQLite'],
        year: '2025',
    },
    {
        title: 'Kubera',
        tag: 'Finance tracker',
        desc:
            'Open banking dashboard with balances, spend analytics, category budgets ' +
            'and recurring payment detection. Stays on your machine.',
        href: '/kubera',
        mono: '₹',
        hue: '#f5c518',
        stack: ['Electron', 'Express', 'SQLite'],
        year: '2025',
    },
    {
        title: 'Yudhishtra',
        tag: 'Code auditor',
        desc:
            'Offline analyser for local git repos. Scans for vulnerabilities, generates ' +
            'tests and suggests next steps via Ollama.',
        href: '/yudhishtra',
        mono: 'यु',
        hue: '#6b7bff',
        stack: ['Electron', 'React', 'TypeScript', 'SQLite', 'Ollama'],
        year: '2025',
    },
    {
        title: 'Drishti',
        tag: 'Health monitor',
        desc:
            'Collects Prometheus metrics from every service on the lab into a single ' +
            'desktop dashboard.',
        href: '/drishti',
        img: drishtiLogo,
        mono: 'दृ',
        hue: '#4fd1c5',
        stack: ['Electron', 'Express', 'Prometheus'],
        year: '2024',
    },
];

export const experiments = [
    {
        title: 'Simulation',
        tag: 'Browser demo',
        desc:
            'Interactive simulation with physics, particles and playful maths. Hosted ' +
            'on GitHub Pages.',
        href: 'https://rahul-m01.github.io/simulation/',
        external: true,
        mono: '∿',
        hue: '#ff2d87',
        stack: ['JavaScript', 'Canvas', 'WebGL'],
        year: '2024',
    },
];

export const elsewhere = [
    {
        title: 'Gravitational-wave analysis',
        note: 'MSc thesis. Machine-learning methods for binary black-hole and neutron-star data.',
    },
    {
        title: 'Stock-market analysis pipeline',
        note: '20 years of market data, 30+ engineered indicators, walk-forward validation.',
    },
    {
        title: 'AI game development',
        note: 'Won two international AI game-development competitions.',
    },
];

export const skillGroups = [
    {
        label: 'Languages',
        items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'C++', 'C', 'Go'],
    },
    {
        label: 'Frameworks',
        items: ['Spring Boot', 'Angular', 'React', 'Django', 'Electron'],
    },
    {
        label: 'Data',
        items: ['PostgreSQL', 'MySQL', 'SQLite', 'NumPy', 'Pandas', 'scikit-learn', 'TensorFlow'],
    },
    {
        label: 'Infra & testing',
        items: [
            'Docker', 'Kubernetes', 'Azure Pipelines', 'Selenium',
            'Playwright', 'Cucumber', 'Git', 'Linux',
        ],
    },
];

export const groups = [
    {
        id: 'work',
        numeral: 'I',
        title: 'Live services',
        sub: 'Deployed on my homelab and running right now.',
        projects: services,
    },
    {
        id: 'apps',
        numeral: 'II',
        title: 'Desktop apps',
        sub: 'Local-first tools I use daily. No accounts, no cloud.',
        projects: desktopApps,
    },
    {
        id: 'experiments',
        numeral: 'III',
        title: 'Experiments',
        sub: 'Smaller browser builds.',
        projects: experiments,
    },
];

/* Flat, numbered list used by the gallery and deck variants. */
export const allProjects = groups.flatMap((g) =>
    g.projects.map((p) => ({ ...p, group: g.title, groupId: g.id }))
);
