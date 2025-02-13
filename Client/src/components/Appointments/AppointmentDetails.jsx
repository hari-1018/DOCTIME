import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../config/axiosInstance";
import userEndPoints from "../../config/users/userApi";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

//Fetch appointment details
const fetchAppointmentDetails = async ({queryKey}) => {
  const [, appointmentId] = queryKey;
  const response = await axiosInstance.get(
    userEndPoints.USER.VIEW_APPOINTMENT_DETAILS.replace(":appointmentId", appointmentId)
  );
  return response.data.data;
}
const AppointmentDetails = () => {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  const [loading, setLoading] = useState(false);

  const {data: appointmentDetails, isLoading, error} = useQuery({
    queryKey: ['appointmentDetails', appointmentId],
    queryFn: fetchAppointmentDetails,
    enabled: !!appointmentId,
  })

  // Razorpay Payment Handler
  const handlePayment = async () => {
    if (!appointmentDetails) return;
    setLoading(true);
    
    try {
      const response = await axiosInstance.post(userEndPoints.USER.MAKE_PAYMENT, {
        amount: appointmentDetails.fees, 
        currency: "INR",
        appointmentId: appointmentId
        
      });
      const { id: orderId, amount, currency } = response.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: amount, 
        currency: currency,
        name: "DOCTIME",
        description: "Appointment Payment",
        order_id: orderId,
        handler: async function (response) {
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

          try {
            const verifyResponse = await axiosInstance.post(userEndPoints.USER.VERIFY_PAYMENT, {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
              paymentMethod: response.method
            });

            if (verifyResponse.data.status === "success") {
              toast.success("Payment successful!",{
                onClose: () => navigate(`/appointments/${appointmentDetails?.patientId?._id}`),
              });
            } else {
              toast.error("Payment verification failed.");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
            alert("Failed to verify payment.");
          }
        },
        prefill: {
          name: appointmentDetails?.patientId?.name || "Customer Name",
          email: appointmentDetails?.patientId?.email || "customer@example.com",
          contact: appointmentDetails?.patientId?.mobile || "9999999999",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () =>{
    navigate(`/doctors/${appointmentDetails?.doctorId?._id}`)
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading details: {error.message}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-regBg px-4 py-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">
        {/* Details of Booking */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-32 h-32 md:w-40 md:h-40">
            <img
              src={appointmentDetails?.doctorId?.image}
              alt="Doctor"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-lg md:text-2xl font-bold text-blue-default">{appointmentDetails?.doctorId?.name}</h2>
            <p className="text-gray-600">{appointmentDetails?.doctorId?.specialization}</p>
            <p className="text-sm md:text-base font-semibold text-blue-default mt-2">
              Date:{" "}
              <span className="font-bold">
                {appointmentDetails?.slotDate
                  ? format(new Date(appointmentDetails.slotDate), "dd/MM/yyyy")
                  : "Loading..."}
              </span>
            </p>
            <p className="text-sm md:text-base font-semibold text-blue-default">
              Time: <span className="font-bold">{appointmentDetails?.slotTime}</span>
            </p>
            <p className="text-lg font-bold text-red-500 mt-2">
              Consulting Fee: <span>{appointmentDetails?.fees.toFixed(2)}/-</span>
            </p>
          </div>
        </div>
        {/* Details of Booking */}

        {/* Payment Details */}
        <div className="mt-6">
          <h3 className="text-lg md:text-xl font-bold text-blue-default text-center">
            Payment Details
          </h3>
          <div className="bg-blue-100 p-4 rounded-lg mt-3">
            <div className="flex justify-between text-gray-700">
              <span>Consultation Fee</span>
              <span>₹ {appointmentDetails?.fees.toFixed(2)}/-</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-1">
              <span>Booking Charge</span>
              <span>0.00/-</span>
            </div>
            <div className="flex justify-between text-gray-700 mt-1">
              <span>Hospital Charge</span>
              <span>0.00/-</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total Amount</span>
              <span>₹ {appointmentDetails?.fees.toFixed(2)}/-</span>
            </div>
          </div>
        </div>
        {/* Payment Details*/}

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={handlePayment}
            disabled={loading}
            className="bg-blue-default text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
          <button 
            onClick={handleCancel} 
            className="bg-red-500 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-600 transition">
            Pay Later
          </button>
        </div>
        {/* Buttons */}
      </div>
    </div>
  );
};

export default AppointmentDetails;
