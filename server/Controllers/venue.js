const venueModel = require("../Models/venue")
const {v4 : uuid} = require("uuid");
const venueRouter = require("../Routes/venue");

const addvenue = async(req,res)=>{
    try{
        const id =uuid()
        const venue = req.body.venue;
        const seats = req.body.seats;
        const image = req.body.image;
        const stime = req.body.stime;
        const etime = req.body.etime;
       
        if(!venue || !seats ||!image ||!stime||!etime){
           return res.status(404).json({message:"Fill every field"})
        }
        const data = await new venueModel({
            id,venue,seats,image,stime,etime
        })
        await data.save();
        res.status(201).json({Message : "venue Added", Venuedetails : data})
    }
  catch(err){
    res.status(404).json(err)
  }

}

const getVenue = async(req,res)=>{

  const venue = await venueModel.find({})
  if(!venue){
    return res.json("No labs Available")
  }
  res.json({Message:"Available labs",venue})
}

const getOne = async(req,res)=>{
  const id =req.params.id;
  try{
    const data = await venueModel.find({id});
    res.status(200).json(data)
  }
  catch(err){
    res.json(err)
  }
}


const deleteVenue = async(req,res)=>{
  const id = req.params.id;
  try{
    await venueModel.findOneAndDelete({id})
    res.send("Venue Successfully deleted")
  }
  catch(err){
        res.send(err)
  }
}

const updateVenue = async(req,res)=>{
  const id = req.params.id;
       
  try{
    await venueModel.findOneAndUpdate({id},{
      venue : req.body.venue,
      seats : req.body.seats,
      image : req.body.image,
      sdate : req.body.seats,
     edate : req.body.edate,
  })
  res.send("success updated")
    }
   catch(err){
    console.log(err)
   }
}

const updateSeats = async (req, res) => {
  const venue = req.body.venue;
  
  try {
    const normalize = (str) => str.replace(/\s+/g, '').toLowerCase();
    const normalizedVenue = normalize(venue);

    // Find the venue with case-insensitive and space-insensitive matching
    const venueData = await venueModel.findOne({
      venue: new RegExp(`^${normalizedVenue}$`, 'i')
    });

    if (!venueData) {
      return res.status(404).json({ message: "Venue not found" });
    }

    // Increment the seats
    const updatedSeats = venueData.seats - 1;

    // Update the venue's seat count
    const updatedVenue = await venueModel.findOneAndUpdate(
      { venue: new RegExp(`^${normalizedVenue}$`, 'i') },  // Match the venue
      { seats: updatedSeats },  // Update the seats field
      { new: true }  // Return the updated document
    );

    res.status(200).json({ message: "Seats updated successfully", updatedVenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





module.exports ={addvenue,getVenue,deleteVenue,updateVenue,getOne,updateSeats}