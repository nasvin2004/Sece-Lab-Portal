import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../helpers/axios.config";
import Header from "./header";
import { setToken } from "./Redux/userSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Venue = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [venue, setVenue] = useState([]);

  // 1. Retrieve token from localStorage and set it in Redux store
  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  // 2. Fetch venue data using the token
  useEffect(() => {
    const fetchVenue = async () => {
      try {
        const response = await axios.get("http://localhost:1000/venue/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVenue(response.data.venue);
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    if (token) {
      fetchVenue();
    }
  }, [token]);

  // 3. Parse the JWT token to get the role
  const parseJwt = (token) => {
    if (!token) return null;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  };
  const parsedToken = parseJwt(token);
  const role = parsedToken ? parsedToken.tokenrole : null;

  // 4. Early return if no token is present
  if (!token) {
    console.log("Authorization Needed");
    return <p className="text-center text-red-500">Authorization Needed</p>;
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:1000/venue/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      // Remove the deleted venue from the state
      setVenue((prevVenue) => prevVenue.filter((lab) => lab.id !== id));
      toast.success("Deleted Successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error deleting venue:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  bg-blue-600 ">
        {venue.map((lab) => (
          <div
            key={lab.id}
            className="border-4 border-customBlue max-w-lg p-8 pl-9 rounded-3xl m-4 mb-5 h-newh bg-gray-100 shadow-black"
          >
            <img
              src={lab.image}
              alt={lab.venue}
              className="w-96 h-3/6 rounded-2xl border-4 border-customBlue"
            />
            <h4 className="pt-4 text-2xl font-serif">
              <span className="font-semibold text-divcolor text-2xl font-extrabold text-blue-800 font-serif pr-4">
                VENUE :
              </span>
              {lab.venue}
            </h4>
            <h4 className="pt-4 text-2xl font-serif">
              <span className="font-semibold text-divcolor text-2xl font-extrabold text-blue-800 font-serif pr-4">
                SEATS AVAILABLE :
              </span>
              {lab.seats}
            </h4>
            <h4 className="pt-4 text-2xl font-serif">
              <span className="font-semibold text-divcolor text-2xl font-extrabold text-blue-800 font-serif pr-4">
                START TIME :
              </span>
              {lab.stime}
            </h4>
            <h4 className="pt-4 text-2xl font-serif">
              <span className="font-semibold text-divcolor text-2xl font-extrabold text-blue-800 font-serif pr-4">
                END TIME :
              </span>
              {lab.etime}
            </h4>
            {role === "admin" && (
              <>
                <Link to={`/edit/${lab.id}`}>
                  <button className="bg-green-700 p-2 mt-4 w-24 text-white border-2 border-black text-xl hover:bg-green-400 hover:text-black font-mono ">
                    EDIT
                  </button>
                </Link>

                <button
                  className="bg-red-700 p-2 mt-3  w-28 text-xl text-white  font-mono hover:bg-red-400 ml-40 border-2 hover:text-black  border-black"
                  onClick={() => handleDelete(lab.id)}
                >
                  DELETE
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default Venue;
