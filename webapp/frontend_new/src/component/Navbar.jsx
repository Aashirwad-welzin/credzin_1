import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../app/slices/authSlice";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await axios.get("/api/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status === 200) {
          dispatch(setUser(response.data));
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch,user, location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <nav className="bg-blue-600 p-1 shadow-md w-full fixed top-0 z-50">
      <div className="flex justify-between items-center text-white font-medium max-w-7xl mx-auto px-4 relative">
        {/* Logo - responsive size */}
        <div className="text-lg sm:text-xl md:text-2xl font-bold tracking-wide">
          <button 
            onClick={() => navigate("/home")} 
            className="hover:text-gray-400 transition-colors duration-200"
          >
            CREDZIN
          </button>
        </div>

        {/* Mobile menu button - better touch target */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden text-white focus:outline-none p-2 hover:bg-blue-700 rounded-lg transition-colors duration-200"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        {!isAuthPage && user && (
          <ul className="hidden md:flex items-center space-x-2 lg:space-x-4">
            <li>
              <button
                onClick={() => navigate("/home")}
                className="px-3 py-2 hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                Home
              </button>
            </li>

            <li className="relative" ref={profileRef}>
              <button
                onClick={toggleProfile}
                className="px-3 py-2 hover:bg-blue-700 rounded-lg transition-colors duration-200 flex items-center"
              >
                Profile
              </button>
              
              {/* Profile Dropdown - Responsive width */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-white text-black rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b">
                    <p className="font-semibold truncate">
                      {user?.name?.split(" ")[0] || "User"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      {user?.email || "Email"}
                    </p>
                  </div>
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => {
                          navigate("/manage-cards");
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        Manage Cards
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      >
                        View Profile
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          handleLogout();
                          setProfileOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors duration-200 text-red-600"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        )}
      </div>

      {/* Mobile Navigation - Improved styling */}
      {isOpen && !isAuthPage && user && (
        <div className="md:hidden fixed top-[60px] left-0 right-0 bg-blue-600 border-t border-blue-500">
          <ul className="flex flex-col p-4 space-y-2">
            <li>
              <button
                onClick={() => {
                  navigate("/home");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-700 text-white transition-colors duration-200"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/manage-cards");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-700 text-white transition-colors duration-200"
              >
                Manage Cards
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  navigate("/profile");
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-blue-700 text-white transition-colors duration-200"
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
