import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import "./Registration.css";
import axios from "axios";
import { loginRed } from "../../reducers/login/index";
/****************************************** */
const Registration = () => {
  const navigation = useNavigate();
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
      }
    } catch (err) {
      console.log(err);
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
        console.log(error);
      }
    }
  };
  /*************************************************************** */
  return (
    <>
      <div className="RegisterForm">
        <input
          className="name"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          className="email"
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="password"
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          className="age"
          type="number"
          placeholder="Age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <select
          onChange={(e) => {
            setGender(e.target.value);
          }}
          className="gender"
        >
          <option>Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <input
          className="location"
          type="text"
          placeholder="Location"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        />
        <input
          className="phone"
          type="text"
          placeholder="Phone"
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
        <select
          onChange={(e) => {
            setRole(e.target.value);
          }}
          className="role"
        >
          <option>Role</option>
          <option value="user">User</option>
          <option value="worker">Worker</option>
        </select>
        <button onClick={register} className="registerButton">
          Register
        </button>
      </div>
      {/**************************************************************************** */}
      <div className="loginForm">
        <input
          className="email"
          type="text"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          className="password"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login} className="loginButton">
          Login
        </button>
      </div>
    </>
  );
};

export default Registration;
