import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Header from '../header/header';
import Footer from '../footer/Footer';
import Chrome from '../common/Chrome';

const projects = [
    {
        code: 'P-01',
        title: 'Bhima',
        type: 'Discord bot',
        description: 'Discord bot with moderation, music, games, polls and utilities.',
        href: '/bot',
        stack: ['Node.js', 'Discord.js', 'SQL'],
        accent: '#ff7448',
        visual: 'chat',
    },
    {
        code: 'P-02',
        title: 'Agni',
        type: 'Homelab',
        description: 'My homelab setup for storage, media, networking and remote access.',
        href: '/homelab',
        stack: ['Docker', 'Nginx', 'Linux'],
        accent: '#f4b14b',
        visual: 'network',
    },
    {
        code: 'P-03',
        title: 'Drishyam',
        type: 'Web app',
        description: 'Saves videos from links to a searchable local library.',
        href: '/drishyam',
        stack: ['React', 'Java', 'FFmpeg'],
        accent: '#44c8d8',
        visual: 'video',
    },
    {
        code: 'P-04',
        title: 'Lekhak',
        type: 'Desktop app',
        description: 'Desktop notes, tasks and reminders stored locally.',
        href: '/lekhak',
        stack: ['Electron', 'React', 'SQLite'],
        accent: '#d9bd84',
        visual: 'notes',
    },
    {
        code: 'P-05',
        title: 'Kubera',
        type: 'Desktop app',
        description: 'Monzo spending, budget and recurring-payment dashboard.',
        href: '/kubera',
        stack: ['Electron', 'Express', 'SQLite'],
        accent: '#b8df62',
        visual: 'ledger',
    },
    {
        code: 'P-06',
        title: 'Yudhishtra',
        type: 'Desktop app',
        description: 'Local repository scanner and test generator using Ollama.',
        href: '/yudhishtra',
        stack: ['Electron', 'TypeScript', 'Ollama'],
        accent: '#9e8dff',
        visual: 'audit',
    },
    {
        code: 'P-07',
        title: 'Drishti',
        type: 'Desktop app',
        description: 'Prometheus dashboard for my homelab services.',
        href: '/drishti',
        stack: ['Electron', 'Express', 'Prometheus'],
        accent: '#54d49a',
        visual: 'telemetry',
    },
    {
        code: 'P-08',
        title: 'Simulation',
        type: 'Browser experiment',
        description: 'Browser experiments with particles, physics and maths.',
        href: 'https://rahul-m01.github.io/simulation/',
        stack: ['JavaScript', 'Canvas', 'WebGL'],
        accent: '#ef78ab',
        visual: 'particles',
        external: true,
    },
];

const particles = [
    [10, 18, 1.1], [21, 73, .7], [31, 38, 1.35], [42, 84, .85],
    [50, 16, .65], [58, 57, 1.2], [69, 29, .9], [78, 77, 1.4],
    [88, 45, .72], [16, 49, .95], [37, 65, .62], [62, 88, .8],
    [82, 14, 1.05], [93, 69, .58],
];

