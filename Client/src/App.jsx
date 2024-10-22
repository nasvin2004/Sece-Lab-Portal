import React, { useEffect } from "react";
import Venue from "./Components/venue";
import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setToken } from "./Components/Redux/userSlice";
import Check from "./Components/Check";
import Addvenue from "./Components/Addvenue";
import Register from "./Components/Register";
import Student from "./Components/Student";
import Editvenue from "./Components/Editvenue";
import ProtectedRoute from "./Components/ProtectedRoute";
import Request from "./Components/Request";
import Approval from "./Components/Approval";
import AcceptedReq from "./Components/AcceptedReq";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      dispatch(setToken(token));
    }
  }, []);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/venue" element={<Venue />}></Route>
        <Route path="/student" element={<Student />}></Route>
        <Route path="/check" element={<Check />}></Route>
        <Route path="/add" element={<Addvenue />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/edit/:id" element={<Editvenue />} />
        <Route path="/request" element={<Request />}></Route>
        <Route path="/approval" element={<Approval />}></Route>
        <Route path="/accepted" element={<AcceptedReq />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

{
  /* <Route element={<ProtectedRoute />}>
  <Route path="/edit:id" element={<Editvenue />} />
</Route>; */
}
