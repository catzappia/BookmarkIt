import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.js';
import Home from './pages/Home';
// import Profile from './pages/Profile';
import Discover from './pages/Discover.js';
import ErrorPage from './pages/Error';
import Login from './pages/LoginPage/Login.js'
import Group from './pages/Group.js'
import SignupForm from './pages/Signup.js';
import Profile from './pages/Profile.js';

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
    },
    {
        path: '/login',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Login />
            },
        ]
    },
    {
        path: '/profile',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Profile />
            },
        ]
    },
    {
        path: '/signup',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <SignupForm />
            },
        ]
    },
    {
        path: '/:groupName',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Group />
            },
        ]
    }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<RouterProvider router={router}/>);
}