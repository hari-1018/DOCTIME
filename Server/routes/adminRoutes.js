const express = require('express');
// const auth = require('../middlewares/auth');
// const authorize = require('../middlewares/authorize')
const adminRouter = express.Router();
const {addNewDoctor, fetchTotalUsers, fetchTotalDoctors} = require("../controllers/adminController");

adminRouter.route("/add-doctors")
    .post(addNewDoctor);

adminRouter.get("/dashboard/total-users", fetchTotalUsers);
adminRouter.get("/dashboard/total-doctors", fetchTotalDoctors);



module.exports = adminRouter;