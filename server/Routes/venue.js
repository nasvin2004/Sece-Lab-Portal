const express = require("express")
const venueRouter = express.Router()
const venueController = require("../Controllers/venue")
const auth = require("../Middleware/auth")


venueRouter.post("/add",auth,venueController.addvenue)
venueRouter.get("/get",auth,venueController.getVenue)
venueRouter.delete("/delete/:id",auth,venueController.deleteVenue)
venueRouter.patch("/update/:id",auth,venueController.updateVenue)
venueRouter.get("/getOne/:id",venueController.getOne)
venueRouter.post("/updatedseat",venueController.updateSeats)



module.exports = venueRouter ;