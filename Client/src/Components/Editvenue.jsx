import React, { useState } from "react";
import lab from "../Components/assests/lab.avif";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setToken } from "./Redux/userSlice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Editvenue = () => {
  const { id } = useParams();

  const [image, setImage] = useState("");
  const [venue, setVenue] = useState("");
  const [seats, setSeat] = useState("");
  const [stime, setSt] = useState("");
  const [etime, setEt] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:1000/venue/getOne/" + id)
      .then((result) => {
        const venueData = result.data[0]; // Access the first object in the array
        setImage(venueData.image);
        setVenue(venueData.venue);
        setSeat(venueData.seats);
        setSt(venueData.stime);
        setEt(venueData.etime);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.log("Authorization Needed");
      return;
    }

    const payload = {
      image,
      venue,
      seats,
      stime,
      etime,
    };
    try {
      const res = await axios.patch(
        "http://localhost:1000/venue/update/" + id,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Venue Updated Successfully");
      navigate("/venue");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  const gotovenue = () => {
    navigate("/venue");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex bg-bgcolor h-screen">
        <img
          className="ml-72 w-1/4 mt-16 h-height rounded-tl-3xl rounded-bl-3xl"
          src={lab}
          alt=""
        />
        <div className="h-height w-5/12 mt-16 rounded-tr-3xl rounded-br-3xl bg-addblue ">
          <h1 className="font-extrabold text-yellow-50 text-4xl text-center pb-8 pt-9">
            EDIT VENUE
          </h1>
          <label
            htmlFor="image"
            className="font-serif text-3xl ml-8 text-yellow-50 mt-40 "
          >
            Venue Image
          </label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border-2 border-gray-400 p-2 pl-20 ml-vi mb-8"
          />
          <label
            htmlFor="name"
            className="font-serif text-3xl ml-8 text-yellow-50 mt-40"
          >
            Venue Name
          </label>
          <input
            type="text"
            id="name"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
            className="border-2 border-gray-400 p-2 pl-20 ml-28 mb-8"
          />
          <label
            htmlFor="seat"
            className="font-serif text-3xl ml-8 text-yellow-50 mt-40"
          >
            Seats Available
          </label>
          <input
            type="text"
            id="seat"
            value={seats}
            onChange={(e) => setSeat(e.target.value)}
            className="border-2 border-gray-400 p-2 pl-20 ml-sa mb-8"
          />
          <label
            htmlFor="st"
            className="font-serif text-3xl ml-8 text-yellow-50 mt-40"
          >
            Start Time
          </label>
          <input
            type="text"
            id="st"
            value={stime}
            onChange={(e) => setSt(e.target.value)}
            className="border-2 border-gray-400 p-2 pl-20 ml-st mb-8"
          />
          <label
            htmlFor="et"
            className="font-serif text-3xl ml-8 text-yellow-50 mt-40"
          >
            End Time
          </label>
          <input
            type="text"
            id="et"
            value={etime}
            onChange={(e) => setEt(e.target.value)}
            className="border-2 border-gray-400 p-2 pl-20 ml-default mb-9 "
          />
          <button
            className="bg-black text-white p-5 w-44 text-xl font-extrabold ml-9"
            onClick={gotovenue}
          >
            BACK
          </button>
          <button
            className="bg-cyan-100 mb-9 ml-40 p-3 w-56 mt-5 font-extrabold text-2xl rounded-3xl"
            type="submit"
          >
            UPDATE
          </button>
        </div>
      </div>
    </form>
  );
};

export default Editvenue;
