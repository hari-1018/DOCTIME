import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from "chart.js";
import { Bar, Pie, Line } from "react-chartjs-2";
import { MdGroups } from "react-icons/md";
import { FaCalendarDays, FaUserDoctor } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import adminEndPoints from "../../config/admin/endPoints";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, Legend, LineElement, PointElement);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const fetchTotalUsers = async () => {
    try {
      const response = await axiosInstance.get(adminEndPoints.ADMIN.GET_TOTAL_USERS);
      console.log('dash', response.data.result.totalUsers);
      setTotalUsers(response.data.result.totalUsers);
    } catch (error) {
      console.error('Error fetching total users:', error);
    }
  };

  const fetchTotalDoctors = async () => {
    try {
      const response = await axiosInstance.get(adminEndPoints.ADMIN.GET_TOTAL_DOCTORS);
      console.log('dashdoc', response.data.result.totalDoctors);
      setTotalDoctors(response.data.result.totalDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchTotalAppointments = async () => {
    try {
      const response = await axiosInstance.get(adminEndPoints.ADMIN.GET_TOTAL_APPOINTMENTS);
      console.log('dashappo', response.data.result.totalAppointments);
      setTotalAppointments(response.data.result.totalAppointments);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalDoctors();
    fetchTotalAppointments();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("secretToken");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };


  const barChartData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Series 3",
        data: [20, 60, 80, 40, 60, 80, 100, 80, 60, 100, 120, 60],
        backgroundColor: "#2BA3ED",
      },
    ],
  };

  const pieChartData = {
    labels: [
      "Cardiology",
      "Neurology",
      "Dermatology",
      "Pediatrics",
      "General Medicine",
      "Orthopedics",
    ],
    datasets: [
      {
        label: "Specializations",
        data: [15, 13, 9, 19, 22, 8],
        backgroundColor: [
          "#3b82f6",
          "#6366f1",
          "#8b5cf6",
          "#ec4899",
          "#22c55e",
          "#facc15",
        ],
      },
    ],
  };

  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Appointments",
        data: [10, 20, 40, 30, 50, 60, 80, 90, 100, 70, 90, 100,],
        borderColor: "#3b82f6",
        fill: false,
      },
    ],
  };

  return (
    <div className="p-2">
      <header className="flex justify-between items-center mb-4">
        <div className="bg-white px-6 py-2 rounded-full shadow-md border border-gray-100 ml-[450px]">
          <h2 className="text-xl font-bold text-blue-default">Welcome Mr.Admin</h2>
        </div>
        <button onClick={handleSignOut} className="bg-blue-default rounded-full px-4 py-2 text-white font-bold">
          Sign Out
        </button>
      </header>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { title: "Total Patients", value: totalUsers, icon: <MdGroups /> },
          { title: "Total Doctors", value: totalDoctors, icon: <FaUserDoctor /> },
          { title: "Appointments", value: totalAppointments, icon: <FaCalendarDays/> },
          { title: "Pending", value: 25 },
          { title: "Total Revenue", value: 10000 },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-blue-default text-white rounded-lg shadow-lg p-6 flex items-center space-x-4"
          >
            <div className="text-4xl">{item.icon}</div>
            <div>
              <h3 className="text-xl font-bold">{item.title}</h3>
              <p className="text-xl">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-blue-600 mb-4">
            Month Wise Patients
          </h3>
          <Bar data={barChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-blue-600 mb-4">
            Specialization Stats
          </h3>
          <Pie data={pieChartData} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-blue-600 mb-4">Appointments</h3>
          <Line data={lineChartData} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold text-blue-600 mb-4">
          Recent Appointments
        </h3>
        <table className="w-full table-auto border-collapse border border-gray-200">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="border border-gray-300 p-2">Patient Name</th>
              <th className="border border-gray-300 p-2">Booking Id</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Specialization</th>
              <th className="border border-gray-300 p-2">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Kane Richardson",
                id: "000-111-222-33",
                date: "10-01-2025",
                specialization: "Cardiology",
                status: "Completed",
              },
              {
                name: "Perera Diaz",
                id: "000-123-456-78",
                date: "10-01-2025",
                specialization: "Cardiology",
                status: "Completed",
              },
              {
                name: "Meg Lanning",
                id: "000-987-654-32",
                date: "09-01-2025",
                specialization: "Cardiology",
                status: "Completed",
              },
            ].map((appointment, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 p-2">
                  {appointment.name}
                </td>
                <td className="border border-gray-300 p-2">
                  {appointment.id}
                </td>
                <td className="border border-gray-300 p-2">
                  {appointment.date}
                </td>
                <td className="border border-gray-300 p-2">
                  {appointment.specialization}
                </td>
                <td className="border border-gray-300 p-2">
                  {appointment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
