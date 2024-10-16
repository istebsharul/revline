import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import AdminNavBar from './AdminNavbar';
import { MdShoppingCartCheckout } from "react-icons/md";
import { BiSolidDashboard } from "react-icons/bi";
import { FaUsers, FaTachometerAlt, FaChartLine, FaPhone, FaBullhorn, FaFileInvoiceDollar, FaProductHunt, FaFirstOrder } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoggedIn = useSelector((state)=>state.auth.admin);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="w-full h-screen dashboard-layout flex flex-col">
      {/* Top Navigation Bar */}
      <AdminNavBar toggleSidebar={toggleSidebar} />
      
      {/* Main Content Layout */}
      { isLoggedIn
        &&
        <div className="flex flex-1">
        <aside className={`h-full sidebar bg-gray-800 text-gray-300 p-4 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
          <nav>
            <ul className="space-y-3">
              <li className={`border-b border-gray-400 pb-4 ${!isSidebarOpen && 'border-none'}`}>
                <Link to="/" className="flex items-center space-x-2">
                  <BiSolidDashboard size={isSidebarOpen ? 20 : 24} />
                  {isSidebarOpen && <span>Dashboard</span>}
                </Link>
              </li>
              <li>
                <Link to="/sales-management" className="flex items-center space-x-2">
                  <MdShoppingCartCheckout size={isSidebarOpen ? 20 : 24} />
                  {isSidebarOpen && <span>Sales Management</span>}
                </Link>
              </li>
              <li>
                <Link to="/customer-management" className="flex items-center space-x-2">
                  <FaUsers size={isSidebarOpen ? 20 : 24} />
                  {isSidebarOpen && <span>Customer Management</span>}
                </Link>
              </li>
              <li>
                <Link to="/product-management" className="flex items-center space-x-2">
                  <FaProductHunt size={isSidebarOpen ? 20 : 24} />
                  {isSidebarOpen && <span>Product Management</span>}
                </Link>
              </li>
              <li>
                <Link to="/communication-center" className="flex items-center space-x-2">
                  <FaPhone size={isSidebarOpen ? 20 : 24} />
                  {isSidebarOpen && <span>Communication Center</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="main-content bg-gray-100 flex-1">
          <Outlet />
        </main>
      </div>
      }
    </div>
  );
};

export default DashboardLayout;
