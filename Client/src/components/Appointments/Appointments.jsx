import Navbar from "../Navbar/Navbar";
import { useQuery } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import userEndPoints from "../../config/users/userApi";
import { toast } from "react-toastify";

const fetchUserAppointments = async (id) => {
  const response = await axiosInstance.get(
    userEndPoints.USER.VIEW_USER_APPOINTMENT.replace(":id", id)
  );
  return response.data.appointments;
};

const cancelAppointment = async (appointmentId) => {
  const response = await axiosInstance.patch(
    userEndPoints.USER.CANCEL_APPOINTMENT.replace(":appointmentId", appointmentId)
  );
  return response.data;
};

const Appointments = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ["appointments", id],
    queryFn: () => fetchUserAppointments(id),
    enabled: !!id,
  });

  const { mutate: cancelMutation, isLoading: isCancelling } = useMutation({
    mutationFn: cancelAppointment,
    onSuccess: () => {
      toast.success("Appointment cancelled successfully!");
      queryClient.invalidateQueries(["appointments", id]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to cancel appointment.");
    },
  });

  const handleCancel = (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      cancelMutation(appointmentId);
    }
  };

  const handleFeedback = (doctorId) => {
    navigate(`/feedback/${doctorId}`);
  };

  const handlePayment = (appointmentId) => {
    navigate(`/appointment-details/${appointmentId}`);
  };

  if (isLoading) {
    return (
      <div className="text-center text-gray-500 min-h-screen flex items-center justify-center">
        Loading appointments...
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
                  <img
                    src={appointment.doctorId.image}
                    alt={appointment.doctorId.name}
                    className="w-28 h-32 rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-blue-default">
                      {appointment.doctorId.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {appointment.doctorId.specialization}
                    </p>
                    <p className="text-sm text-red-500 mt-3">
                      <span className="font-semibold">Date:</span> {appointment.slotDate}
                    </p>
                    <p className="text-sm text-red-500 mt-1">
                      <span className="font-semibold">Time:</span> {appointment.slotTime}
                    </p>
                    <p className="text-sm text-blue-600 mt-1">
                      <span className="font-semibold">Consultation Fees:</span> {appointment.fees} /-
                    </p>
                  </div>
                  {appointment.cancelled ? (
                    <button className="border border-red-500 text-red-500 px-4 py-2 rounded-lg md:mt-10">
                      Appointment Cancelled
                    </button>
                  ) : appointment.isCompleted ? (
                    <div className="flex flex-col space-y-3">
                      <button className="border border-green-500 text-green-500 px-4 py-2 rounded-lg md:mt-5">
                        Appointment Completed ✅
                      </button>
                      <button onClick={() => handleFeedback(appointment.doctorId._id)}
                        className="border border-green-500 text-green-500 px-4 py-2 rounded-lg md:mt-2">
                        Feedback ✍️
                      </button>
                    </div>
                  ) : appointment.payment ? (
                    <button className="border border-green-500 text-green-500 px-4 py-2 rounded-lg md:mt-4">
                      Payment Completed ✅
                    </button>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <button
                        onClick={() => handlePayment(appointment._id)}
                        className="py-1 px-4 rounded-lg bg-green-500 text-white font-semibold border">
                        Pay Now
                      </button>
                      <button
                        onClick={() => handleCancel(appointment._id)}
                        disabled={isCancelling}
                        className="py-1 px-4 rounded-lg bg-red-400 text-white font-semibold border">
                        {isCancelling ? "Cancelling..." : "Cancel"}
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
