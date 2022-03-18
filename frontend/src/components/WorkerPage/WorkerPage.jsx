import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ScrollToBottom from "react-scroll-to-bottom";
import { io } from "socket.io-client";
import axios from "axios";
import "../WorkerPage/WorkerPage.css";
import {
  BsPencilSquare,
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
  BsFillChatDotsFill,
} from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiSlideshow2Fill } from "react-icons/ri";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [requests, setRequests] = useState([]);
  const [workerProfileInfo, setWorkerProfileInfo] = useState({});
  const [uploadVid, setUploadVid] = useState("");
  const [updateVid, setUpdateVid] = useState("");
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
  const request_id_Ref = localStorage.getItem("request_id");
  const room_id_Ref = localStorage.getItem("room_id")
    ? localStorage.getItem("room_id")
    : console.log(`Wait for the result`);

  /**************************************************************************************************** */

  const toggleModalWorker = () => {
    setModalWorker(!modalWorker);
  };

  /*************************************** */
  const toggleModalChat = () => {
    setLoggedIn(!loggedIn);
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
        toast.success(" Your info has been updated successfully", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        getWorkerInfoById();
        toggleModalWorker();

        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(" Error, please try again", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
        localStorage.setItem("request_id", res.data.Request._id);
        setTimeout(() => {
          createNewRoom(request_id_Ref);
        }, 100);
        joinRoom();
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
        setRequests(res.data.requests);
        console.log("requests", res.data.requests);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /**************************************************************************************************************** */
  const createNewRoom = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/rooms`, {
        room_ID: localStorage.getItem("request_id"),
      });
      if (res.data.success) {
        console.log(res.data);
        localStorage.setItem("room_id", res.data.room._id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  /**************************************************************************************************************** */
  const createNewMessage = async () => {
    try {
      const messageContent = {
        room_id: localStorage.getItem("room_id")
          ? localStorage.getItem("room_id")
          : localStorage.getItem("room_id_worker"),
        message: message,
      };
      const res = await axios.post(
        "http://localhost:5000/messages",
        messageContent,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (res.data.success) {
        setMessage("");
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //
  /******************************************************************** */
  const joinRoom = () => {
    setLoggedIn(true);
    socket.emit("JOIN_ROOM", room_id_Ref);
  };
  /*************************************************************************** */
  const sendMessage = () => {
    const messageContent = {
      room_id_Ref,
      content: {
        sender: state.name,
        message: message,
      },
    };
    socket.emit("SEND_MESSAGE", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };
  /********************************************************* */
  const getAllMessagesByRoomId = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/messages/room/${
          room_id_Ref ? room_id_Ref : localStorage.getItem("room_id_worker")
        }`
      );
      if (res.data.success) {
        setMessageList(res.data.messages);
      }
    } catch (err) {
      console.log(err);
    }
  };
  /************************************************************** */
  const acceptRequest = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/rooms/single/${id}`);
      if (res.data.success) {
        console.log(res.data);
        localStorage.setItem("room_id_worker", res.data.room._id);
        console.log(res.data.message);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  /****************************************************************** */
  const uploadVideo = async () => {
    const formData = new FormData();
    formData.append("file", uploadVid);
    formData.append("upload_preset", "wyggi4ze");

    await axios
      .post("https://api.cloudinary.com/v1_1/dvg9eijgb/video/upload", formData)
      .then((response) => {
        updateWorkerShop(response.data.secure_url);
      })
      .catch((err) => {
        throw err;
      });
  };

  /****************************************************************** */
  const updateWorkerShop = async (data) => {
    try {
      const res = await axios.put(`http://localhost:5000/workers/${id}`, {
        workImages: data,
      });

      if (res.data.success) {
        setUpdateVid(res.data.vid.workImages);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  /*************************************************************** */

  useEffect(() => {
    getWorkerById();
    getAllServices();
    getWorkerInfoById();
    getRequestsByWorkerId();
    socket.on("RECEIVE_MESSAGE", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [id]);
  /******************** */
  useEffect(() => {
    getAllMessagesByRoomId();
    socket.on("RECEIVE_MESSAGE", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [messageList]);

  /********************************************************************************* */
  console.log("bashar", messageList);
  return (
    <>
      <div className="Container-Profile-Worker">
        <div className="container-span-all-info-worker">
          <span className="profile-title-span">
            Profile <CgProfile className="icons-title" />
          </span>
          <div className="All-Info-Worker">
            <img src={worker.image} className="img-worker" />

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

            {localStorage.getItem("role") === "worker" ? (
              <div></div>
            ) : requests.length ? (
              <button
                className="Button-Chat"
                onClick={() => {
                  joinRoom();
                }}
              >
                Chat
                <BsFillChatDotsFill className="icons-title-chat" />
              </button>
            ) : (
              <button
                className="Button-hiring"
                onClick={() => {
                  createNewRequest();
                  getRequestsByWorkerId();
                }}
              >
                Hiring
              </button>
            )}

            {localStorage.getItem("role") == "worker" &&
            localStorage.getItem("user_id") == id ? (
              <BsPencilSquare
                className="icon-pen-edit"
                onClick={toggleModalWorker}
              />
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className="projects-and-request">
          <div className="container-span-all-info-worker">
            <span className="workshops-title">
              workshops <RiSlideshow2Fill className="icons-title" />
            </span>
            <div className="worker-projects">
           
              <video
                src={workerProfileInfo.user?.workImages}
                controls
                className="img-projects"
              ></video>

           
            </div>

{localStorage.getItem("role") == "worker" &&
            localStorage.getItem("user_id") == id ?(<div className="media-and-upload">

            <div className="upload_media_post">
                        <div className="compose-option">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-camera"
                            id="icon_cam_svg"
                          >
                            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                            <circle cx="12" cy="13" r="4"></circle>
                          </svg>
                          <span className="media">Media</span>
                          <input
                            id="feed-upload-input-2"
                            type="file"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => {
                              setUploadVid(e.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
            
            
                        <button className="button-upload" onClick={uploadVideo}>
                          Upload
                        </button>
            
            </div>
                  ):(<></>)}
     




          </div>

          {localStorage.getItem("role") == "worker" &&
          localStorage.getItem("user_id") == id ? (
            <div className="container-span-all-info-worker">
              <span className="Requests-title-span">
                Requests <IoGitPullRequestSharp className="icons-title" />
              </span>
              <div className="container-requests">
                <div className="one-request">
                  {requests.length ? (
                    requests.map((element, i) => {
                      return (
                        <>
                          <img
                            src={element.requester.image}
                            alt=""
                            className="img-requester"
                          />

                          <div className="all-info-req">
                            <div className="name-button-acc">
                              <div>
                                <span className="span-title-req">Name: </span>
                                {element.requester.name}
                              </div>

                              <button
                                onClick={() => {
                                  acceptRequest(element._id);

                                  joinRoom();
                                  getAllMessagesByRoomId();
                                }}
                                className="accept-button"
                              >
                                Accept
                              </button>
                            </div>

                            <div className="location">
                              <span className="span-title-req">Location: </span>
                              {element.requester.location}
                            </div>
                          </div>
                        </>
                      );
                    })
                  ) : (
                    <span>No Requests until now</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/************************************************************************************************* */}

      {modalWorker && (
        <div className="modal-worker">
          <div onClick={toggleModalWorker} className="overlay-worker"></div>
          <div className="modal-content-worker">
            <div className="workerProfileForm">
              <span className="span-profile">Worker Profile </span>
              <div className="border-bottom-form">
                <select
                  onChange={(e) => {
                    setProfession(e.target.value);
                  }}
                  className="input-form-worker"
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

              {/* <div className="border-bottom-form">
              <input
                className="input-form-worker"
                type="text"
                placeholder="WorkImages"
                onChange={(e) => {
                  setWorkImages(e.target.value);
                }}
              />
</div> */}

              <div className="border-bottom-form">
                <input
                  className="input-form-worker"
                  type="text"
                  placeholder="Status"
                  onChange={(e) => {
                    setStatus(e.target.value);
                  }}
                />
              </div>

              <div className="border-bottom-form">
                <input
                  className="input-form-worker"
                  type="text"
                  placeholder="Description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>

              <div className="border-bottom-form">
                <input
                  className="input-form-worker"
                  type="number"
                  placeholder="Rate Per Hour"
                  onChange={(e) => {
                    setRatePerHour(e.target.value);
                  }}
                />
              </div>

        <button
                onClick={() => {
                  addWorkerInfo();
                }}
                className="submitButton"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {loggedIn && (
        <div className="modal-chat">
          <div onClick={toggleModalChat} className="overlay-chat"></div>
          <div className="modal-content-chat">
            <div className="chat-window">
              <div className="chat-header">
                <p className="p-live-chat">
                  Live Chat <BsFillChatDotsFill className="icons-title-chat" />
                </p>
              </div>
              <div className="chat-body">
                <ScrollToBottom className="message-container">
                  {messageList.length ? (
                    messageList.map((messageContent, i) => {
                      return (
                        <div
                          key={i}
                          className="message"
                          id={
                            messageContent?.sender_id?.role === "User"
                              ? "you"
                              : "other"
                          }
                        >
                          <div>
                            <div className="message-content">
                              <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                              <p id="time">{messageContent.time}</p>
                              <p id="author">{messageContent.author}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <span>Send Message</span>
                  )}
                </ScrollToBottom>
              </div>
              <div className="chat-footer">
                <input
                  type="text"
                  value={message}
                  placeholder="Hey..."
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                  onKeyPress={(event) => {
                    event.key === "Enter" && createNewMessage();
                  }}
                />
                <button
                  onClick={() => {
                    createNewMessage();
                    sendMessage();
                  }}
                >
                  &#9658;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};
export default WorkerPage;
