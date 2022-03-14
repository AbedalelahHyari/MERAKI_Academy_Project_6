import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import "../WorkerPage/WorkerPage.css";
import { BsPencilSquare,BsFillArrowLeftSquareFill,BsFillArrowRightSquareFill } from "react-icons/bs";
const ENDPOINT = "http://localhost:5000";
const socket = io.connect(ENDPOINT);

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
  /************************************************************************** */
  const obj_id = localStorage.getItem("Info")
    ? localStorage.getItem("Info")
    : null;
  /************************************************************************ */
  /*------------------  Socket.io state ---------------------------- */
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [modalWorker, setModalWorker] = useState(false);
  /********************************************************************* */
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
      user_id: state.loginReducer.user_id,
      name: state.loginReducer.name,
    };
  });

  /**************************************************************************************************** */

  const toggleModalWorker = () => {
    setModalWorker(!modalWorker);
  };
  /******************************************************** */
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
        workerInfo,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
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
      const res = await axios.get(`http://localhost:5000/workers/${id}`);
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
  /******************************************************************** */
  const joinRoom = () => {
    setLoggedIn(true);
    socket.emit("JOIN_ROOM", room);
  };

  const sendMessage = () => {
    const messageContent = {
      room,
      content: {
        sender: userName,
        message: message,
      },
    };
    socket.emit("SEND_MESSAGE", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  /***************************************************** */
  useEffect(() => {
    getWorkerById();
    getAllServices();
    getWorkerInfoById();
    getRequestsByWorkerId();
    socket.on("RECEIVE_MESSAGE", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [id]);
  /***************************************************************************************************** */
  console.log("worker-bashar", workerProfileInfo.user);
  return (
    <>
      <div className="Container-Profile-Worker">
    
        <div className="All-Info-Worker">
      
          <img src={worker.image} className="img-worker"/>

          <div className="info-worker-column">
            {workerProfileInfo.user ? (
              <>
                <span>
                  <span className="span-title">Name: </span>
                  {worker.name}
                </span>
                <span>
                  <span className="span-title">Profession: </span>
                  {workerProfileInfo.user.profession.name}
                </span>
                <span>
                  <span className="span-title">Phone: </span>
                  {worker.phone}
                </span>
                <span>
              <span className="span-title">Email: </span>
              {worker.email}
            </span>
                <span>
                  <span className="span-title">Rate/h: </span>
                  {workerProfileInfo.user.ratePerHour}$
                </span>

                <span className="span-title-skills">
                  <span className="span-title-inside">Skills: </span>
                  {workerProfileInfo.user.description}
                </span>

                <span>
                  <span className="span-title">Status: </span>
                  {workerProfileInfo.user.status}
                </span>
              </>
            ) : (
             "NO INFO"
            )}
          </div>

          <button className="Button-hiring" onClick={createNewRequest}>Hiring</button>
          <BsPencilSquare className="icon-pen-edit" onClick={toggleModalWorker} />
        </div>

        <span className="workshops-title">workshops</span>
        <div className="worker-projects">

<BsFillArrowLeftSquareFill className="icon-arrow"/>
          <img src="https://decor30.com/wp-content/uploads/2018/03/%D8%A7%D9%84%D9%88%D8%A7%D9%86-%D8%AD%D9%88%D8%A7%D8%A6%D8%B7-%D8%BA%D8%B1%D9%81-%D8%A7%D9%84%D9%86%D9%88%D9%85-2018-800x445.jpg" className="img-projects"/>

          <BsFillArrowRightSquareFill className="icon-arrow"/>

          </div>

      </div>
      {/************************************************************************************************* */}

   
      {modalWorker && (
        <div className="modal-worker">
          <div onClick={toggleModalWorker} className="overlay-worker"></div>
          <div className="modal-content-worker">




            <div className="workerProfileForm">

            <div className="border_bottom-worker">
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
</div>

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




          </div>
        </div>
      )}
    </>
  );
};

export default WorkerPage;
