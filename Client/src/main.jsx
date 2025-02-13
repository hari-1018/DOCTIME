import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// import { BrowserRouter } from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import store from './app/store.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"


const CLIENTID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BrowserRouter> */}
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={CLIENTID}>
      <App />
      <ReactQueryDevtools initialIsOpen={false}/>
      <ToastContainer
        autoClose={2000}
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
    </QueryClientProvider>
    {/* </BrowserRouter> */}
  </StrictMode>,
)
