import { lazy, Suspense, useEffect, useState } from 'react';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import './App.css';

import Home from './home/home';
import LayoutWithTracker from './useTracker/layoutTracker';
import ProtectedRoute from './routing/protected-route';

const Bot = lazy(() => import('./projects/discord_bot/bot'));
const Homelab = lazy(() => import('./projects/homelab/homelab'));
const Drishyam = lazy(() => import('./projects/drishyam/drishyam'));
const DrishyamHome = lazy(() => import('./projects/drishyam/drishyam_site/drishyam_home'));
const Lekhak = lazy(() => import('./projects/lekhak/lekhak'));
const Kubera = lazy(() => import('./projects/kubera/kubera'));
const Yudhishtra = lazy(() => import('./projects/yudhishtra/yudhishtra'));
const Drishti = lazy(() => import('./projects/drishti/drishti'));
const Login = lazy(() => import('./login/login'));

const GREETINGS = [
    { text: 'स्वागत', language: 'HI' },
    { text: 'Bienvenue', language: 'FR' },
    { text: 'ようこそ', language: 'JA' },
    { text: 'Bienvenido', language: 'ES' },
    { text: '환영합니다', language: 'KO' },
    { text: 'Willkommen', language: 'DE' },
    { text: 'ਜੀ ਆਇਆਂ ਨੂੰ', language: 'PA' },
    { text: 'Welcome', language: 'EN' },
];

const SiteIntro = () => {
    const [greetingIndex, setGreetingIndex] = useState(0);
    const [isLeaving, setIsLeaving] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
        const timers = [];
        document.documentElement.classList.add('intro-active');

        if (reducedMotion) {
            timers.push(window.setTimeout(() => setIsVisible(false), 80));
        } else {
            GREETINGS.forEach((_, index) => {
                timers.push(window.setTimeout(() => setGreetingIndex(index), index * 205));
            });
            timers.push(window.setTimeout(() => setIsLeaving(true), GREETINGS.length * 205 + 260));
            timers.push(window.setTimeout(() => setIsVisible(false), GREETINGS.length * 205 + 1220));
        }

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer));
            document.documentElement.classList.remove('intro-active');
        };
    }, []);

    useEffect(() => {
        if (!isVisible) document.documentElement.classList.remove('intro-active');
    }, [isVisible]);

    if (!isVisible) return null;

    const greeting = GREETINGS[greetingIndex];
    const progress = ((greetingIndex + 1) / GREETINGS.length) * 100;

    return (
        <div className={`site-intro${isLeaving ? ' site-intro--leaving' : ''}`} aria-hidden="true">
            <div className="intro-shutter intro-shutter--left" />
            <div className="intro-shutter intro-shutter--right" />
            <div className="intro-scan" />

            <div className="intro-topline">
                <span>{String(greetingIndex + 1).padStart(2, '0')}</span>
                <span>{greeting.language}</span>
                <span>{String(GREETINGS.length).padStart(2, '0')}</span>
            </div>

            <div className="intro-word-stage" key={`${greeting.language}-${greetingIndex}`}>
                <span className="intro-word-ghost">{greeting.text}</span>
                <span className="intro-word" data-word={greeting.text}>{greeting.text}</span>
            </div>

            <div className="intro-meter">
                <span>RAHUL MAHAJAN</span>
                <i><b style={{ width: `${progress}%` }} /></i>
                <span>PROJECTS</span>
            </div>

            <span className="intro-corner intro-corner--tl" />
            <span className="intro-corner intro-corner--tr" />
            <span className="intro-corner intro-corner--bl" />
            <span className="intro-corner intro-corner--br" />
        </div>
    );
};

const PageLoader = () => (
    <div className="route-loader" role="status" aria-live="polite">
        <span className="route-loader-orbit" aria-hidden="true" />
        <span>Loading project</span>
    </div>
);

const withLayout = (page) => (
    <LayoutWithTracker>
        <Suspense fallback={<PageLoader />}>{page}</Suspense>
    </LayoutWithTracker>
);

const NotFound = () => (
    <main className="not-found" id="main-content">
        <p className="not-found-code">404 / OFF COURSE</p>
        <h1>This route is outside the map.</h1>
        <p>The project may have moved, but the rest of the archive is still here.</p>
        <Link to="/">Return to the portfolio</Link>
    </main>
);

const router = createBrowserRouter([
    { path: '/', element: <LayoutWithTracker><Home /></LayoutWithTracker> },
    { path: '/bot', element: withLayout(<Bot />) },
    { path: '/homelab', element: withLayout(<Homelab />) },
    { path: '/drishyam', element: withLayout(<Drishyam />) },
    { path: '/lekhak', element: withLayout(<Lekhak />) },
    { path: '/kubera', element: withLayout(<Kubera />) },
    { path: '/yudhishtra', element: withLayout(<Yudhishtra />) },
    { path: '/drishti', element: withLayout(<Drishti />) },
    {
        path: '/drishyam_home',
        element: withLayout(<ProtectedRoute><DrishyamHome /></ProtectedRoute>),
    },
    { path: '/login', element: withLayout(<Login />) },
    { path: '*', element: <LayoutWithTracker><NotFound /></LayoutWithTracker> },
], {
    basename: import.meta.env.BASE_URL.replace(/\/$/, '') || '/',
    future: { v7_relativeSplatPath: true },
});

function App() {
    return (
        <>
            <SiteIntro />
            <RouterProvider router={router} future={{ v7_startTransition: true }} />
        </>
    );
}

export default App;
