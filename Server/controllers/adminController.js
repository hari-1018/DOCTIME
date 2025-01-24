const { AddDoctor, TotalUsers, TotalDoctors } = require("../services/adminService");
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


module.exports = { addNewDoctor, fetchTotalUsers, fetchTotalDoctors };
