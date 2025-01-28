import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';


const CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <GoogleOAuthProvider clientId={CLIENTID}>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ 
          width: '400px',
          padding: '20px',
          borderRadius: '8px',
          fontSize: '16px',
          zIndex: 9999
        }}
        progressStyle={{
          backgroundColor: '#ffcc00',
        }}/>
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
