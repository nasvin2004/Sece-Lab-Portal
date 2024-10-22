import React, { useEffect, useState } from "react";
import axios from "axios";

const Request = () => {
  const [request, setRequest] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:1000/student/get");
        setRequest(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRequests();
  }, []);

  const handledecision = async (status, id, venue) => {
    if (status === "reject") {
      try {
        await axios.delete(`http://localhost:1000/request/delete/${id}`);
        console.log(`Student with id ${id} has been rejected and deleted.`);
        window.location.reload();
      } catch (error) {
        console.error("Error deleting the student:", error);
      }
      return;
    } else if (status === "accept") {
      axios.post("http://localhost:1000/venue/updatedseat", { venue });

      try {
        await axios.post(`http://localhost:1000/request/add/${id}`);
        await axios.delete(`http://localhost:1000/request/delete/${id}`);
        console.log("Request Accepted");
        window.location.reload();
      } catch (error) {
        console.error("Error accepting the request:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="text-yellow-50 font-extrabold text-4xl text-center pt-8 ">
        REQUESTS RECEIVED
      </h1>
      {request.map((req) => (
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
              Venue Needed :
              <span className="text-blue-600 pl-6">{req.venueNeed}</span>
            </h1>
            <h1 className="ml-5 pt-3 font-bold text-2xl pb-5">
              Purpose :<span className="text-blue-600 pl-6">{req.purpose}</span>
            </h1>
            <button
              className=" text-xl mt-5 ml-5 p-3 font-serif bg-red-700 hover:bg-red-400"
              onClick={() => handledecision("reject", req.id)}
            >
              REJECT
            </button>
            <button
              className="text-xl mt-5  p-3 font-serif bg-green-700 ml-64 hover:bg-green-400 mb-9"
              onClick={() => handledecision("accept", req.id, req.venueNeed)}
            >
              ACCEPT
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Request;
