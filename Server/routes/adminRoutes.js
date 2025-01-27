const express = require('express');
// const auth = require('../middlewares/auth');
// const authorize = require('../middlewares/authorize')
const adminRouter = express.Router();
const {addNewDoctor, fetchTotalUsers, fetchTotalDoctors, fetchAllUsers, fetchAllDoctors } = require("../controllers/adminController");

adminRouter.route("/add-doctors")
    .post(addNewDoctor);

adminRouter.get("/patients", fetchAllUsers );
adminRouter.get("/doctors", fetchAllDoctors);
// adminRouter.patch("/patients/block/:id", blockUser);
// adminRouter.patch("/patients/unblock/:id", unblockUser);
adminRouter.get("/dashboard/total-users", fetchTotalUsers);
adminRouter.get("/dashboard/total-doctors", fetchTotalDoctors);



module.exports = adminRouter;