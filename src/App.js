// App.js
import './App.css';
import Bot from './projects/discord_bot/bot';
import Homelab from './projects/homelab/homelab';
import Home from './home/home';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutWithTracker from './useTracker/layoutTracker'; // Ensure path is correct

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
    ]);

    return (
        <RouterProvider router={router} />
    );
}

export default App;
