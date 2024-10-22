const express = require("express");
const studentController = require("../Controllers/student");
const auth  = require("../Middleware/auth");
const studentRouter = express.Router();



studentRouter.post("/add", auth, studentController.addStudent);
studentRouter.get("/get",  studentController.getStudent);
studentRouter.post("/addRequest/:id",  studentController.postRequest);



module.exports = studentRouter;
