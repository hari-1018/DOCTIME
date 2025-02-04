import Navbar from "../Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import userEndPoints from "../../config/users/userApi";

const fetchUserAppointments = async(id) =>{
  const response = await axiosInstance.get(
    userEndPoints.USER.VIEW_USER_APPOINTMENT.replace(":id", id)
  )
  return response.data.appointments;
}

const Appointments = () => {
  const { id } = useParams();
  const { data: appointments=[], isLoading, isError, error } = useQuery({
    queryKey: ["appointments", id],
    queryFn:()=> fetchUserAppointments(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 min-h-screen flex items-center justify-center">
        Loading appointments...
      </div>
    );
  }


  if (isError) {
    return (
      <div className="text-center text-red-500 min-h-screen flex items-center justify-center">
        Failed to fetch appointments: {error.message}
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <section className="bg-blue-regBg min-h-screen py-24">
        <div className="max-w-6xl mx-auto px-5 py-4">
          <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
            My Appointments
          </h2>
          <div className="space-y-4">
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 border border-gray-200"
                >
                  {/* Doctor Image */}
                  <img
                    src={appointment.doctorId.image}
                    alt={appointment.doctorId.name}
                    className="w-28 h-32 rounded-md object-cover"
                  />
                  {/* Appointment Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-blue-default">
                      {appointment.doctorId.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appointment.doctorId.specialization}
                    </p>
                    <p className="text-sm text-red-500 mt-3">
                      <span className="font-semibold">Date:</span>{" "}
                      {appointment.slotDate}
                    </p>
                    <p className="text-sm text-red-500 mt-1">
                      <span className="font-semibold">Time:</span>{" "}
                      {appointment.slotTime}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      <span className="font-semibold">Consultation Fees:</span>{" "}
                      {appointment.fees} /-
                    </p>
                  </div>
                  {/* Action Buttons or Status */}
                  {appointment.cancelled === true ? (
                    <div className="flex">
                      <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg md:mt-11">
                        Appointment Cancelled
                      </button>
                    </div>
                  ) : appointment.isCompleted === true ? (
                    <div className="flex">
                      <button className="border border-green-500 text-green-500 px-4 py-2 rounded-lg md:mt-11">
                        Appointment Completed
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <button className="py-2 px-4 rounded-lg bg-green-500 text-white font-semibold border">
                        Pay Online
                      </button>
                      <button className="py-2 px-4 rounded-lg bg-blue-default text-white font-semibold border">
                        Reschedule
                      </button>
                      <button className="py-2 px-4 rounded-lg bg-red-400 text-white font-semibold border">
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">
                No appointments found.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Appointments;