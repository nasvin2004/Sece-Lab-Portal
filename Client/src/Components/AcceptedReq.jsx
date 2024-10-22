import React, { useEffect, useState } from "react";
import axios from "axios";

const AcceptedReq = () => {
  const [accepted, setAccepted] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:1000/request/get");
        setAccepted(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h1 className="text-yellow-50 font-extrabold text-4xl text-center pt-8 ">
        REQUESTS ACCEPTED
      </h1>
      {accepted.map((req) => (
        <div
          key={req._id}
          className="bg-white ml-80 flex mt-11 w-3/5 rounded-3xl mb-11 "
        >
          <div>
            <img src={req.image} alt={req.name} className="w-80  ml-8 pt-10" />
            <p className="ml-24 pt-4 font-bold text-2xl pb-8">
              Name: <span className="text-blue-600">{req.name}</span>
            </p>
          </div>
          <div className="  pl-9 font-bold text-2xl">
            <p className="ml-5 pt-9 font-bold text-2xl pb-5">
              Rollno: <span className="text-blue-600">{req.rollno}</span>
            </p>
            <h1 className="ml-5 pt-3 font-bold text-2xl pb-5">
              Year :<span className="text-blue-600 pl-6">{req.year}</span>
            </h1>
            <h1 className="ml-5 pt-3 font-bold text-2xl pb-5">
              Dep & Sec :
              <span className="text-blue-600 pl-6">{req.depsec}</span>
            </h1>
            <h1 className="ml-5 pt-3 font-bold text-2xl pb-5">
              Venue Occupied :
              <span className="text-blue-600 pl-6">{req.venueoccupied}</span>
            </h1>
            <h1 className="ml-5 pt-3 font-bold text-2xl pb-5">
              Purpose :<span className="text-blue-600 pl-6">{req.purpose}</span>
            </h1>
            <h1 className="ml-5 pt-3 font-extrabold text-3xl pb-5">
              STATUS :<span className="text-green-500 pl-6">ACCEPTED</span>
            </h1>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AcceptedReq;
