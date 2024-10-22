import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();

  const gotologin = () => {
    navigate("/");
  };
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUser = (e) => {
    setUsername(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const payload = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        "http://localhost:1000/auth/register",
        payload
      );
      toast.success("Successfully Registered");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-blue-600 h-screen ">
        {/* Header */}
        <div className="bg-white grid grid-cols-2">
          <img
            className="h-20 p-3 max-w-screen-md"
            src="https://jgkfab.p3cdn1.secureserver.net/wp-content/uploads/2024/05/Group-1.png?time=1723030622"
            alt="Logo"
          />
        </div>
        {/* Register div */}
        <div className="absolute left-32">
          <form onSubmit={handleRegister}>
            <div className="border-4 border-white mt-20 rounded-3xl ml-96 w-4/6 h-max bg-white">
              <h1 className="text-4xl text-center pt-9 font-semibold">
                Signup
              </h1>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={handleUser}
                className="p-2 w-4/5 ml-11 mt-8 border-2 border-gray-200"
              />
              <br />
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
                className="p-2 w-4/5 ml-11 mt-8 border-2 border-gray-200"
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
                className="p-2 w-4/5 ml-11 mt-8 border-2 border-gray-200"
              />
              <br />
              <button
                type="submit"
                className="p-4 w-96 rounded-3xl ml-24 mt-8 font-serif text-xl text-white bg-blue-600"
              >
                Signup
              </button>
              <p className="text-center text-lg mt-6 pb-11">
                Already have an account?{" "}
                <span className="text-blue-500" onClick={gotologin}>
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
