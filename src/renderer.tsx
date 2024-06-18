import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => <h1>Hello from React and Electron!</h1>;

// Find the root div where React components will be mounted.
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement); // Create a root.
    root.render(<App />); // Use the render method from the root instance.
}
