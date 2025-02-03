import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './app/store.jsx';


const CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={CLIENTID}>
      <App />
      <ToastContainer
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ 
          width: '400px',
          padding: '10px',
          borderRadius: '8px',
          fontSize: '16px',
          zIndex: 9999
        }}
        progressStyle={{
          backgroundColor: '#00ced1',
        }}/>
    </GoogleOAuthProvider>
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
