const  express = require("express")
const  mongoose =  require("mongoose")
const userRouter = require( "./Routes/user.js")
const venueRouter = require("./Routes/venue.js")
const studentRouter = require("./Routes/student.js")
const requireRouter = require("./Routes/request.js")
const cors = require("cors")
const app = express()

app.use(cors())



app.use(express.json())
app.use("/auth",userRouter)
app.use("/venue",venueRouter)
app.use("/student",studentRouter)
app.use("/request",requireRouter)



const connect = async()=>{
   await mongoose.connect("mongodb+srv://nasvin22:SilverBeach@recipes.zarppgi.mongodb.net/LabPortal?retryWrites=true&w=majority&appName=recipes")
    console.log("Db connected")
}

connect();

const port = process.env.PORT || 1000
app.listen(port,()=>{
    console.log(`Port is Listing at ${port}`)
})
