const { AddDoctor, TotalUsers, TotalDoctors, GetAllUsers, GetAllDoctors } = require("../services/adminService");
const CustomError = require("../utils/customError");
const asyncErrorResolver = require("../utils/asyncErrorResolver");

// Add Doctor
const addNewDoctor = asyncErrorResolver(async (req, res) => {
    const response = await AddDoctor(req.body);
    console.log("dr", response)
    console.log("req.body", req.body)
    res.status(201).json({status: "success", response});
});

const fetchTotalUsers = asyncErrorResolver(async (req, res) => {
    const result = await TotalUsers();
    res.status(200).json({status: "success", result});
  });

const fetchTotalDoctors = asyncErrorResolver(async (req, res) => {
    const result = await TotalDoctors();
    res.status(200).json({status: "success", result});
});

const fetchAllUsers = asyncErrorResolver(async (req, res) => {
    const result = await GetAllUsers();
    console.log("get all users", result);
    res.status(200).json({ status: "success", result });
});

const fetchAllDoctors = asyncErrorResolver(async (req, res) => {
    const result = await GetAllDoctors();
    console.log("get all doctors", result);
    res.status(200).json({ status: "success", result });
});

// const blockUser = asyncErrorResolver(async (req, res) => {
//         const userID = req.params.id; // 
//         const result = await blockUser(userID); 
//         res.status(200).json({ success: true, message: result.message,});

// });

module.exports = { addNewDoctor, fetchTotalUsers, fetchTotalDoctors, fetchAllUsers, fetchAllDoctors };
