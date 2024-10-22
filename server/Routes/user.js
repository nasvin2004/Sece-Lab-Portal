const  express =  require("express")
const userRouter = express.Router();
const   userController  =  require("../Controllers/user")
const auth = require("../Middleware/auth")

userRouter.post("/register",userController.Register)
userRouter.post("/login",userController.login)

module.exports = userRouter