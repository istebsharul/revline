import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './Store/store'
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTop from './Components/ScrollToTop';
import { HelmetProvider } from "react-helmet-async";


const root = ReactDOM.createRoot(document.getElementById('root'));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ScrollToTop />
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
