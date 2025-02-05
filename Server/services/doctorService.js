const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const CustomError = require("../utils/customError");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

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
    console.log("test",doctor);

    await doctor.save();

    const urlReset = `${process.env.CLIENT_URL}/reset-password/${resetToken}`

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    await transporter.sendMail({
        from: process.env.EMAIL,
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

//Reset Password
const DoctorResetPassword = async (data, params) => {
    const { password } = data;
    const { resetToken } = params;

    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    const doctor = await Doctor.findOne({ resetTokenPassword: resetTokenHash, resetTokenExpiration: { $gt: Date.now() } });

    if (!doctor) {
        throw new CustomError("Invalid or expired reset token", 401);
    }
    const salt = await bcrypt.genSalt(10);

    doctor.password = await bcrypt.hash(password, salt);
    doctor.resetTokenPassword = null;
    doctor.resetTokenExpiration = null;

    await doctor.save();

    return { message: 'Password reset successfully.' };
};

module.exports = { FetchDoctors, FetchDoctorById, ChangeAppointmentStatus, DoctorForgotPassword, DoctorResetPassword };