const ProjectVisual = ({ project }) => {
    switch (project.visual) {
    case 'chat':
        return (
            <div className="visual-chat" aria-hidden="true">
                <div className="chat-rail">
                    <span className="rail-mark active" />
                    <span className="rail-mark" />
                    <span className="rail-mark" />
                    <span className="rail-mark" />
                </div>
                <div className="chat-feed">
                    <div className="chat-line">
                        <span className="chat-avatar">B</span>
                        <div><b>BHIMA / MOD</b><i>message deleted · #general</i></div>
                        <time>20:14</time>
                    </div>
                    <div className="chat-line">
                        <span className="chat-avatar alt">R</span>
                        <div><b>RAHUL</b><i>/play evening mix</i></div>
                        <time>20:15</time>
                    </div>
                    <div className="chat-line live">
                        <span className="chat-avatar">B</span>
                        <div><b>BHIMA / MUSIC</b><i>queue · 12 tracks</i></div>
                        <span className="typing"><i /><i /><i /></span>
                    </div>
                    <div className="command-line"><span>/</span><i>type a command</i><b /></div>
                </div>
            </div>
        );
    case 'network':
        return (
            <div className="visual-network" aria-hidden="true">
                <svg viewBox="0 0 640 340" preserveAspectRatio="none">
                    <path d="M96 166 L231 82 L374 129 L529 55" />
                    <path d="M96 166 L256 264 L374 129 L532 246" />
                    <path d="M231 82 L256 264" />
                </svg>
                <span className="network-node node-a"><b>GW</b><i>gateway</i></span>
                <span className="network-node node-b"><b>PX</b><i>proxy</i></span>
                <span className="network-node node-c core"><b>AG</b><i>core</i></span>
                <span className="network-node node-d"><b>FS</b><i>storage</i></span>
                <span className="network-node node-e"><b>MX</b><i>media</i></span>
                <span className="network-packet packet-a" />
                <span className="network-packet packet-b" />
            </div>
        );
    case 'video':
        return (
            <div className="visual-video" aria-hidden="true">
                <div className="video-frame">
                    <span className="frame-index">FRAME / 0842</span>
                    <button type="button" tabIndex="-1" aria-hidden="true">▶</button>
                    <div className="video-caption"><b>LOCAL ARCHIVE</b><i>Untitled capture · 18:42</i></div>
                </div>
                <div className="video-timeline">
                    <span className="timeline-time">06:18</span>
                    <div className="timeline-track"><i /><b /></div>
                    <span className="timeline-time">18:42</span>
                </div>
                <div className="frame-strip">{[1, 2, 3, 4, 5].map((frame) => <span key={frame}><i>{frame}</i></span>)}</div>
            </div>
        );
    case 'notes':
        return (
            <div className="visual-notes" aria-hidden="true">
                <div className="note-shadow" />
                <article className="note-sheet">
                    <header><span>19 / 07</span><i>LEKHAK</i></header>
                    <h4>Saturday</h4>
                    <p>3 tasks</p>
                    <ul>
                        <li className="done"><span />Sort the archive</li>
                        <li><span />Write down the idea</li>
                        <li><span />Set the reminder</li>
                    </ul>
                    <footer>LOCAL NOTE · 0041</footer>
                </article>
                <div className="note-tab">PINNED</div>
            </div>
        );
    case 'ledger':
        return (
            <div className="visual-ledger" aria-hidden="true">
                <div className="ledger-top">
                    <span><i>MONTH / JUL</i><b>£1,284.60</b></span>
                    <span><i>CHANGE</i><b className="positive">− 8.4%</b></span>
                </div>
                <svg className="ledger-chart" viewBox="0 0 620 220" preserveAspectRatio="none">
                    <path className="chart-axis" d="M0 182 H620 M0 122 H620 M0 62 H620" />
                    <polyline points="0,166 48,151 92,158 138,112 186,126 233,76 280,98 330,65 380,88 430,44 480,70 530,38 620,52" />
                    <circle cx="620" cy="52" r="5" />
                </svg>
                <div className="ledger-rows">
                    <span><i>01</i><b>Home</b><em>£402</em></span>
                    <span><i>02</i><b>Food</b><em>£218</em></span>
                    <span><i>03</i><b>Travel</b><em>£164</em></span>
                </div>
            </div>
        );
    case 'audit':
        return (
            <div className="visual-audit" aria-hidden="true">
                <header><span>repository / current</span><i>LOCAL SCAN</i></header>
                <div className="code-window">
                    <span><i>18</i><b className="code-dim">const</b> result = await inspect(source);</span>
                    <span className="removed"><i>19</i><b>−</b> return result.data;</span>
                    <span className="added"><i>19</i><b>+</b> return validate(result.data);</span>
                    <span><i>20</i><b className="code-dim">if</b> (!result.ok) throw error;</span>
                    <span><i>21</i><b className="code-dim">export</b> default result;</span>
                    <div className="scan-beam" />
                </div>
                <footer><span>1 suggestion</span><i>YUDHISHTRA / AUDIT</i></footer>
            </div>
        );
    case 'telemetry':
        return (
            <div className="visual-telemetry" aria-hidden="true">
                <div className="telemetry-head"><span>HOME / SERVICES</span><i>7 CONNECTED</i></div>
                <svg viewBox="0 0 620 180" preserveAspectRatio="none">
                    <path className="telemetry-axis" d="M0 42 H620 M0 90 H620 M0 138 H620" />
                    <polyline points="0,112 35,105 70,118 104,72 139,90 174,84 209,92 244,38 279,71 314,66 349,112 384,98 419,103 454,62 489,77 524,48 559,69 594,41 620,51" />
                </svg>
                <div className="service-bars">
                    {[42, 67, 28, 82, 54, 73, 36].map((height, index) => (
                        <span key={height} style={{ '--bar': `${height}%` }}><i>0{index + 1}</i><b /></span>
                    ))}
                </div>
            </div>
        );
    case 'particles':
        return (
            <div className="visual-particles" aria-hidden="true">
                <svg viewBox="0 0 640 360" preserveAspectRatio="none">
                    <path d="M64 276 C138 76 246 315 332 116 S511 55 587 222" />
                    <path d="M39 168 C166 271 218 45 367 217 S536 307 612 118" />
                </svg>
                {particles.map(([x, y, scale], index) => (
                    <span
                        key={`${x}-${y}`}
                        style={{ '--x': `${x}%`, '--y': `${y}%`, '--scale': scale, '--delay': `${index * -0.23}s` }}
                    />
                ))}
                <div className="particle-readout"><i>X 42.18</i><i>Y 08.73</i><b>SIM / 024</b></div>
            </div>
        );
    default:
        return null;
    }
};

