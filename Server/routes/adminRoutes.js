const express = require('express');
// const auth = require('../middlewares/auth');
// const authorize = require('../middlewares/authorize')
const adminRouter = express.Router();
const { 
        addDoctorController,
        viewUserDetails, 
        viewDoctorDetails, 
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
    } = require("../controllers/adminController");

// adminRouter.route("/add-doctors")
//     .post(addNewDoctor);

adminRouter.post("/add-doctors", addDoctorController);    
adminRouter.get("/view-doctor/:id", viewDoctorDetails); 
adminRouter.get("/view-user/:id", viewUserDetails); 
adminRouter.put("/edit-doctor/:id", editDoctor);
adminRouter.get("/patients", fetchAllUsersController );
adminRouter.get("/doctors", fetchAllDoctorsController);
adminRouter.get("/appointments", fetchAllAppointments);
adminRouter.patch("/block/:id", blockUser);
adminRouter.patch("/unblock/:id", unblockUser);
adminRouter.get("/dashboard/total-users", fetchTotalUsers);
adminRouter.get("/dashboard/total-doctors", fetchTotalDoctors);
adminRouter.get("/dashboard/count-specialization", fetchDoctorsBySpecialization);  
adminRouter.get("/dashboard/total-appointments", fetchTotalAppointments);
adminRouter.get("/dashboard/total-revenue", fetchTotalRevenue);
adminRouter.get("/dashboard/pending", fetchPendingAppointments);



module.exports = adminRouter;