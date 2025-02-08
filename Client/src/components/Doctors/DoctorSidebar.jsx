import { FaUsers } from "react-icons/fa";
import { MdSpaceDashboard, MdCalendarToday } from "react-icons/md";
import { AiOutlineHistory } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorSidebar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [doctorId, setDoctorId] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setIsLoggedIn(true);
      setDoctorId(user.id); 
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };


  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="fixed h-full bg-blue-default text-white w-[275px] flex flex-col p-6">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold mb-4 flex items-center justify-center">
            <span className="text-3xl font-extrabold mr-2">+</span> DOCTIME
          </h1>
          <hr className="border-t-2 border-white opacity-30" />
        </div>

        {/* Navigation Links */}
        <ul className="space-y-6">
          <li>
            <Link
              to="/doctor/dashboard"
              className="flex items-center space-x-3 text-white font-bold hover:bg-blue-500 p-3 rounded-md"
            >
              <MdSpaceDashboard className="text-2xl" />
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link
              to="/doctor/my-patients"
              className="flex items-center space-x-3 text-white font-bold hover:bg-blue-500 p-3 rounded-md"
            >
              <FaUsers className="text-2xl" />
              <span>My Patients</span>
            </Link>
          </li>
          <li>
            <Link
              to={isLoggedIn ? `/doctor/${doctorId}/my-appointments` : "#"}
              className={`flex items-center space-x-3 font-bold hover:bg-blue-500 p-3 rounded-md ${
                doctorId ? "text-white" : "text-gray-400 cursor-not-allowed"
              }`}
            >
              <MdCalendarToday className="text-2xl" />
              <span>My Appointments</span>
            </Link>
          </li>
          <li>
            <Link
              to="/doctor/payment-history"
              className="flex items-center space-x-3 text-white font-bold hover:bg-blue-500 p-3 rounded-md"
            >
              <AiOutlineHistory className="text-2xl" />
              <span>Payment History</span>
            </Link>
          </li>
          <li>
            <Link
              to="/doctor/reviews"
              className="flex items-center space-x-3 text-white font-bold hover:bg-blue-500 p-3 rounded-md"
            >
              <FaRegPenToSquare className="text-2xl" />
              <span>Reviews</span>
            </Link>
          </li>
        </ul>

        {/* Footer Section */}
        <div className="mt-auto">
          <button onClick={handleSignOut} className="bg-white ml-12 rounded-full px-5 py-2 text-blue-default font-bold">
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-6 flex-1 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
  
};


export default DoctorSidebar;
