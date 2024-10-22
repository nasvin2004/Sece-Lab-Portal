const requestModel = require("../Models/request")
const studentModel = require("../Models/student")

const addRequest = async(req,res)=>{
    const studentid = req.params.id;
  try{
    const studentData = await studentModel.findOne({id:studentid})
    const requestdata = await new requestModel({
        id:studentData.id,
        image:studentData.image,
        name:studentData.name,
        rollno:studentData.rollno,
        year:studentData.year,
        depsec:studentData.depsec,
        venueoccupied:studentData.venueNeed,
        purpose:studentData.purpose
    })
    requestdata.save();
    res.json("Request Accepted")
  }
  catch(error){
    res.json(error)
  }
}

const getRequest = async(req,res)=>{
    const accptedRequest = await requestModel.find({})
    try{
        if(!accptedRequest){
            return res.json("No request accepted")
        }
        res.status(200).json(accptedRequest)
    }
    catch(error){
        res.status(500).json(error)
    }
}

const deleteRequest = async (req, res) => {
  const studentid = req.params.id;

  try {
    
    const deletedStudent = await studentModel.findOneAndDelete({ id: studentid });


    if (!deletedStudent && !deletedRequest) {
      res.status(404).json({ message: "Student not found in both models" });
      return;
    }

    res.status(200).json({ message: "Student record deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const approval = async (req, res) => {
  try {
    const id = req.user.TOKENID;

    console.log(`Checking approval status for student with ID: ${id}`);

    const pendingData = await studentModel.findOne({ id });
    if (pendingData) {
      console.log("Status is pending.");
      return res.json({ status: "pending" });
    }

    const acceptData = await requestModel.findOne({ id });
    if (acceptData) {
      return res.json({ status: "accepted" });
    }
    return res.json({ status: "rejected" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 

module.exports ={addRequest,getRequest,deleteRequest,approval}