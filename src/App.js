import './App.css';
import Bot from './projects/discord_bot/bot';
import Homelab from './projects/homelab/homelab';
import Home from './home/home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutWithTracker from './useTracker/layoutTracker';
import Drishyam from './projects/drishyam/drishyam';
import DrishyamHome from './projects/drishyam/drishyam_site/drishyam_home';
import Lekhak from './projects/lekhak/lekhak';
import Kubera from './projects/kubera/kubera';
import Yudhishtra from './projects/yudhishtra/yudhishtra';
import Drishti from './projects/drishti/drishti';
import ProtectedRoute from './routing/protected-route'
import Login from './login/login'

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <LayoutWithTracker><Home /></LayoutWithTracker>,
        },
        {
            path: "/bot",
            element: <LayoutWithTracker><Bot /></LayoutWithTracker>,
        },
        {
            path: "/homelab",
            element: <LayoutWithTracker><Homelab /></LayoutWithTracker>,
        },
        {
            path: "/drishyam",
            element: <LayoutWithTracker><Drishyam /></LayoutWithTracker>,
        },
        {
            path: "/lekhak",
            element: <LayoutWithTracker><Lekhak /></LayoutWithTracker>,
        },
        {
            path: "/kubera",
            element: <LayoutWithTracker><Kubera /></LayoutWithTracker>,
        },
        {
            path: "/yudhishtra",
            element: <LayoutWithTracker><Yudhishtra /></LayoutWithTracker>,
        },
        {
            path: "/drishti",
            element: <LayoutWithTracker><Drishti /></LayoutWithTracker>,
        },
        {
            path: "/drishyam_home",
            element: (
                <ProtectedRoute>
                    <LayoutWithTracker><DrishyamHome /></LayoutWithTracker>
                </ProtectedRoute>
            ),
        },
        {
            path: "/login",
            element: <LayoutWithTracker><Login /></LayoutWithTracker>,
        },
    ], { basename: process.env.PUBLIC_URL || '/' });

    return (
        <RouterProvider router={router} />
    );
}

export default App;
