const express = require('express');
// const auth = require('../middlewares/auth');
// const authorize = require('../middlewares/authorize')
const adminRouter = express.Router();
const { viewUserDetails, viewDoctorDetails, addNewDoctor, editDoctor, fetchTotalUsers, fetchTotalDoctors, fetchDoctorsBySpecialization, fetchTotalAppointments, fetchPendingAppointments, fetchTotalRevenue, fetchAllUsers, fetchAllDoctors, fetchAllAppointments, blockUser, unblockUser } = require("../controllers/adminController");

// adminRouter.route("/add-doctors")
//     .post(addNewDoctor);

adminRouter.get("/view-doctor/:id", viewDoctorDetails); 
adminRouter.get("/view-user/:id", viewUserDetails); 
adminRouter.post("/add-doctors", addNewDoctor)    
adminRouter.put("/edit-doctor/:id", editDoctor);
adminRouter.get("/patients", fetchAllUsers );
adminRouter.get("/doctors", fetchAllDoctors);
adminRouter.get("/appointments", fetchAllAppointments);
adminRouter.patch("/block/:id", blockUser);
adminRouter.patch("/unblock/:id", unblockUser);
adminRouter.get("/dashboard/total-users", fetchTotalUsers);
adminRouter.get("/dashboard/total-doctors", fetchTotalDoctors);
adminRouter.get("/dashboard/count-specialization", fetchDoctorsBySpecialization);  // This route should be used for filtering doctors by specialization.  // adminRouter.get("/dashboard/specialization/:specialization", authorize("admin"), fetchDoctorsBySpecialization);  // This route should be used for filtering doctors by specialization.  // adminRouter.get("/dashboard/specialization/:specialization", auth.adminAuth, fetchDoctors
adminRouter.get("/dashboard/total-appointments", fetchTotalAppointments);
adminRouter.get("/dashboard/total-revenue", fetchTotalRevenue);
adminRouter.get("/dashboard/pending", fetchPendingAppointments);



module.exports = adminRouter;