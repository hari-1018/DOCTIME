import { useEffect, useState } from "react";
import axiosInstance from "../../config/axiosInstance";
import adminEndPoints from "../../config/admin/endPoints";

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const APPOINTMENTS_PER_PAGE = 15;

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const response = await axiosInstance.get(adminEndPoints.ADMIN.GET_ALL_APPOINTMENTS);
      console.log("fetchallappointments", response.data.result.appointments);

      // Sort appointments by slotDate (most recent first)
      const sortedAppointments = response.data.result.appointments.sort((a, b) => {
        const dateA = new Date(a.slotDate);
        const dateB = new Date(b.slotDate);
        return dateB - dateA; // Descending order (recent first)
      });

      setAppointments(sortedAppointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter((appointment) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      (appointment.patientId?.name?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (appointment.doctorId?.name?.toLowerCase().includes(lowerCaseSearchTerm) || false) ||
      (appointment.status?.toLowerCase().includes(lowerCaseSearchTerm) || false)
    );
  });

  // Calculate paginated data
  const indexOfLastAppointment = currentPage * APPOINTMENTS_PER_PAGE;
  const indexOfFirstAppointment = indexOfLastAppointment - APPOINTMENTS_PER_PAGE;
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment
  );

  // Handle page change
  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredAppointments.length / APPOINTMENTS_PER_PAGE))
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="p-2">
      <h1 className="text-3xl font-bold text-center text-blue-default mt-1 mb-4">
        All Appointments
      </h1>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row sm:justify-center mb-4">
        <input
          type="text"
          placeholder="Search Appointments..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar text-gray-800 w-full sm:w-64 mb-4 sm:mb-0 border-2 border-blue-400 rounded-full px-3 py-1 focus:outline-blue-400"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-default text-white">
              <th className="py-2 px-4 border w-30">Appointment ID</th>
              <th className="py-2 px-4 border w-30">Patient Name</th>
              <th className="py-2 px-4 border w-30">Doctor Name</th>
              <th className="py-2 px-4 border w-30">Specialization</th>
              <th className="py-2 px-4 border w-30">Date & Time</th>
              <th className="py-2 px-4 border w-30">Status</th>
              <th className="py-2 px-4 border w-30">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.length > 0 ? (
              currentAppointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-blue-200 text-center">
                  <td className="py-2 px-2 border text-gray-600">{appointment._id.slice(0,12)}</td>
                  <td className="py-2 px-2 border text-gray-600">{appointment.patientId?.name || "N/A"}</td>
                  <td className="py-2 px-2 border text-gray-600">{appointment.doctorId?.name || "N/A"}</td>
                  <td className="py-2 px-2 border text-gray-600">{appointment.doctorId?.specialization || "N/A"}</td>
                  <td className="py-2 px-2 border text-gray-600">
                    {appointment.slotDate ? new Date(appointment.slotDate).toLocaleDateString() : "N/A"} {appointment.slotTime || "N/A"}
                  </td>
                  <td className="py-2 px-2 border text-gray-600">{appointment.isCompleted ? "Completed" : "Pending"}</td>
                  <td className="py-2 px-2 border text-gray-600">{appointment.payment ? "Paid" : "Pending"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No Appointments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-default text-white hover:bg-blue-600"
          }`}
        >
          Previous
        </button>
        <span className="text-gray-600 mt-2">
          Page {currentPage} of{" "}
          {Math.ceil(filteredAppointments.length / APPOINTMENTS_PER_PAGE)}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === Math.ceil(filteredAppointments.length / APPOINTMENTS_PER_PAGE)}
          className={`px-4 py-2 rounded ${
            currentPage === Math.ceil(filteredAppointments.length / APPOINTMENTS_PER_PAGE)
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AllAppointments;