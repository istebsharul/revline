// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Components/User/Navbar';
import Footer from './Components/User/Footer';
import { Toaster } from 'react-hot-toast';
import UserRoutes from './Routes/userRoutes';
import { loadUser } from './Actions/userActions';
import Call from './Components/CustomerSupport/Call.jsx';
import WhatsApp from './Components/CustomerSupport/Whatsapp.jsx';
import store from './Store/store.js';


const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state)=> state.auth.user);

  const fetchUserData = () => {
    if(!userData){
      dispatch(loadUser());
    }
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Call/>
      <WhatsApp/>
      <Navbar />
      <UserRoutes />
      <Footer />
    </>
  );
};

export default App;
