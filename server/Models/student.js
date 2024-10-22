const moongoose = require("mongoose")
const studentSchema = moongoose.Schema({
    id:String,
    image:String,
    name:String,
    rollno:String,
    year:String,
    depsec:String,
    venueNeed:String,
    purpose:String,
    approval:{
        type:String,
        default:"pending"
    }

})

const studentModel = moongoose.model("student",studentSchema)
module.exports = studentModel