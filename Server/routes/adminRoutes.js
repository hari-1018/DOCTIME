const express = require('express');
// const auth = require('../middlewares/auth');
// const authorize = require('../middlewares/authorize')
const adminRouter = express.Router();
const { 
        addDoctorController,
        viewDoctorController,
        editDoctorController,
        totalDoctorsController,
        viewUserDetails, 
        fetchTotalUsers, 
        fetchDoctorsBySpecialization, 
        totalAppointmentsController,
        pendingAppointmentsController,
        completedAppointmentsController, 
        fetchTotalRevenue, 
        fetchAllUsersController, 
        fetchAllDoctorsController, 
        fetchAllAppointments, 
        blockUser, 
        unblockUser 
    } = require("../controllers/adminController");

//Doctor related routes
adminRouter.post("/add-doctors", addDoctorController);    
adminRouter.get("/view-doctor/:id", viewDoctorController);
adminRouter.put("/edit-doctor/:id", editDoctorController);
adminRouter.get("/dashboard/total-doctors", totalDoctorsController);

 
adminRouter.get("/view-user/:id", viewUserDetails); 

adminRouter.get("/patients", fetchAllUsersController );
adminRouter.get("/doctors", fetchAllDoctorsController);
adminRouter.get("/appointments", fetchAllAppointments);
adminRouter.patch("/block/:id", blockUser);
adminRouter.patch("/unblock/:id", unblockUser);
adminRouter.get("/dashboard/total-users", fetchTotalUsers);
adminRouter.get("/dashboard/count-specialization", fetchDoctorsBySpecialization);  
adminRouter.get("/dashboard/total-revenue", fetchTotalRevenue);


//appointments related routes
adminRouter.get("/dashboard/total-appointments", totalAppointmentsController);
adminRouter.get("/dashboard/pending", pendingAppointmentsController);
adminRouter.get("/dashboard/completed", completedAppointmentsController);


module.exports = adminRouter;