const AmbientField = ({ accent, projectIndex }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (/jsdom/i.test(navigator.userAgent)) return undefined;
        const context = canvas?.getContext('2d');
        if (!canvas || !context) return undefined;

        const rgb = [
            parseInt(accent.slice(1, 3), 16),
            parseInt(accent.slice(3, 5), 16),
            parseInt(accent.slice(5, 7), 16),
        ];
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const pointer = { x: window.innerWidth * .68, y: window.innerHeight * .42 };
        let width = 0;
        let height = 0;
        let frame = 0;
        let points = [];

        const resize = () => {
            const ratio = Math.min(window.devicePixelRatio || 1, 2);
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = Math.round(width * ratio);
            canvas.height = Math.round(height * ratio);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);

            points = Array.from({ length: 52 }, (_, index) => {
                const seed = index * 91.7 + projectIndex * 47.3;
                return {
                    x: ((Math.sin(seed) + 1) / 2) * width,
                    y: ((Math.cos(seed * .71) + 1) / 2) * height,
                    radius: 1 + (index % 4) * .45,
                    speed: .08 + (index % 5) * .025,
                    phase: seed,
                };
            });
        };

        const trackPointer = (event) => {
            pointer.x = event.clientX;
            pointer.y = event.clientY;
        };

        const draw = (time = 0) => {
            context.clearRect(0, 0, width, height);
            const seconds = time * .001;

            points.forEach((point, index) => {
                const driftX = reducedMotion ? 0 : Math.sin(seconds * point.speed + point.phase) * 18;
                const driftY = reducedMotion ? 0 : Math.cos(seconds * point.speed * .82 + point.phase) * 14;
                const x = point.x + driftX;
                const y = point.y + driftY;
                const pointerDistance = Math.hypot(pointer.x - x, pointer.y - y);
                const pointerPull = Math.max(0, 1 - pointerDistance / 260);
                const px = x + (pointer.x - x) * pointerPull * .045;
                const py = y + (pointer.y - y) * pointerPull * .045;

                context.beginPath();
                context.arc(px, py, point.radius + pointerPull * 1.8, 0, Math.PI * 2);
                context.fillStyle = `rgba(${rgb.join(',')},${.08 + pointerPull * .22})`;
                context.fill();

                for (let otherIndex = index + 1; otherIndex < points.length; otherIndex += 1) {
                    const other = points[otherIndex];
                    const ox = other.x + (reducedMotion ? 0 : Math.sin(seconds * other.speed + other.phase) * 18);
                    const oy = other.y + (reducedMotion ? 0 : Math.cos(seconds * other.speed * .82 + other.phase) * 14);
                    const distance = Math.hypot(ox - px, oy - py);

                    if (distance < 118) {
                        context.beginPath();
                        context.moveTo(px, py);
                        context.lineTo(ox, oy);
                        context.strokeStyle = `rgba(${rgb.join(',')},${(1 - distance / 118) * .045})`;
                        context.lineWidth = .7;
                        context.stroke();
                    }
                }
            });

            if (!reducedMotion) frame = window.requestAnimationFrame(draw);
        };

        resize();
        draw();
        window.addEventListener('resize', resize);
        window.addEventListener('pointermove', trackPointer, { passive: true });

        return () => {
            window.cancelAnimationFrame(frame);
            window.removeEventListener('resize', resize);
            window.removeEventListener('pointermove', trackPointer);
        };
    }, [accent, projectIndex]);

    return <canvas ref={canvasRef} className="ambient-field" aria-hidden="true" />;
};

