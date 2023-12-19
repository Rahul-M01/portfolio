import logo from './logo.svg';
import './App.css';
import Bot from './projects/discord_bot/bot';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom"
import Home
    from './home/home';

function App() {
    // initialize a browser router
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        // other pages....
        {
            path: "/bot",
            element: <Bot />,
        },
    ])

    return (
        <RouterProvider router={router} />
    )
}

export default App