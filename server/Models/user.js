const  mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{
        type:String,
        default:"user"
    }
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
         next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
    next()
})


const userModel = mongoose.model("user",userSchema)
module.exports = userModel