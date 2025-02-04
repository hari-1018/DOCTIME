const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const CustomError = require("../utils/customError");

//Fetch all doctors
const FetchDoctors = async () => {
    const doctors = await Doctor.find(); 
    return {
        message: "All doctors fetched successfully",
        doctors,
    };
};

//Fetch doctor by id
const FetchDoctorById = async (doctorId) => {
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
        throw new CustomError("Doctor not found");
    }

    return {
        message: "Doctor fetched successfully",
        doctor,
    };
};

//Changing Appointment Status
const ChangeAppointmentStatus = async (appointmentId) => {
    const appointment = await Appointment.findByIdAndUpdate(
        appointmentId, {isCompleted : true}, { new: true }
    );
    if (!appointment) {
        throw new CustomError("Appointment not found", 404);
    }

    return {
        appointment,
    };
};

//Forgot Password
const DoctorForgotPassword = async (data) => {
    const { email } = data;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
        throw new CustomError("Doctor not found with this email", 404);
    }

    const resetToken = crypto.randomBytes(16).toString("hex");
    console.log("Reset Token: ", resetToken);

    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    // Save the reset token and expiry date
    doctor.resetTokenPassword = resetTokenHash;
    doctor.resetTokenExpiration = Date.now() + 3600000; // 1 hour

    await doctor.save();

    const urlReset = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

    const sender = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            doctor: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    await sender.sendMail({
        from: process.env.EMAIL_ADDRESS,
        to: doctor.email,
        subject: 'Request for Reset Password',
        html: `
            <h1>Reset Password</h1>
            <p>Click on the below link to reset your password:</p>
            <a href="${urlReset}">${urlReset}</a>
            <p>This link will expire in 1 hour.</p>
        `,
    });
    return { message: 'Reset password email sent successfully.' };
};

module.exports = { FetchDoctors, FetchDoctorById, ChangeAppointmentStatus, DoctorForgotPassword };