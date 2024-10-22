const userModel = require("../Models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const Register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ status: "fail", message: "Missing fields" });
  }

  try {
    const isNew = await userModel.findOne({email})
    if (isNew) {
      return res.status(400).json({ status: "fail", message: "User already registered" });
    }
    
    const user = new userModel({ username, email, password });
    await user.save(); 

    res.status(201).json({ status: "success", user, message: "Successfully registered" });
  } catch (err) {
    res.status(500).json({ status: "fail", error: err.message });
  }
};


const login = async(req,res)=>{
  const{email,password} = req.body;
  const user = await userModel.findOne({email})
 
  if(!user){
     return res.status(400).json({message:"Not registered"})
  }
      bcrypt.compare(password,user.password,(err,decoder)=>{
      if(decoder){
         const token = jwt.sign({TOKENID:user._id,tokenrole:user.role},"token-key",{expiresIn:"10h"})
         res.json({Token:token})
      }
      else{
         res.status(400).json({message:"Invalid password"})
      }
          
  })
 
 }
 module.exports = { Register ,login};
 
