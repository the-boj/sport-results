import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './app/App';
import './styles.css';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('./service-worker.js')
            .then((registration) => {
                console.log('ServiceWorker registration successful:', registration);
            })
            .catch((error) => {
                console.log('ServiceWorker registration failed:', error);
            });
    });
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
