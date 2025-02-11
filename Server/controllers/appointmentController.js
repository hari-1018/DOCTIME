const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { BookAppointment, RescheduleAppointment, UserViewAppointments, ViewAppointmentDetails, DoctorViewAppointments } = require("../services/appointmentService");
const crypto = require("crypto");
const razorpay = require("../utils/razorpay");
const Payment = require("../models/paymentModel");
const Appointment = require("../models/appointmentModel")
const CustomError = require("../utils/customError");

//Book Appointment
const bookAppointment = asyncErrorResolver(async (req, res) => {
    const { patientId, doctorId, slotDate, slotTime } = req.body;
    const result = await BookAppointment({ patientId, doctorId, slotDate, slotTime });
    console.log("book appointment", result);
    res.status(200).json({status: "success", message: "Appointment booked successfully", result });
});

//Reschedule appointment
const rescheduleAppointment = asyncErrorResolver(async (req, res) => {
    const { appointmentId, newSlotDate, newSlotTime } = req.body;

    // Validate required fields
    if (!appointmentId || !newSlotDate || !newSlotTime) {
        throw new CustomError("Please provide all required fields: appointmentId, newSlotDate, newSlotTime", 400);
    }

    // Call the reschedule service
    const result = await RescheduleAppointment({ appointmentId, newSlotDate, newSlotTime });

    // Return the response
    res.status(200).json({
        status: "success",
        message: "Appointment rescheduled successfully",
        result,
    });
});

//User view their appointments 
const userViewAppointments = asyncErrorResolver(async (req, res) => {
    const userId = req.params.id;
    if (!userId) return res.status(400).json({ status: "error", message: "Invalid user ID" });
    console.log("user view appointments", userId);
    const appointments = await UserViewAppointments(userId);
    console.log("view appointments", appointments);
    res.status(200).json({ status: "success", appointments });
});

//View Appointment Details
const getAppointmentDetails = asyncErrorResolver(async (req, res) => {
    const { appointmentId } = req.params;
    if(!appointmentId) return res.status(400).json({ status: "error", message: "Invalid appointment ID" });
    console.log("appointmentDetails", appointmentId)
    const appointmentDetails = await ViewAppointmentDetails(appointmentId);
    console.log("appointment details", appointmentDetails);
    res.status(200).json({ status: "success", message: "Fetched Appointment Details Successfully", data: appointmentDetails });
});

//Doctor view their appointments 
const doctorViewAppointments = asyncErrorResolver(async (req, res) => {
    const doctorId = req.params.id;
    console.log('doctoId', doctorId)
    if (!doctorId) return res.status(400).json({ status: "error", message: "Invalid doctor ID" });
    console.log("user view appointments", doctorId);
    const appointments = await DoctorViewAppointments(doctorId);
    console.log("view appointments", appointments);
    res.status(200).json({ status: "success", message: "Doctor appointments fetched successfully", data: appointments });
});

//Initiate Payment
const createPayment = asyncErrorResolver(async (req, res) => {
    const { amount, currency, appointmentId } = req.body;   
    if (!amount || !appointmentId) {
        return res.status(400).json({ status: "error", message: "Invalid amount or appointmentId" });
    }

    const options = {
        amount: amount * 100,
        currency: currency || "INR",
        receipt: `order_rcptid_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    // Create a pending payment record in the database
    const payment = await Payment.create({
        appointmentId: appointmentId,
        razorpayOrderId: order.id,
        amount,
        currency: currency || "INR",
    });

    await payment.save();

    res.status(200).json({ ...order, paymentId: payment._id});
});


//Verify Payment
const verifyPayment = asyncErrorResolver(async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        return res.status(400).json({ status: "error", message: "Missing payment details" });
    }

    console.log("Verifying payment for Order ID:", razorpay_order_id);

    // Generate the expected signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        const payment = await Payment.findOneAndUpdate(
            { razorpayOrderId: razorpay_order_id },
            { 
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: "successfull",
                paymentDate: new Date(),
            },
            { new: true }
        );

    if (!payment) {
        return res.status(404).json({ status: "error", message: "Payment record not found" });
    }

    // Update the appointment's payment status
    await Appointment.findByIdAndUpdate(payment.appointmentId, { payment: true }, {new: true});
    return res.status(200).json({ status: "success", message: "Payment verified successfully", data: payment });
} else{
    throw new CustomError("Payment Verification Failed"), 400;
}
});



module.exports = { bookAppointment, rescheduleAppointment, userViewAppointments, getAppointmentDetails, doctorViewAppointments, createPayment, verifyPayment };