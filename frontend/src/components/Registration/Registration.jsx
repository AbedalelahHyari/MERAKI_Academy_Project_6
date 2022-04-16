import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import "./Registration.css";
import axios from "axios";
import { BsFillXCircleFill } from "react-icons/bs";
import { loginRed } from "../../reducers/login/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/****************************************** */
const Registration = () => {
  const navigation = useNavigate();

  const [signuPMessage, setSignupMessage] = useState("");
  const [modalLogin, setModalLogin] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  /****************************************** */
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
    };
  });
  console.log(state.token);
  console.log(state.isLoggedIn);
  /*************************************** */

  const toggleModal = () => {
    setModalLogin(!modalLogin);
  };

  /****************************************** */
  const register = async () => {
    try {
      const user = {
        name,
        email,
        password,
        age,
        gender,
        location,
        phone,
        role,
      };
      const res = await axios.post("http://localhost:5000/users", user);
      if (res.data.success) {
        console.log(`Success to add a user`);
        toast.success(" The user has been created successfully", {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toggleModal();
      }
    } catch (err) {
      console.log(err);
      toast.error(" Error happened while register, please try again", {
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
  /************************************************************************ */
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.userId);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("role", res.data.role);
        dispatch(
          loginRed({
            token: res.data.token,
            user_id: res.data.userId,
            name: res.data.name,
          })
        );
        if (res.data.role == "worker") {
          navigation(`/worker/${res.data.userId}`);
        } else {
          navigation("/home");
        }

        console.log(res.data);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      toast.error("Error happened while Login, please try again", {
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
  /**************************Register************************************* */
  return (
    <>
      <div className="container_for_all">
        <div className="container_login">
          <div className="overlay-img">
            <div className="flex_qout">
              <img
                className="logo_slogan"
                src="https://res.cloudinary.com/dvg9eijgb/image/upload/v1646840924/vjkrmjzhzqiuz83o5mms.png"
              />
              <div className="waviy">
                <span className="slogan" style={{ "--i": 1 }}>
                  F
                </span>
                <span className="slogan" style={{ "--i": 2 }}>
                  i
                </span>
                <span className="slogan" style={{ "--i": 3 }}>
                  x
                </span>
                <span className="slogan" style={{ "--i": 4 }}>
                  {" "}
                  &nbsp;{" "}
                </span>
                <span className="slogan" style={{ "--i": 5 }}>
                  S
                </span>
                <span className="slogan" style={{ "--i": 6 }}>
                  e
                </span>
                <span className="slogan" style={{ "--i": 7 }}>
                  r
                </span>
                <span className="slogan" style={{ "--i": 8 }}>
                  v
                </span>
                <span className="slogan" style={{ "--i": 9 }}>
                  i
                </span>
                <span className="slogan" style={{ "--i": 10 }}>
                  c
                </span>
                <span className="slogan" style={{ "--i": 11 }}>
                  e
                </span>
                <span className="slogan" style={{ "--i": 12 }}>
                  s
                </span>
              </div>

              <div className="qout"></div>
            </div>

            <div className="Login">
              <span className="span-login">Sign In</span>
              <div className="all_input_login">
                <div>
                  {" "}
                  <input
                    className="input_login"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <input
                    className="input_login"
                    type="password"
                    placeholder="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onKeyPress={(event) => {
                      event.key === "Enter" && login();
                    }}
                  />
                </div>

                <button className="button_login" onClick={login}>
                  Sign In
                </button>
              </div>

              <div className="sperate_style">
                <div className="line_login"></div>
                <button className="craete_new_account" onClick={toggleModal}>
                  Craete new account
                </button>
              </div>
            </div>
          </div>
        </div>

        {modalLogin && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <div className="register">
                <div className="register-content">
                  <div className="title_close">
                    <div className="titRegis">Sign Up</div>
                    <BsFillXCircleFill
                      className="icon_close"
                      onClick={toggleModal}
                    />
                  </div>
                  <div className="gap_inpt_signup">
                    <div className="line_signup"></div>

                    <div>
                      <input
                        className="input_signup"
                        type="text"
                        placeholder="Name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>

                    <div>
                      <input
                        className="input_signup"
                        type="text"
                        placeholder="Email"
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                    </div>

                    <div>
                      <input
                        className="input_signup"
                        type="Password"
                        placeholder="Password"
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </div>

                    <div className="border_bottom">
                      <input
                        className="input_signup"
                        type="number"
                        placeholder="Age"
                        onChange={(e) => {
                          setAge(e.target.value);
                        }}
                      />
                    </div>

                    <div className="border_bottom">
                      <select
                        onChange={(e) => {
                          setGender(e.target.value);
                        }}
                        className="input_signup"
                      >
                        <option>Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div className="border_bottom">
                      <input
                        className="input_signup"
                        type="text"
                        placeholder="Location"
                        onChange={(e) => {
                          setLocation(e.target.value);
                        }}
                      />
                    </div>

                    <div className="border_bottom">
                      <input
                        className="input_signup"
                        type="text"
                        placeholder="Phone"
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                    </div>

                    <div className="border_bottom">
                      <select
                        onChange={(e) => {
                          setRole(e.target.value);
                        }}
                        className="input_signup"
                      >
                        <option>Role</option>
                        <option value="user">User</option>
                        <option value="worker">Worker</option>
                      </select>
                    </div>
                  </div>

                  <button className="buttonRegs" onClick={register}>
                    sing up
                  </button>

                  <div className="sing_up_message">{signuPMessage}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Registration;
