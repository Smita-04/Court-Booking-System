import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// --------------------------------------------------------------------------------
// FINAL FIX: This sets the Render URL as the base for ALL API calls
// --------------------------------------------------------------------------------
import axios from 'axios';
const RENDER_API_URL = "https://court-booking-system-qthg.onrender.com";

// Set the base URL globally for all Axios requests
axios.defaults.baseURL = RENDER_API_URL; 
// You can remove this line after the next step for a cleaner app, but let's keep it 
// for now to be 100% sure the Vercel-Render connection is clean.


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);