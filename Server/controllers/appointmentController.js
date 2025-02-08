const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { BookAppointment, UserViewAppointments, ViewAppointmentDetails, DoctorViewAppointments } = require("../services/appointmentService");
const crypto = require("crypto");
const razorpay = require("../utils/razorpay");
const Payment = require("../models/paymentModel");

//Book Appointment
const bookAppointment = asyncErrorResolver(async (req, res) => {
    const { patientId, doctorId, slotDate, slotTime } = req.body;
    const result = await BookAppointment({ patientId, doctorId, slotDate, slotTime });
    console.log("book appointment", result);
    res.status(200).json({status: "success", message: "Appointment booked successfully", result });
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
const createPayment = asyncErrorResolver(async(req,res)=>{
    const { amount, currency  } = req.body;
    if(!amount){
        return res.status(400).json({ status: "error", message: "Invalid amount" });
    }
    const options = {
        amount: amount * 100, // Convert to paisa
        currency: currency || "INR",
        receipt: `order_rcptid_${Date.now()}`,
      };
      const order = await razorpay.orders.create(options);
      res.status(200).json(order);
    
});

//Verify Payment
const verifyPayment = asyncErrorResolver(async(req,res)=>{
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body)
        .digest("hex");

    if(expectedSignature === razorpay_signature){
        const payment = await Payment.findOneAndUpdate(
            {razorpay_order_id: razorpay_order_id},
            {razorpay_payment_id: razorpay_payment_id, status: 'successfull'},
            {new: true}
            
        )
        if(!payment) return res.status(404).json({ status: "error", message: "Payment not found" });
        console.log("Payment verified successfully");
        res.status(200).json({ status: "success", message: "Payment verified successfully", data: payment });
    }
});


module.exports = { bookAppointment, userViewAppointments, getAppointmentDetails, doctorViewAppointments, createPayment, verifyPayment };