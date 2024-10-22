import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  if (token === null) {
    return <div>Loading...</div>;
  }

  const gotologinpage = () => {
    navigate("/");
  };
  const gotoaddvenues = () => {
    navigate("/add");
  };
  const gotostudent = () => {
    navigate("/student");
  };
  const handlerequest = () => {
    navigate("/request");
  };
  const gotoapproval = () => {
    navigate("/approval");
  };
  const gotoaccepted = () => {
    navigate("/accepted");
  };

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

  return (
    <div className="flex justify-between bg-slate-50 border-customBlue border-4">
      <img
        className="h-20 p-3 max-w-screen-md"
        src="https://jgkfab.p3cdn1.secureserver.net/wp-content/uploads/2024/05/Group-1.png?time=1723030622"
        alt="Logo"
      />
      <h1 className="pt-7 font-semibold text-2xl text-divcolor cursor-pointer hover:text-blue-500 hover:underline hover:scale-105 transition-transform duration-200">
        LABSAVAILABLE
      </h1>
      {role == "admin" ? (
        <h1
          className="pt-7 font-semibold text-xl text-divcolor cursor-pointer hover:text-blue-500 hover:underline hover:scale-105 transition-transform duration-200"
          onClick={handlerequest}
        >
          REQUESTS RECIEVED
        </h1>
      ) : (
        <h1
          className="pt-7 font-semibold text-xl text-divcolor cursor-pointer hover:text-blue-500 hover:underline hover:scale-105 transition-transform duration-200"
          onClick={gotostudent}
        >
          PERMISSION
        </h1>
      )}
      {role == "admin" && (
        <h1
          className="pt-7 font-semibold text-xl text-divcolor cursor-pointer pr-6 hover:text-blue-500 hover:underline hover:scale-105 transition-transform duration-200"
          onClick={gotoaccepted}
        >
          ACCEPTED REQUEST
        </h1>
      )}

      {role == "admin" ? (
        <h1
          className="pt-7 font-semibold text-xl text-divcolor cursor-pointer pr-6 hover:text-blue-500 hover:underline hover:scale-105 transition-transform duration-200"
          onClick={gotoaddvenues}
        >
          ADD VENUES
        </h1>
      ) : (
        <h1
          className="pt-7 font-semibold text-xl text-divcolor cursor-pointer pr-6 hover:text-blue-500 hover:underline hover:scale-105 transition-transform duration-200"
          onClick={gotoapproval}
        >
          APPROVAL
        </h1>
      )}

      {token ? (
        <h1
          className="pt-7 font-semibold text-xl text-divcolor cursor-pointer pr-6 hover:text-blue-500 hover:underline hover:scale-105 transition-transform duration-200"
          onClick={gotologinpage}
        >
          LOGOUT
        </h1>
      ) : (
        <h1
          className="pt-7 font-semibold text-xl text-divcolor cursor-pointer pr-6 hover:text-blue-500 hover:underline hover:scale-105 transition-transform duration-200"
          onClick={gotologinpage}
        >
          LOGIN
        </h1>
      )}
    </div>
  );
};

export default Header;
