import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.js';
import Home from './pages/Home';
// import Profile from './pages/Profile';
import Discover from './pages/Discover.js';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />
            },
        ]
    },
    {
        path: '/discover',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Discover />
            },
        ]
    }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<RouterProvider router={router}/>);
}