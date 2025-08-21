// src/App.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './Components/User/Navbar';
import Footer from './Components/User/Footer';
import { Toaster, ToastBar } from 'react-hot-toast';
import UserRoutes from './Routes/userRoutes';
import { loadUser } from './Actions/userActions';
import Call from './Components/CustomerSupport/Call.jsx';
import "swiper/css";
import "swiper/css/navigation";

const App = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);

  const fetchUserData = () => {
    if (!userData) {
      dispatch(loadUser());
    }
  }

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style:{
            width:'400px',
            height:'100%',
            padding:'10px 20px',
            margin:'3vh',
          },
          success: {
            style: {
              background: '#41B619',
              color:'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: '#41B619',
            }
          },
          error: {
            style: {
              background: 'red',
              color:'white',
            },
            iconTheme: {
              primary: 'white',
              secondary: 'red',
            }
          },
        }}
      >
        {(t) => (
          <ToastBar
            toast={t}
            style={{
              ...t.style,
              animation: t.visible
                ? 'custom-enter 1s ease'
                : 'custom-exit 5s ease forwards',
            }}
          />
        )}
      </Toaster>
      <Call />
      <Navbar />
      <div className='pt-10'>
        <UserRoutes />
      </div>
      <Footer />
    </>
  );
};

export default App;
