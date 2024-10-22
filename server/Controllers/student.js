const studentModel = require("../Models/student");

const addStudent = async (req, res) => {
  try {
    const studentData = req.body;
    const id = req.user.TOKENID;
    
    // Check if a request with the same ID already exists
    const data = await studentModel.findOne({ id });
    if (data) {
      return res.status(400).json({ message: "Request already sent" });
    }

    // Create a new request
    const newRequest = new studentModel({
      ...studentData,
      id
    });
    await newRequest.save();

    res.status(201).json({ message: "Request sent" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getStudent = async(req,res)=>{
  try{
    const request = await studentModel.find({})
    if(!request){
      return  res.status(400).json("No request")
    }
    res.status(200).json(request)
 }
  catch(err){
      res.error(err)
  }
}


const postRequest = async (req, res) => {
  try {
    const { approval } = req.body; 
    const studentid = req.params.id; 

    const updatedStudent = await studentModel.findOneAndUpdate(
      { id: studentid }, 
      { approval: approval }, 
      { new: true } 
    );

    if (!updatedStudent) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    res.status(200).json({ message: "Approval status updated", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




module.exports = { addStudent,getStudent,postRequest };
