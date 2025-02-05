const { AddDoctor, EditDoctor, TotalUsers, TotalDoctors, TotalAppointments, GetAllUsers, GetAllDoctors, GetAllAppointments, BlockUser, UnblockUser } = require("../services/adminService");
const CustomError = require("../utils/customError");
const asyncErrorResolver = require("../utils/asyncErrorResolver");

// Add Doctor
const addNewDoctor = asyncErrorResolver(async (req, res) => {
    const response = await AddDoctor(req.body);
    console.log("dr", response)
    console.log("req.body", req.body)
    res.status(201).json({status: "success", response});
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

//Fetch total appointments count
const fetchTotalAppointments = asyncErrorResolver(async (req, res) => {
    const result = await TotalAppointments();
    res.status(200).json({status: "success", result});
});

//Fetch all users
const fetchAllUsers = asyncErrorResolver(async (req, res) => {
    const result = await GetAllUsers();
    console.log("get all users", result);
    res.status(200).json({ status: "success", result });
});

//Fetch all doctors
const fetchAllDoctors = asyncErrorResolver(async (req, res) => {
    const result = await GetAllDoctors();
    console.log("get all doctors", result);
    res.status(200).json({ status: "success", result });
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

module.exports = { addNewDoctor, editDoctor, fetchTotalUsers, fetchTotalDoctors, fetchTotalAppointments, fetchAllUsers, fetchAllDoctors, fetchAllAppointments, blockUser, unblockUser };
