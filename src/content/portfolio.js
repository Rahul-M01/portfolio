/* ---------------------------------------------------------
   Single source of truth for portfolio content.
   All pages import their copy from here.
   --------------------------------------------------------- */
import discordLogo from '../assets/discord.png';
import homelabLogo from '../assets/homelab.png';
import videoLogo from '../assets/video.png';
import drishtiLogo from '../assets/drishti.png';

export const identity = {
    first: 'Rahul',
    last: 'Mahajan',
    role: 'Software developer',
    location: 'Cardiff, UK',
    status: 'Open to work',
    blurb:
        "I’ve spent two years writing software with Angular, Spring Boot and PostgreSQL. Outside work, I look after the server that runs my own projects.",
    study:
        "I'm finishing an MSc in Data Intensive Astrophysics. My research looks at how machine learning can help us analyse gravitational-wave data.",
    colophon: 'Everything below is built and hosted by me.',
};

export const services = [
    {
        title: 'Bhima',
        tag: 'Discord bot',
        desc: "Music, moderation and a blackjack table for Discord.",
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
        desc: "My home server for files, calendars and films.",
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
        desc: "A video library I host at home and watch in my browser.",
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
        desc: "A Windows notebook that remembers to nudge me after I close it.",
        href: '/lekhak',
        mono: 'ल',
        hue: '#e8e4d8',
        stack: ['Electron', 'React 19', 'Tailwind', 'SQLite'],
        year: '2025',
    },
    {
        title: 'Kubera',
        tag: 'Finance tracker',
        desc: "Bank transactions and monthly budgets on my desktop.",
        href: '/kubera',
        mono: '₹',
        hue: '#f5c518',
        stack: ['Electron', 'Express', 'SQLite'],
        year: '2025',
    },
    {
        title: 'Yudhishtra',
        tag: 'Code auditor',
        desc: "A code review tool that reads a local repo with Ollama.",
        href: '/yudhishtra',
        mono: 'यु',
        hue: '#6b7bff',
        stack: ['Electron', 'React', 'TypeScript', 'SQLite', 'Ollama'],
        year: '2025',
    },
    {
        title: 'Drishti',
        tag: 'Project monitor',
        desc: "A desktop window onto the health of my local repositories.",
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
            "A reusable booster flight simulation that runs in the browser.",
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
        note: "For my MSc thesis, I'm working with machine learning and gravitational-wave data from binary black holes and neutron stars.",
    },
    {
        title: 'Stock-market analysis pipeline',
        note: "I tested more than 30 indicators against 20 years of market data, moving the test window forward each time.",
    },
    {
        title: 'AI game development',
        note: "I've won two international AI game-development competitions.",
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
        sub: "The services I host at home.",
        projects: services,
    },
    {
        id: 'apps',
        numeral: 'II',
        title: 'Desktop apps',
        sub: "Tools for notes, finances, code and monitoring.",
        projects: desktopApps,
    },
    {
        id: 'experiments',
        numeral: 'III',
        title: 'Experiments',
        sub: "Smaller things I've made for the browser.",
        projects: experiments,
    },
];

/* Flat, numbered list used by the gallery and deck variants. */
export const allProjects = groups.flatMap((g) =>
    g.projects.map((p) => ({ ...p, group: g.title, groupId: g.id }))
);
