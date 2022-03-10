import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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
  const obj_id = localStorage.getItem("Info")
    ? localStorage.getItem("Info")
    : null;
  console.log("Info_ID", typeof obj_id);
  /******************************************** */

  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
      user_id: state.loginReducer.user_id,
      name: state.loginReducer.name,
    };
  });

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
        localStorage.setItem("Info", res.data.workerInfo._id);
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /***************************************************************************************** */
  const getAllServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/services/");
      if (res.data.success) {
        setServices(res.data.services);
      } else throw Error;
    } catch (error) {
      if (!error.response.data.success) {
        return console.log(`error`);
      }
    }
  };
  /**************************************************************************************************** */
  const getWorkerInfoById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/workers/${obj_id}`);
      if (res.data.success) {
        console.log(res.data);
        setWorkerProfileInfo(res.data);
      }
    } catch (err) {
      console.log(err.response);
    }
  };
  /***************************************************************************************************** */
  const createNewRequest = async () => {
    const request = {
      worker: id,
    };
    try {
      const res = await axios.post(
        `http://localhost:5000/request/${id}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /************************************************** */
  const getRequestsByWorkerId = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/request/${id}`);
      if (res.data.success) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /***************************************************** */
  useEffect(() => {
    getWorkerById();
    getAllServices();
    getWorkerInfoById();
  }, [id]);
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