const ProjectLink = ({ project, index, active, onActivate }) => {
    const content = (
        <>
            <span className="project-number">{String(index + 1).padStart(2, '0')}</span>
            <span className="project-name">{project.title}</span>
            <span className="project-kind">{project.type}</span>
            <span className="project-arrow" aria-hidden="true">{project.external ? '↗' : '→'}</span>
        </>
    );

    const props = {
        className: `project-link${active ? ' active' : ''}`,
        onMouseEnter: onActivate,
        onFocus: onActivate,
        onTouchStart: onActivate,
        style: { '--project-accent': project.accent },
        'aria-current': active ? 'true' : undefined,
    };

    if (project.external) {
        return <a href={project.href} target="_blank" rel="noreferrer" {...props}>{content}</a>;
    }

    return <Link to={project.href} {...props}>{content}</Link>;
};

const StageLink = ({ project }) => {
    const content = (
        <>
            <span>Open</span>
            <span aria-hidden="true">{project.external ? '↗' : '→'}</span>
        </>
    );

    if (project.external) {
        return <a className="stage-link" href={project.href} target="_blank" rel="noreferrer">{content}</a>;
    }

    return <Link className="stage-link" to={project.href}>{content}</Link>;
};

const Home = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProject = projects[activeIndex];
    const updateTilt = (event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        event.currentTarget.style.setProperty('--tilt-x', `${y * -3.4}deg`);
        event.currentTarget.style.setProperty('--tilt-y', `${x * 4.6}deg`);
    };
    const resetTilt = (event) => {
        event.currentTarget.style.setProperty('--tilt-x', '0deg');
        event.currentTarget.style.setProperty('--tilt-y', '0deg');
    };

    return (
        <main id="main-content" className="app">
            <Chrome />
            <Header />

            <div className="home-shell" style={{ '--accent': activeProject.accent }}>
                <AmbientField accent={activeProject.accent} projectIndex={activeIndex} />

                <aside className="identity-rail" id="about" aria-labelledby="page-title">
                    <div className="identity-copy">
                        <h1 id="page-title">Rahul <br />Mahajan</h1>
                        <p>Projects</p>
                    </div>
                    <a className="identity-github" href="https://github.com/Rahul-M01" target="_blank" rel="noreferrer">GitHub ↗</a>
                </aside>

                <section className="project-index" id="projects" aria-labelledby="projects-title">
                    <div className="index-heading">
                        <h2 id="projects-title">Projects</h2>
                        <span className="project-count">
                            {String(activeIndex + 1).padStart(2, '0')} / 08
                        </span>
                    </div>

                    <div className="project-list">
                        {projects.map((project, index) => (
                            <ProjectLink
                                project={project}
                                index={index}
                                active={index === activeIndex}
                                onActivate={() => setActiveIndex(index)}
                                key={project.title}
                            />
                        ))}
                    </div>
                </section>

                <section
                    className="project-stage"
                    aria-live="polite"
                    aria-label={`${activeProject.title} project preview`}
                    onPointerMove={updateTilt}
                    onPointerLeave={resetTilt}
                >
                    <div className="stage-frame">
                        <header className="stage-header">
                            <span>{activeProject.code}</span>
                            <span className="stage-signal" aria-hidden="true"><i /><i /><i /></span>
                            <span>{activeProject.type}</span>
                        </header>

                        <div className="stage-title">
                            <h3>{activeProject.title}</h3>
                            <span className="stage-code">{activeProject.code.replace('P-', '')}</span>
                        </div>
                        <span className="stage-ghost" aria-hidden="true">{activeProject.title}</span>

                        <div className="stage-visual" key={activeProject.title}>
                            <ProjectVisual project={activeProject} />
                        </div>

                        <footer className="stage-footer">
                            <div>
                                <p>{activeProject.description}</p>
                                <div className="stage-stack">
                                    {activeProject.stack.map((item) => <span key={item}>{item}</span>)}
                                </div>
                            </div>
                            <StageLink project={activeProject} />
                        </footer>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    );
};

export default Home;
