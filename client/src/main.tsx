import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.js';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Discover from './pages/Discover.js';
import ErrorPage from './pages/Error';
import Login from './pages/LoginPage/Login.js'
import Group from './pages/Group.js'
import SignupForm from './pages/Signup.js';

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
            {
                path: '/discover',
                element: <Discover />,
                errorElement: <ErrorPage />,
        
            },
            {
                path: '/login',
                element: <Login />,
                errorElement: <Login />,
            },
            {
                path: '/Profile',
                element: <Profile />,
                errorElement: <Profile />,
            },
            {
                path: '/signup',
                element: <SignupForm />,
                errorElement: <ErrorPage />,
            },
           {
                path: '/groups/:groupName',
                element: <Group />,
                errorElement: <ErrorPage />,
        
            },
        
        ]
    }
]);

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<RouterProvider router={router}/>);
}