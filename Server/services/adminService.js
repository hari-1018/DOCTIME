const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const bcrypt = require("bcryptjs");
const CustomError = require("../utils/customError");

//View Details of a doctor
const ViewDoctor = async(id) =>{
    const doctor = await Doctor.findById(id);
    if(!doctor){
        throw new CustomError("Doctor not found, Try Again")
    }
    return {
        doctor
    }
}

//Add Doctor
const AddDoctor = async(data) =>{
    const {name, email, image, qualifications, specialization, experience, fees, availability} = data;
    const existingDoctor = await Doctor.findOne({email});
    if(existingDoctor){
        throw new CustomError("Doctor Already Existing, Try Again")
    }
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password', salt);

    const newDoctor = new Doctor({
        name, email, password, image, qualifications, specialization, experience, fees, availability
    });
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

//Edit Doctor
const EditDoctor = async(id, data) =>{
    const {name, email, image, about, qualifications, specialization, experience, fees, availability} = data;
    const doctor = await Doctor.findByIdAndUpdate(id, {name, email, image, about, qualifications, specialization, experience, fees, availability}, {new: true});
    if(!doctor){
        throw new CustomError("Doctor not found, Try Again")
    }
    return {
        doctor
    }
}

//Total users count
const TotalUsers = async () => {
      const totalUsers = await User.countDocuments(); 
      return { 
        message: "Total users fetched successfully", 
        totalUsers 
      };
    };

//Total doctors count    
const TotalDoctors = async () => {
        const totalDoctors = await Doctor.countDocuments(); 
        return { 
          message: "Total users fetched successfully", 
          totalDoctors 
        };
    };

//Total appointments count    
const TotalAppointments = async () => {
    return await Appointment.countDocuments(); 
    // return { 
    //   message: "Total appointments fetched successfully", 
    //   totalAppointments
    // };
};

//Fetch all users
const GetAllUsers = async () => {
        const users = await User.find(); 
        return {
            message: "All users fetched successfully",
            users,
        };
    };

//Fetch all doctors    
const GetAllDoctors = async () => {
    const doctors = await Doctor.find(); 
    return {
        message: "All doctors fetched successfully",
        doctors,
    };
};

//Fetch all appointments
const GetAllAppointments = async () => {
    const appointments = await Appointment.find()
        .populate("doctorId", "name specialization")
        .populate("patientId", "name");
    return {
        message: "All appointments fetched successfully",
        appointments,
    };
};

//Block User
const BlockUser = async (userId) => {
    const user = await User.findById(userId);
    if(!user){
        throw new CustomError(`No User Found with ID: ${userId}`, 404);
    }

    if(user.isBlocked){
        throw new CustomError("User is already blocked", 400);
    }

   user.isBlocked = true;
   await user.save();
   return { user };
 }

//Unblock User
 const UnblockUser = async (userId) => {
    const user = await User.findById(userId);
    if(!user){
        throw new CustomError(`No User Found with ID: ${userId}`, 404);
    }

    if(!user.isBlocked){
        throw new CustomError("User is not blocked", 400);
    }

   user.isBlocked = false;
   await user.save();
   return { user };
 }


  

module.exports = { ViewDoctor, AddDoctor, EditDoctor, TotalUsers, TotalDoctors, TotalAppointments, GetAllUsers, GetAllDoctors, GetAllAppointments, BlockUser, UnblockUser }