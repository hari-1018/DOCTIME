const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { FetchDoctors, FetchDoctorById } = require("../services/doctorService")

//Fetch Doctors
const fetchDoctors = asyncErrorResolver(async (req, res) => {
    const result = await FetchDoctors();
    console.log("get all doctors", result);
    res.status(200).json({ status: "success", result });
});

//Fetch Doctor By ID
const fetchDoctorById = asyncErrorResolver(async (req, res) => {
    const result = await FetchDoctorById(req.params.id);
    if (!result) return res.status(404).json({ status: "error", message: "Doctor not found" });
    console.log("get doctor by id", result);
    res.status(200).json({ status: "success", result });
});

module.exports = { fetchDoctors, fetchDoctorById };