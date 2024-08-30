// src/App.jsx
import React,{useEffect} from 'react';
import { Toaster } from 'react-hot-toast';
import store from './Store/store.js';
import AdminRoutes from './Routes/adminRoutes.jsx';
import AdminNavBar from './Components/Admin/AdminNavbar.jsx';
import DashboardLayout from './Components/Admin/DashboardLayout.jsx';
import { loadUser } from './Actions/userActions.js';

const App = () => {

  useEffect(() => {
    store.dispatch(loadUser());
  })

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AdminRoutes/>
    </>
  );
};

export default App;
