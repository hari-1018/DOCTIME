const express = require('express');
const doctorRouter = express.Router();
const { fetchDoctors, fetchDoctorById } = require("../controllers/doctorController");

doctorRouter.get('/', fetchDoctors);
doctorRouter.get('/:id', fetchDoctorById);

module.exports = doctorRouter;