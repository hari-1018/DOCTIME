const express = require('express');
const doctorRouter = express.Router();
const { fetchDoctors } = require("../controllers/doctorController");

doctorRouter.get('/', fetchDoctors);

module.exports = doctorRouter;