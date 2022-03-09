import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../WorkerPage/WorkerPage.css";
const WorkerPage = () => {
  const { id } = useParams();
  const [worker, setWorker] = useState({});
  /************************************************* */
  const [profession, setProfession] = useState("");
  const [workImages, setWorkImages] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [ratePerHour, setRatePerHour] = useState("");
  const [workerImage, setWorkerImage] = useState("");
  const [services, setServices] = useState([]);
  const [workerProfileInfo, setWorkerProfileInfo] = useState({});
  /**************************************************************************************************** */
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
  /*************************************************************************************************** */
  const addWorkerInfo = async () => {
    const workerInfo = {
      profession,
      workImages,
      status,
      description,
      ratePerHour,
      workerImage,
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/workers/${id}`,
        workerInfo
      );
      if (res.data.success) {
        setWorkerProfileInfo(res.data);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /***************************************************************************************** */

 
  /***************************************************************************************************** */
  useEffect(() => {
    getWorkerById();
    getAllServices();
  }, []);
  /***************************************************************************************************** */
  return (
    <>
      <div className="Container-Profile-Worker">
        <div className="All-Info-Worker">
          <h4>{worker.name}</h4>
          <img src={worker.image} />
          <div>{worker.location}</div>
        </div>
      </div>
      {/************************************************************************************************* */}
      <div className="workerProfileForm">
        <select
          onChange={(e) => {
            setProfession(e.target.value);
          }}
          className="profession"
        >
          <option>Profession</option>
          {services.length ? (
            services.map((e, i) => {
              return (
                <>
                  <option value={e._id}>{e.name}</option>
                </>
              );
            })
          ) : (
            <></>
          )}
        </select>

        <input
          className="workImages"
          type="text"
          placeholder="WorkImages"
          onChange={(e) => {
            setWorkImages(e.target.value);
          }}
        />
        <input
          className="status"
          type="text"
          placeholder="Status"
          onChange={(e) => {
            setStatus(e.target.value);
          }}
        />
        <input
          className="description"
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          className="ratePerHour"
          type="number"
          placeholder="Rate Per Hour"
          onChange={(e) => {
            setRatePerHour(e.target.value);
          }}
        />
        <input
          className="workerImage"
          type="text"
          placeholder="worker Image"
          onChange={(e) => {
            setWorkerImage(e.target.value);
          }}
        />

        <button onClick={addWorkerInfo} className="submitButton">
          Submit
        </button>
      </div>
    </>
  );
};

export default WorkerPage;
