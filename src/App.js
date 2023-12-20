import logo from './logo.svg';
import './App.css';
import Bot from './projects/discord_bot/bot';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import Home
    from './home/home';
import Homelab from './projects/homelab/homelab';

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/bot",
            element: <Bot />,
        },
        {
            path: "/homelab",
            element: <Homelab />,
        },
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default App