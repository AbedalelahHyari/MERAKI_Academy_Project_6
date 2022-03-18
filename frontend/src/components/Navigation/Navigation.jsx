import { logoutRed } from "../../reducers/login/index";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { MdOutlineLogout, MdMiscellaneousServices } from "react-icons/md";
import { FaUserCog } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";

import axios from "axios";
import "../Navigation/Navigation.css";
const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
      user_id: state.loginReducer.user_id,
      name: state.loginReducer.name,
    };
  });
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
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

  const searchService = () => {
    services.find((e, i) => {
      if (search.toLowerCase() === e.name.toLowerCase()) {
        navigate(`/services/${e._id}`);
        setSearch("");
      }
    });
  };

  useEffect(() => {
    getAllServices();
  }, []);

  return (
    <>
      <div className="nav">
        <div className="logo_search">
          <img
            className="logo"
            src="https://res.cloudinary.com/dvg9eijgb/image/upload/v1647279278/mxvkm10itp3ntzofuu8u.png"
            onClick={() => {
              navigate(`/home`);
            }}
          />

          <div className="input_and_icon">
            <div className="search">
              <input
                className="input_search"
                type="text"
                value={search}
                placeholder="Find a Service"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                onKeyPress={(event) => {
                  event.key === "Enter" && searchService();
                }}
              />
            </div>

            <BsSearch className="icon_search" onClick={searchService} />
          </div>
        </div>

        <div className="home_nav">
          <Link to="/home" className="link_home">
            <MdMiscellaneousServices className="icon_service" />
            <div className="home_icon">Services</div>
          </Link>
        </div>

        <div className="user_nav">
          <FaUserCog className="icon_user" />
          <div className="userName_font_nav">{state.name}</div>
        </div>
        <div className="style_logOut">
          <MdOutlineLogout
            className="LogOut"
            onClick={() => {
              dispatch(logoutRed());
              localStorage.clear();
              navigate("/");
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Navigation;
