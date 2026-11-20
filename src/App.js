import './App.css';
import './common/motion.css';
import Bot from './projects/discord_bot/bot';
import Homelab from './projects/homelab/homelab';
import Home from './home/home';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import LayoutWithTracker from './useTracker/layoutTracker';
import Drishyam from './projects/drishyam/drishyam';
import DrishyamHome from './projects/drishyam/drishyam_site/drishyam_home';
import Lekhak from './projects/lekhak/lekhak';
import Kubera from './projects/kubera/kubera';
import Yudhishtra from './projects/yudhishtra/yudhishtra';
import Drishti from './projects/drishti/drishti';
import ProtectedRoute from './routing/protected-route'
import Login from './login/login'

const router = createBrowserRouter([{
    element: <LayoutWithTracker />,
    children: [
        { index: true, element: <Home /> },
        { path: 'bot', element: <Bot /> },
        { path: 'homelab', element: <Homelab /> },
        { path: 'drishyam', element: <Drishyam /> },
        { path: 'lekhak', element: <Lekhak /> },
        { path: 'kubera', element: <Kubera /> },
        { path: 'yudhishtra', element: <Yudhishtra /> },
        { path: 'drishti', element: <Drishti /> },
        { path: 'drishyam_home', element: <ProtectedRoute><DrishyamHome /></ProtectedRoute> },
        { path: 'login', element: <Login /> },
        { path: '*', element: <Navigate to="/" replace /> },
    ],
}], { basename: process.env.PUBLIC_URL || '/' });

export default function App() {
    return <RouterProvider router={router} />;
}
