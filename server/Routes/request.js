const express = require("express")
const requestController = require("../Controllers/request")
const auth = require("../Middleware/auth")
const requestRouter = express.Router()


requestRouter.post("/add/:id",requestController.addRequest)
requestRouter.get("/get",requestController.getRequest)
requestRouter.delete("/delete/:id",requestController.deleteRequest)
requestRouter.get("/status",auth,requestController.approval)




module.exports = requestRouter