// src/App.jsx
import React, { useEffect } from 'react';
import Navbar from './Components/User/Navbar';
import Footer from './Components/User/Footer';
import { Toaster } from 'react-hot-toast';
import UserRoutes from './Routes/userRoutes';
import { loadUser } from './Actions/userActions';
import store from './Store/store.js';

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  })

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <UserRoutes />
      <Footer />
    </>
  );
};

export default App;
