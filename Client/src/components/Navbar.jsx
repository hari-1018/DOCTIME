import NavLogo from "../assets/Doctime_Logo.png";
import { RxDashboard } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full h-[90px] z-50 bg-white text-white p-2 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <img className="w-56 h-[90px]" src={NavLogo} alt="Doctime Logo" />
        </div>

        {/* Menu */}
        <ul className="items-center gap-10 font-bold hidden md:flex">
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

        {/* Dashboard Button */}
        <button className="w-10 h-10 text-blue-default text-2xl -mr-64">
          <RxDashboard />
        </button>

        {/* SignUp/SignOut Button */}
        {isLoggedIn ? (
          <button
            onClick={handleSignOut}
            className="w-[100px] h-10 bg-blue-default rounded-[20px] font-bold"
          >
            Sign Out
          </button>
        ) : (
          <button
            onClick={() => navigate("/register")}
            className="w-[100px] h-10 bg-blue-default rounded-[20px] font-bold"
          >
            Sign Up
          </button>
        )}
      </nav>
    </>
  );
};

export default Navbar;
