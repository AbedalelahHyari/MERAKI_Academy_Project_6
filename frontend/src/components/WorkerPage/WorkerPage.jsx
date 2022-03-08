import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../WorkerPage/WorkerPage.css";
const WorkerPage = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState({});
  console.log(worker);
  /******************************************* */
  const getWorkerById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/users/${id}`);
      if (res.data.success) {
        setWorker(res.data.user);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getWorkerById();
  }, []);
  return (
    <div>
      <h1>WorkerPage</h1>
      <h1>{worker.name}</h1>
      <img src={worker.image} />
      <h1>{worker.location}</h1>
    </div>
  );
};

export default WorkerPage;
