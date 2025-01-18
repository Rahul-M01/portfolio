// App.js
import './App.css';
import Bot from './projects/discord_bot/bot';
import Homelab from './projects/homelab/homelab';
import Home from './home/home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutWithTracker from './useTracker/layoutTracker'; // Ensure path is correct
import Drishyam from './projects/drishyam/drishyam';
import DrishyamHome from './projects/drishyam/drishyam_site/drishyam_home';

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
            path: "/drishyam_home",
            element: <LayoutWithTracker><DrishyamHome /></LayoutWithTracker>,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
