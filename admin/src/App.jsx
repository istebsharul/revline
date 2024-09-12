// src/App.jsx
import React,{useEffect} from 'react';
import { Toaster } from 'react-hot-toast';
import store from './Store/store.js';
import AdminRoutes from './Routes/adminRoutes.jsx';
import { loadAdmin } from './Actions/adminActions.js';

const App = () => {

  useEffect(() => {
    store.dispatch(loadAdmin());
  })

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <AdminRoutes/>
    </>
  );
};

export default App;
