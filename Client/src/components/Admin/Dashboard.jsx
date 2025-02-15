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
import { FaCalendarDays, FaClock, FaUserDoctor } from "react-icons/fa6";
import { GiCash } from "react-icons/gi";
import { useState, useEffect } from "react";
import axiosInstance from "../../config/axiosInstance";
import adminEndPoints from "../../config/admin/endPoints";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, ArcElement, Legend, LineElement, PointElement);

const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pending, setPending] = useState();
  const [specializationCounts, setSpecializationCounts] = useState([]);

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
      console.log('dashappo', response.data.result);
      setTotalAppointments(response.data.result);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchTotalRevenue = async () => {
    try {
      const response = await axiosInstance.get(adminEndPoints.ADMIN.GET_TOTAL_REVENUE);
      console.log('dashrev', response.data.data.totalRevenue);
      setTotalRevenue(response.data.data.totalRevenue);
    } catch (error) {
      console.error('Error fetching revenue:', error);
    }
  }

  const fetchPendingAppointments = async () => {
    try {
      const response = await axiosInstance.get(adminEndPoints.ADMIN.GET_PENDING_APPOINTMENTS);
      console.log('pending', response.data.data);
      setPending(response.data.data);
    } catch (error) {
      console.error('Error fetching pending appointments:', error);
    }
  }

  const fetchSpecializationCount = async () => {
    try{
    const response = await axiosInstance.get(adminEndPoints.ADMIN.GET_COUNT_SPECIALIZATION);
    console.log("dsh specialization", response.data.data.doctorCount);
    setSpecializationCounts(response.data.data.doctorCount);
    } catch (error) {
      console.error('Error fetching doctors:', error);
  }
};

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalDoctors();
    fetchTotalAppointments();
    fetchTotalRevenue();
    fetchPendingAppointments();
    fetchSpecializationCount();
  }, []);


  const barChartData = {
    labels: ["Total Users", "Total Doctors", "Appointments", "Pending"],
    datasets: [
      {
        label: "Counts",
        data: [totalUsers, totalDoctors, totalAppointments, pending],
        backgroundColor: ["#2BA3ED", "#3b82f6", "#6366f1", "#facc15"],
      },
    ],
  };

  const pieChartData = {
    labels: specializationCounts.map((item)=>item._id),
    datasets: [
      {
        label: "Specializations",
        data: specializationCounts.map((item)=>item.count),
        backgroundColor: [
          "#3b82f6",
          "#6366f1",
          "#8b5cf6",
          "#ec4899",
          "#22c55e",
          "#facc15",
          "#f97316",
          "#10b981",
          "#9333ea",
          "#fffb00",
          "#e11d48",
          "#a3e635",
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
      </header>

      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { title: "Total Patients", value: totalUsers, icon: <MdGroups /> },
          { title: "Total Doctors", value: totalDoctors, icon: <FaUserDoctor /> },
          { title: "Appointments", value: totalAppointments, icon: <FaCalendarDays/> },
          { title: "Pending", value: pending, icon: <FaClock/> },
          { title: "Revenue", value: totalRevenue.toFixed(2), icon: <GiCash /> },
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
            Specialization Wise Doctors
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
