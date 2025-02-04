import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import doctorEndPoints from "../../config/doctors/doctorApi";

const DoctorAppointments = () => {
  const { id } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUserAppointments = async () => {
      try {
        const response = await axiosInstance.get(
          doctorEndPoints.DOCTOR.VIEW_DOCTOR_APPOINTMENT.replace(":id", id)
        );
        console.log("bookings", response.data.data);

        // Sort appointments by slotDate in descending order (latest first)
        const sortedAppointments = response.data.data.sort((a, b) => {
          return new Date(b.slotTime) - new Date(a.slotTime);
          // console.log("bbbb",b.slotDate)
        });

        setAppointments(sortedAppointments);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserAppointments();
  }, [id]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await axiosInstance.patch(
        doctorEndPoints.DOCTOR.UPDATE_APPOINTMENT_STATUS.replace(":id", appointmentId),
        { isCompleted: newStatus === "Completed" } // Convert to boolean
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, isCompleted: newStatus === "Completed" }
            : appointment
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  // Fix: Filtering appointments for search functionality
  const currentAppointments = appointments.filter((appointment) =>
    appointment.patientId?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
                <th className="py-2 px-4 border w-30">Date & Time</th>
                <th className="py-2 px-4 border w-30">Status</th>
                <th className="py-2 px-4 border w-30">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {currentAppointments.length > 0 ? (
                currentAppointments.map((appointment) => (
                  <tr key={appointment._id} className="hover:bg-blue-200 text-center">
                    <td className="py-2 px-2 border text-gray-600">{appointment._id.slice(0, 12)}</td>
                    <td className="py-2 px-2 border text-gray-600">{appointment.patientId?.name || "N/A"}</td>
                    <td className="py-2 px-2 border text-gray-600">
                      {appointment.slotDate
                        ? new Date(appointment.slotDate).toLocaleDateString()
                        : "N/A"}{" "}
                      {appointment.slotTime || "N/A"}
                    </td>
                    <td className="py-2 px-2 border text-gray-600">
                      <select
                        className="border border-gray-400 rounded px-2 py-1 text-gray-800 focus:outline-none"
                        value={appointment.isCompleted ? "Completed" : "Pending"}
                        onChange={(e) =>
                          handleStatusChange(appointment._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td className="py-2 px-2 border text-gray-600">
                      {appointment.payment ? "Paid" : "Pending"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    No Appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default DoctorAppointments;