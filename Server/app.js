const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require("./routes/appointmentRoutes");
const errorHandler = require('./middlewares/errorHandler');

app.use(cors({
    origin: 'http://localhost:5173'
  }));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);

app.all("*", (req,res,next)=>{
    const error = new CustomError("Error Not Found", 404);
    next(error);
})

app.use(errorHandler);

module.exports = app;