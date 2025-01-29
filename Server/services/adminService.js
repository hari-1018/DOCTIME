const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const bcrypt = require("bcryptjs");
const CustomError = require("../utils/customError");


const AddDoctor = async(data) =>{
    const {name, email, image, qualifications, specialization, experience, fees, availability} = data;
    const existingDoctor = await Doctor.findOne({email});
    if(existingDoctor){
        throw new Error("Doctor Already Existing, Try Again")
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password', salt);

    const newDoctor = new Doctor({
        name, email, password, image, qualifications, specialization, experience, fees, availability});
    await newDoctor.save();
    return { 
        message: "Doctor Added Successfully",         
        doctor: {
        id: newDoctor._id,
        name: newDoctor.name,
        email: newDoctor.email,
        image: newDoctor.image,
        qualification: newDoctor.qualifications,
        specialization: newDoctor.specialization,
        experience: newDoctor.experience,
        fees: newDoctor.fees,
        availability: newDoctor.availability,
        password: newDoctor.password

    }
}
};

const TotalUsers = async () => {
      const totalUsers = await User.countDocuments(); 
      return { 
        message: "Total users fetched successfully", 
        totalUsers 
      };
    };

const TotalDoctors = async () => {
        const totalDoctors = await Doctor.countDocuments(); 
        return { 
          message: "Total users fetched successfully", 
          totalDoctors 
        };
    };

    const TotalAppointments = async () => {
        const totalAppointments = await Appointment.countDocuments(); 
        return { 
          message: "Total appointments fetched successfully", 
          totalAppointments
        };
    };

const GetAllUsers = async () => {
        const users = await User.find(); 
        return {
            message: "All users fetched successfully",
            users,
        };
    };

const GetAllDoctors = async () => {
    const doctors = await Doctor.find(); 
    return {
        message: "All doctors fetched successfully",
        doctors,
    };
};

const GetAllAppointments = async () => {
    const doctors = await Appointment.find(); 
    return {
        message: "All appointments fetched successfully",
        doctors,
    };
};

// const BlockUser = async () => {
//     const user = await User.findById(userID);
//     if(!user){
//         throw new CustomError(`No User Found with ID: ${userID}`, 404);
//     }

//     if(user.isBlocked){
//         throw new CustomError("User is already blocked", 400);
//     }

//    user.isBlocked = true;
//    await user.save();
//    return { message: `User with ID ${userID} has been successfully blocked.` };
//  }


  

module.exports = { AddDoctor, TotalUsers, TotalDoctors, TotalAppointments, GetAllUsers, GetAllDoctors, GetAllAppointments }