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
        "I finished my MSc thesis in Data Intensive Astrophysics at Cardiff. I simulated pairs of black holes merging, so I knew how heavy each one was. Then I gave a model just the gravitational waves from each merger to see how well it could estimate those masses.",
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
        title: 'What can a gravitational wave tell us about two black holes?',
        paragraphs: [
            "I trained neural networks on three versions of the same simulated signals. One showed how the wave changed over time, another showed its frequencies, and the third measured how closely it matched a template. I tried those on their own and in combination. That gave me seven ways to train a model on exactly the same mergers.",
            "I compared their estimates with a standard method called Bilby on five simulated mergers. When I trained on 200,000 simulations instead of 20,000, the average gap between the models and Bilby roughly halved. Time and frequency together came closest on average, but a different input came out ahead depending on which of the five test signals I used. Once a model was loaded, drawing 20,000 samples took about 8 to 11 seconds on four CPU threads.",
        ],
    },
    {
        title: 'Predicting Microsoft’s share price direction',
        paragraphs: [
            "For a group project at Cardiff, we tried to predict whether Microsoft shares would close higher 90 trading days later. We gave three models the same history, trained on the first 2,500 trading days, then moved the test forward 63 days at a time. That let us see how each model handled the next quarter.",
            "Microsoft ended up higher in about 62% of our examples, so a model could look fairly good just by saying “up”. We checked the two directions separately. The random forest did best on rises, with an F1 score of 0.79. The convolutional network was better at picking up falls. Our most complicated model combined three methods and still missed a lot of the downturns.",
        ],
    },
    {
        title: 'Landing a booster in the browser',
        paragraphs: [
            "I built a flight simulator where you can launch from five UK sites and watch a reusable booster try to get back to the pad. Try the same site in calm weather and then in a storm. The bit I’d look at is the last few seconds before touchdown.",
            "The browser works out the flight 240 times a second. You can drag along the flight chart to replay the landing, watch the throttle and fuel change, and check how fast the booster was moving when it touched down.",
        ],
        link: { label: 'Run the simulation', href: 'https://rahul-m01.github.io/simulation/' },
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
