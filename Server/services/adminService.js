const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const Payment = require("../models/paymentModel");
const bcrypt = require("bcryptjs");
const CustomError = require("../utils/customError");

//Add Doctor
const addDoctorService = async(data) =>{
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

//View Details of a doctor
const viewDoctorService = async(id) =>{
    const doctor = await Doctor.findById(id);
    if(!doctor){
        throw new CustomError("Doctor not found, Try Again")
    }
    return {
        doctor
    }
}

//View Details of a user
const ViewUser = async(id) =>{
    const user = await User.findById(id);
    if(!user){
        throw new CustomError("User not found, Try Again")
    }
    return {
        user
    }
}


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

//Total Pending Appointments Count
const TotalPendingAppointments = async () => {
    return await Appointment.countDocuments({isCompleted: false});
};

//Fetching all users
const fetchAllUsersService = async () => {
        const users = await User.find(); 
        return {
            message: "All users fetched successfully",
            users,
        };
    };

//Fetch all doctors    
const fetchAllDoctorsService = async (page=1, limit=10) => {
    const skip = (page - 1) * limit;
    const doctors = await Doctor.find().skip(skip).limit(limit); 
    const totalDoctors = await Doctor.countDocuments();

    return {
        doctors,
        totalPages: Math.ceil(totalDoctors / limit),
        currentPage: page,
        totalDoctors,
    };
};

//Fetch Count of doctors in each specialization
 const CountDoctorsBySpecialization = async () => {
    const doctorCount = await Doctor.aggregate([
        { $group: { _id: "$specialization", count: { $sum: 1 } } }
    ]);
    return {
        doctorCount,
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

//Total Revenue
 const TotalRevenue = async () => {
    const totalRevenue = await Payment.aggregate([
        { 
            $match: {status:'successfull'}
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$amount" }
            }
        }
    ]);
    return {
        totalRevenue: totalRevenue[0].totalRevenue
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


  

module.exports = { 
                    addDoctorService,
                    viewDoctorService,
                    ViewUser, 
                    EditDoctor, 
                    TotalUsers, 
                    TotalDoctors, 
                    TotalAppointments, 
                    TotalPendingAppointments, 
                    TotalRevenue, 
                    fetchAllUsersService, 
                    fetchAllDoctorsService, 
                    CountDoctorsBySpecialization, 
                    GetAllAppointments, 
                    BlockUser, 
                    UnblockUser 
                }