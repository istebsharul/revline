import React from 'react';
import { FaBars, FaSearch, FaPhone, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../Actions/userActions';
import toast from 'react-hot-toast';

const AdminNavBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state)=> state.auth?.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    // Add your logout logic here
    if(!isLoggedIn){
      toast.error('User Already logged out!');
      return;
    };
    navigate('/login');
    dispatch(logout());
  };

  return (
    <div className="w-full bg-gray-800 text-white p-4 flex justify-between items-center">
      {isLoggedIn &&
        <div className="flex items-center space-x-4">
        <FaBars className="text-xl cursor-pointer" onClick={toggleSidebar} />
        <FaSearch className="text-xl cursor-pointer" />
      </div>
      }
      <div className="w-full flex justify-end items-center space-x-6">
        <FaUser className="text-xl cursor-pointer" />
        <div className="relative">
          <FaSignOutAlt className="text-xl cursor-pointer" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
