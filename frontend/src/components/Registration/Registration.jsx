import React, { useState } from "react";
import "./Registration.css";
import axios from "axios";
const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
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
          <option value="User">User</option>
          <option value="Worker">Worker</option>
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
          type="text"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="loginButton">Login</button>
      </div>
    </>
  );
};

export default Registration;
