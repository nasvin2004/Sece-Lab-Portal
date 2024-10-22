import React, { useEffect, useState } from "react";
import { setToken } from "./Redux/userSlice";
import axios from "../helpers/axios.config";
import { useDispatch, useSelector } from "react-redux";

const Approval = () => {
  const requestSent = localStorage.getItem("RequestSent");
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    const storedToken = localStorage.getItem("Token");
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/request/status",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error fetching venue data:", error);
      }
    };

    if (token && requestSent) {
      fetchStatus();
    }
  }, [token, requestSent]);
  console.log(status);

  return (
    <div>
      {status == "pending" && (
        <div>
          {" "}
          <img
            className="ml-96 mt-28 absolute left-16 h-96 "
            src="https://media.gettyimages.com/id/116361021/photo/young-woman-watching-hourglass.jpg?s=612x612&w=0&k=20&c=hfY5v4Vh1LO7JxH0L6vYVBghyc83oqeufBW5LiP6vLA="
            alt=""
          />
          <p className="ml-96 pl-72 absolute top-96 pt-36 text-center text-yellow-50 text-5xl ">
            {status} . . .
          </p>
        </div>
      )}

      {status == "rejected" && (
        <div>
          {" "}
          <img
            className="ml-96 mt-28 absolute left-48 h-96 "
            src="https://st.depositphotos.com/1031343/4663/v/950/depositphotos_46630565-stock-illustration-quality-control-rejected-stamp.jpg"
            alt=""
          />
          <p className="ml-96 pl-72 absolute top-96 pt-36 text-center text-yellow-50 text-5xl ">
            {status} . . .
          </p>
        </div>
      )}

      {status == "accepted" && (
        <div>
          {" "}
          <img
            className="ml-80 mt-28 absolute left-48 h-96 "
            src="https://img.freepik.com/premium-photo/excited-girl-celebrating-receiving-acceptance-letter-from-university-emotion-success-luck_817921-14552.jpg"
            alt=""
          />
          <p className="ml-96 pl-72 absolute top-96 pt-36 text-center text-yellow-50 text-5xl ">
            {status} . . .
          </p>
        </div>
      )}
    </div>
  );
};

export default Approval;
