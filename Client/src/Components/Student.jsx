import React from "react";
import Compressor from "compressorjs";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./Redux/userSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Student = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [rollno, setRollno] = useState("");
  const [year, setYear] = useState("");
  const [depsec, setDep] = useState("");
  const [venueNeed, setVenue] = useState("");
  const [purpose, setPurpose] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      new Compressor(file, {
        quality: 0.6,
        success(result) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImage(reader.result); // setImage to Base64 string
          };
          reader.readAsDataURL(result);
        },
        error(err) {
          console.error("Error compressing image:", err);
        },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      console.log("Authorization Needed");
      return;
    }

    const payload = {
      image,
      rollno,
      name,
      year,
      depsec,
      venueNeed,
      purpose,
    };

    try {
      const res = await axios.post(
        "http://localhost:1000/student/add",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      toast.success("Request Successfully Sent");
      navigate("/venue");
      console.log(res.data);
      localStorage.setItem("RequestSent", "true");
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    }
  };

  const navhome = () => {
    navigate("/venue");
  };

  return (
    <>
      <div className="bg-cyan-100 min-h-screen">
        <form onSubmit={handleSubmit}>
          <div>
            <div className="pt-5">
              <img
                className="w-3/5 ml-80 mt-8 rounded-t-3xl bg-cyan-100"
                src="https://media.licdn.com/dms/image/C5612AQEKyp8q0mzJjg/article-cover_image-shrink_720_1280/0/1636615458350?e=2147483647&v=beta&t=54dM1cx3FlsLutw9imyPDjx8WiQxEK7jK0juTluLf_Y "
                alt=""
              />
              <h1 className="absolute top-3 text-4xl mt-12 left-1/3 pl-28 border-5 border-yellow-50 text-yellow-50 font-extrabold">
                STUDENT DETAILS
              </h1>

              <div className="pb-16 ">
                <div className="w-3/5 ml-80 bg-customBlue  rounded-b-3xl ">
                  {/* Photo */}
                  <div className="pb-8">
                    <label
                      htmlFor="pH"
                      className="text-4xl text-yellow-50 font-medium pl-40 mb-40 "
                    >
                      STUDENT PHOTO <span className="pl-12">:</span>
                    </label>
                    <input
                      type="file"
                      id="pH"
                      required
                      className=" text-xl ml-6 p-1"
                      onChange={handleImageChange}
                    />
                    <br />
                  </div>

                  {/* Name */}
                  <div className="pb-8">
                    <label
                      htmlFor="name"
                      className="text-4xl text-yellow-50 font-medium pl-40 mb-40 "
                    >
                      STUDENT NAME <span className="pl-16"> :</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className=" text-2xl ml-8 w-80 rounded-2xl  p-1"
                      required
                    />
                    <br />
                  </div>

                  {/* Roll Number */}
                  <div className="pb-8">
                    <label
                      htmlFor="roll"
                      className="text-4xl text-yellow-50 font-medium pl-40 mb-40 "
                    >
                      STUDENT ROLLNO <span className="pl-7">:</span>
                    </label>
                    <input
                      type="text"
                      id="roll"
                      value={rollno}
                      onChange={(e) => setRollno(e.target.value)}
                      className=" text-2xl ml-8 w-80 rounded-2xl  p-1"
                      required
                    />
                    <br />
                  </div>

                  {/* Year */}
                  <div className="pb-8">
                    <label
                      htmlFor="year"
                      className="text-4xl text-yellow-50 font-medium pl-40 mb-40 "
                    >
                      STUDENT YEAR <span className="pl-20">:</span>
                    </label>
                    <input
                      type="text"
                      id="year"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className=" text-2xl ml-8 w-80 rounded-2xl  p-1"
                      required
                    />
                    <br />
                  </div>

                  {/* Department with Section */}
                  <div className="pb-8">
                    <label
                      htmlFor="depsec"
                      className="text-4xl text-yellow-50 font-medium pl-40 mb-40 "
                    >
                      DEP WITH SEC <span className="pl-24">:</span>
                    </label>
                    <input
                      type="text"
                      id="depsec"
                      value={depsec}
                      onChange={(e) => setDep(e.target.value)}
                      className=" text-2xl ml-8 w-80 rounded-2xl  p-1"
                    />
                    <br />
                  </div>

                  {/* Venue Needed */}
                  <div className="pb-8">
                    <label
                      htmlFor="venue"
                      className="text-4xl text-yellow-50 font-medium pl-40 mb-40 "
                    >
                      VENUE NEEDED <span className="pl-20">:</span>
                    </label>
                    <input
                      type="text"
                      id="venue"
                      value={venueNeed}
                      onChange={(e) => setVenue(e.target.value)}
                      className=" text-2xl ml-8 w-80 rounded-2xl  p-1  "
                    />
                    <br />
                  </div>

                  {/* Purpose */}
                  <div className="pb-8">
                    <label
                      htmlFor="purpose"
                      className="text-4xl text-yellow-50 font-medium pl-40 mb-40 "
                    >
                      PURPOSE <span className="pl-44">:</span>
                    </label>
                    <textarea
                      id="purpose"
                      value={purpose}
                      onChange={(e) => setPurpose(e.target.value)}
                      className=" text-xl ml-8 w-80 rounded-2xl p-2 h-28"
                    />
                    <br />
                  </div>
                  <button
                    className="bg-black text-white p-5 w-44 text-xl font-extrabold ml-40"
                    onClick={navhome}
                  >
                    BACK
                  </button>
                  <button
                    className="bg-cyan-100 mb-9 ml-52 p-4 w-72 mt-5 font-semibold text-2xl rounded-3xl"
                    type="submit"
                  >
                    SUBMIT REQUEST
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Student;
