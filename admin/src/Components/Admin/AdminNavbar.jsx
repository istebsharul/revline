import React from 'react';
import { FaBars, FaSearch, FaPhone, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Actions/adminActions';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const AdminNavBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=> state.auth?.admin);
  const adminName = useSelector((state)=> state.auth?.admin?.name);
  const dispatch = useDispatch();

  const handleLogout = () => {
    const confirm = window.confirm('Are you sure you want to logout');
    if(!confirm){
      return;
    }
    // Add your logout logic here
    if(!isLoggedIn){
      toast.error('Admin Already logged out!');
      return;
    };
    
    navigate('/login');
    dispatch(logout());
  };

  return (
    <div className="w-full h-14  bg-gray-800 text-white p-4 flex justify-between items-center sticky top-0 z-10">
      {isLoggedIn &&
        <div className="flex items-center space-x-4">
        <FaBars className="text-xl cursor-pointer" onClick={toggleSidebar} />
      </div>
      }
      <div className="w-full flex justify-end items-center space-x-6">
        <p className='px-3'>{adminName}</p>
        <div className="relative">
          <FaSignOutAlt className="text-xl cursor-pointer" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
