import NavLogo from "../../assets/Doctime_Logo.png";
import { RxDashboard } from "react-icons/rx";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    setIsLoggedIn(!!loggedInUser);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("secretToken");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
<nav className="fixed top-0 left-0 w-full h-[90px] z-50 bg-white text-white p-2 flex justify-between items-center">
  {/* Logo */}
  <div className="flex items-center gap-2.5">
    <img
      className="w-44 h-20 md:w-56 md:h-[90px]"
      src={NavLogo}
      alt="Doctime Logo"
    />
  </div>

  {/* Desktop Menu */}
  <ul className="hidden md:flex items-center gap-10 font-bold">
    <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default">
      <a href={isLoggedIn ? "#home1" : "#home"}>HOME</a>
    </li>
    <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default">
      <Link to={isLoggedIn ? "/doctors" : "/register"}>DOCTORS</Link>
    </li>
    <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default">
      <Link to={isLoggedIn ? "/appointments" : "/register"}>APPOINTMENTS</Link>
    </li>
    <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default">
      <a href={isLoggedIn ? "#about" : "#join"}>ABOUT US</a>
    </li>
    <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default">
      <a href="#contact">CONTACT US</a>
    </li>
  </ul>

  {/* Hamburger Icon and Mobile Logout */}
  <div className="flex items-center md:hidden">
    {isLoggedIn && (
      <button
        onClick={handleSignOut}
        className="text-blue-default text-2xl mr-4"
      >
        <MdLogout />
      </button>
    )}
    <button
      className="text-blue-default text-2xl z-50"
      onClick={toggleMenu}
    >
      {isMenuOpen ? <FaTimes /> : <FaBars />}
    </button>
  </div>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <ul className="absolute top-[90px] left-0 w-full bg-white text-center font-bold flex flex-col items-center gap-5 py-5 md:hidden">
      <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default">
        <a href={isLoggedIn ? "#home1" : "#home"}>HOME</a>
      </li>
      <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default">
        <Link to={isLoggedIn ? "/doctors" : "/register"}>DOCTORS</Link>
      </li>
      <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default">
        <Link to={isLoggedIn ? "/appointments" : "/register"}>APPOINTMENTS</Link>
      </li>
      <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default">
        <a href={isLoggedIn ? "#about" : "#join"}>ABOUT US</a>
      </li>
      <li className="cursor-pointer text-base text-blue-default hover:border-b-2 border-blue-default">
        <a href="#contact">CONTACT US</a>
      </li>
    </ul>
  )}

  {/* Dashboard Button */}
  <button className="hidden md:block w-10 h-10 text-blue-default text-2xl -mr-64">
    <RxDashboard />
  </button>

  {/* SignUp/SignOut Button */}
  {isLoggedIn ? (
    <button
      onClick={handleSignOut}
      className="hidden md:block w-[100px] h-10 bg-blue-default rounded-[20px] font-bold"
    >
      Sign Out
    </button>
  ) : (
    <button
      onClick={() => navigate("/register")}
      className="hidden md:block w-[100px] h-10 bg-blue-default rounded-[20px] font-bold"
    >
      Sign Up
    </button>
  )}
</nav>

    </>
  );
};

export default Navbar;
