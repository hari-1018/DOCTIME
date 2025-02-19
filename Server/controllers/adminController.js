const { 
        addDoctorService,
        ViewUser, 
        ViewDoctor, 
        EditDoctor, 
        TotalUsers, 
        TotalRevenue, 
        TotalDoctors, 
        CountDoctorsBySpecialization, 
        TotalAppointments, 
        TotalPendingAppointments, 
        fetchAllUsersService, 
        fetchAllDoctorsService, 
        GetAllAppointments, 
        BlockUser, 
        UnblockUser 
    } = require("../services/adminService");

const CustomError = require("../utils/customError");
const asyncErrorResolver = require("../utils/asyncErrorResolver");

// Add Doctor
const addDoctorController = asyncErrorResolver(async (req, res) => {
    const response = await addDoctorService(req.body);
    console.log("dr", response)
    console.log("req.body", req.body);
    res.status(201).json({ status: "success", message: "Doctor Added Successfully",  response});
});


//View details of a doctor
const viewDoctorDetails = asyncErrorResolver(async (req, res) => {
    const { id } = req.params;
    const response = await ViewDoctor(id);
    if (!response) throw new CustomError("Doctor not found", 404);
    res.status(200).json({ status: "success", message:"Doctor details fetched successfully", data: response });
});

//View details of a user
const viewUserDetails = asyncErrorResolver(async (req, res) => {
    const { id } = req.params;
    const response = await ViewUser(id);
    if (!response) throw new CustomError("User not found", 404);
    res.status(200).json({ status: "success", message:"User details fetched successfully", data: response });
});

//Edit Doctor
const editDoctor = asyncErrorResolver(async (req, res) => {
    const {id} = req.params;
    console.log("testing id", id)
    const response = await EditDoctor(id, req.body);
    console.log("req.body", req.body)
    console.log("editdr", response)
    res.status(201).json({status: "success", message: "Doctor updated successfully",  data:response});
});

//Fetch total users count
const fetchTotalUsers = asyncErrorResolver(async (req, res) => {
    const result = await TotalUsers();
    res.status(200).json({status: "success", result});
  });

//Fetch total doctors count
const fetchTotalDoctors = asyncErrorResolver(async (req, res) => {
    const result = await TotalDoctors();
    res.status(200).json({status: "success", result});
});

//Fetch doctor based on the specialization
  const fetchDoctorsBySpecialization = asyncErrorResolver(async (req, res) => {
    const doctorCount = await CountDoctorsBySpecialization();
    console.log("get doctors by specialization", doctorCount);
    res.status(200).json({ status: "success", message: "Count of doctors in each specialization fetched successfully", data: doctorCount });
  });

//Fetch total appointments count
const fetchTotalAppointments = asyncErrorResolver(async (req, res) => {
    const result = await TotalAppointments();
    res.status(200).json({status: "success", result});
});

//Fetch pending appointments count
const fetchPendingAppointments = asyncErrorResolver(async (req,res) =>{
    const pendingAppointments = await TotalPendingAppointments();
    res.status(200).json({status: "success", message: "Total pending appointments fetched successfully", data: pendingAppointments});
})

//Total Revenue
const fetchTotalRevenue = asyncErrorResolver(async (req,res) => {
    const totalRevenue = await TotalRevenue();
    res.status(200).json({status: "success", message: "Total revenue fetched successfully", data: totalRevenue});
})


//Fetch all users
const fetchAllUsersController = asyncErrorResolver(async (req, res) => {
    const result = await fetchAllUsersService();
    console.log("get all users", result);
    res.status(200).json({ status: "success", result });
});

//Fetch all doctors
const fetchAllDoctorsController = asyncErrorResolver(async (req, res) => {
    let {page, limit} = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    const result = await fetchAllDoctorsService(page, limit);
    console.log("get all doctors", result);
    res.status(200).json({ status: "success", message: "All doctors fetched successfully", data: result });
});


//Fetch all appointments
const fetchAllAppointments = asyncErrorResolver(async (req, res) => {
    const result = await GetAllAppointments();
    console.log("get all appointments", result);
    res.status(200).json({ status: "success", result });
});

//Block User
const blockUser = asyncErrorResolver(async (req, res) => {
        const userId = req.params.id; 
        const result = await BlockUser(userId); 
        res.status(200).json({ success: "success", message: "User has been successfully blocked", data: result });

});

//Unblock User
const unblockUser = asyncErrorResolver(async (req, res) => {
        const userId = req.params.id; 
        const result = await UnblockUser(userId); 
        res.status(200).json({ success: "success", message: "User has been successfully unblocked", data: result });
});

module.exports = { 
                    addDoctorController,
                    viewDoctorDetails, 
                    viewUserDetails,
                    editDoctor, 
                    fetchTotalUsers, 
                    fetchTotalDoctors, 
                    fetchDoctorsBySpecialization,
                    fetchTotalAppointments, 
                    fetchPendingAppointments,
                    fetchTotalRevenue, 
                    fetchAllUsersController, 
                    fetchAllDoctorsController, 
                    fetchAllAppointments, 
                    blockUser, 
                    unblockUser 
                };
