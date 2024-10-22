const mongoose = require("mongoose")

const requestSchema = mongoose.Schema({
    id:String,
    image:String,
    name:String,
    rollno:String,
    year:String,
    depsec:String,
    venueoccupied:String,
    purpose:String,
})
const requestModel = mongoose.model("request",requestSchema)
module.exports = requestModel;