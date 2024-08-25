import React, { useState, useEffect, useRef } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Actions/userActions';

function Navbar() {
    const [navbar, setNavbar] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const currentUser = useSelector((state)=> state.auth.user?.user);
    const [username, setUsername] = useState(""); 

    // Hardcoded username for testing
    // const isLoggedIn = userName !== ''; // Determine login status

    const handleLogout = () => {
        dispatch(logout());
        setUserDropdown(false);
        setIsLoggedIn(false);
    };

    useEffect(()=>{
        const fetchUserProfile = () =>{
            try {
                if(currentUser){
                    setUsername(currentUser.name);
                    setIsLoggedIn(!isLoggedIn);
                }
            } catch (error) {
                setUsername("");
                console.log("Error fetching profile",error.message);
            }
        }

        if(currentUser){
            fetchUserProfile();
        }
    },[currentUser])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setUserDropdown(false);
            }
        };
        window.addEventListener("click", handleClickOutside);
        return () => {
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const toggleUserDropdown = () => {
        if(isLoggedIn){
            setUserDropdown(!userDropdown);
        }
        console.log(userDropdown);
    };

    return (
        <nav className="w-full flex justify-center items-center bg-white fixed top-0 left-0 right-0 z-50">
            <div className="w-full h-14 lg:w-4/6 md:flex md:justify-between md:items-center md:px-4 md:p-0 p-4">
                {/* LOGO */}
                <div className='flex md:flex-col items-center justify-between md:block'>
                    <div className="w-[9rem]">
                        <Link to="/">
                            <img src="https://res.cloudinary.com/drszvaldf/image/upload/v1724180173/revline/kn373iik4j6x2txiqs0p.png" alt="Logo" width={200} height={100} />
                        </Link>
                    </div>
                    {/* HAMBURGER BUTTON FOR MOBILE */}
                    <div className="md:hidden">
                        <button
                            className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border transform transition-transform duration-300"
                            onClick={() => setNavbar(!navbar)}
                        >
                            {navbar ? <FiX size={30} /> : <FiMenu size={30} />}
                        </button>
                    </div>
                </div>
                <div className={`transparent text-black flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'}`}>
                    <ul className="text-black text-sm md:h-fit items-center justify-center md:flex relative">
                        {['/Home', '/About', '/Warranty', '/FAQ', '/Contact'].map((path, index) => (
                            <li key={index} className="hover:text-red-600 pb-3 text-[1rem] py-2 md:px-6 text-center transform transition-transform hover:translate-y-1">
                                <Link to={path.toLowerCase()} onClick={() => setNavbar(false)}>
                                    <div>
                                        {path.slice(1) || 'Home'}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <li className="md:px-8 md:py-0 py-3 relative decoration-none flex" ref={dropdownRef}>
                    <div className="cursor-pointer p-2" onClick={toggleUserDropdown}>
                        {isLoggedIn ? (
                            <button>{username}</button>
                        ) : (
                            <Link className='px-6 py-0.5 border border-red-600 rounded-full text-lg text-red-600' to="/login">LOGIN</Link>
                        )}
                    </div>
                    {isLoggedIn && userDropdown && (
                        <div className="absolute right-0 mt-10 w-48 bg-white shadow-md rounded-lg">
                            <div
                                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                                onClick={handleLogout}
                            >
                                Logout
                            </div>
                            <Link to="/profile" className="block px-4 py-2 text-gray-700 cursor-pointer hover:bg-red-100 hover:rounded-lg">
                                Profile
                            </Link>
                            <Link to="/orders" className='block px-4 py-2 text-gray-700 cursor-pointer hover:bg-red-100 hover:rounded-lg'>
                                Orders
                            </Link>
                        </div>
                    )}
                </li>
            </div>
        </nav>
    );
}

export default Navbar;
