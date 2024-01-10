import React from 'react';
import ReactDOM from 'react-dom/client';
import ParticlesBackground from "./components/UI/ParticlesBackground";
import './App.css';
import WeatherDisplayUi from './components/UI/WeatherDisplayUi';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <WeatherDisplayUi/>
        <ParticlesBackground/>
    </React.StrictMode>
);

