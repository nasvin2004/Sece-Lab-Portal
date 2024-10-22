import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setToken } from "./Redux/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const gotosignup = () => {
    navigate("/register");
  };

  const handlelogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: email,
      password: password,
    };
    try {
      const res = await axios.post("http://localhost:1000/auth/login", payload);
      // console.log(res);
      localStorage.setItem("Token", res.data.Token);
      dispatch(setToken(res.data.Token));
      navigate("/venue");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };
  useEffect(() => {
    localStorage.setItem("Request", false);
  }, []);

  return (
    <>
      <div className="bg-blue-600 h-screen ">
        {/* Header */}
        <div className="bg-white grid grid-cols-2">
          <img
            className="h-20 p-3 max-w-screen-md"
            src="https://jgkfab.p3cdn1.secureserver.net/wp-content/uploads/2024/05/Group-1.png?time=1723030622"
          ></img>
        </div>
        {/* Register div */}
        <div className="absolute left-32">
          <form onSubmit={handlelogin}>
            <div className="border-4 border-white  mt-20 rounded-3xl ml-96  w-4/6 h-max  bg-white ">
              <h1 className="text-4xl text-center pt-9 font-semibold">Login</h1>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                className="p-2 w-4/5 ml-11 mt-8  border-2 border-gray-200"
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                className="p-2 w-4/5 ml-11 mt-8  border-2 border-gray-200"
              />{" "}
              <br />
              <p className="text-customBlue text-xl pl-48 ml-8 pt-7">
                Forgot password?
              </p>
              <button
                type="submit"
                className="p-4 w-96 rounded-3xl ml-24 mt-8 font-serif text-xl text-white bg-blue-600"
              >
                Login
              </button>
              <p className="text-center text-lg mt-6 pb-11">
                Don't have an account?
                <span className="text-blue-500" onClick={gotosignup}>
                  Signup
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
