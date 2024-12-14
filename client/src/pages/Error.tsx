import { useRouteError } from 'react-router-dom';

interface RouteError {
    statusText?: string;
    message?: string;
}

export default function ErrorPage() {
    const error = useRouteError() as RouteError;
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oh no! An error occurred.</h1>
            <h2>Status: {error.statusText}</h2>
            <h2>Message: {error.message}</h2>
        </div>
    );
}