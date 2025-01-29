const asyncErrorResolver = require("../utils/asyncErrorResolver");
const { FetchDoctors } = require("../services/doctorService")

//Fetch Doctors
const fetchDoctors = asyncErrorResolver(async (req, res) => {
    const result = await FetchDoctors();
    console.log("get all doctors", result);
    res.status(200).json({ status: "success", result });
});

module.exports = { fetchDoctors };