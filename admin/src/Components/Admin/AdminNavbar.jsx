import React from 'react';
import { FaBars, FaSearch, FaPhone, FaCog, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminNavBar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <FaBars className="text-xl cursor-pointer" onClick={toggleSidebar} />
        <FaSearch className="text-xl cursor-pointer" />
      </div>
      <div className="flex items-center space-x-6">
        <FaPhone className="text-xl cursor-pointer" onClick={() => navigate('/admin/communication-center')} />
        <FaCog className="text-xl cursor-pointer" onClick={() => navigate('/admin/settings')} />
        <FaUser className="text-xl cursor-pointer" />
        <div className="relative">
          <FaSignOutAlt className="text-xl cursor-pointer" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
