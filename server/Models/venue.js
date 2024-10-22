const mongoose = require("mongoose")

const venueSchema = mongoose.Schema({
    id:String,
    venue:String,
    image:String,
    seats:Number,
    stime:String,
    etime:String,
})

const venueModel = mongoose.model("venue",venueSchema)
module.exports = venueModel