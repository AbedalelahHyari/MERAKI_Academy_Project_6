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
                // value={typing}
                placeholder="Find a Service"
                // onChange={(e) => {
                //   setTyping(e.target.value);
                //   filteredSearch(typing);
                //   if (e.target.value !== "") {
                //     setModal(true);
                //   } else {
                //     setModal(false);
                //   }
                // }}
              />
            </div>

            <BsSearch className="icon_search" />
          </div>

          {/* {modal && (
        <div className="modal_search">
          <div onClick={toggleModal} className="overlay_search"></div>
          <div className="modal-content_search">
            <div className="rod">
              {searchResult.length ? (
                searchResult.map((user) => {
                  return (
                    <>
                      <div
                        className="user_info_rod"
                        onClick={() => {
                          navigate(`/profile/${user.id}`);
                          toggleModal();
                          setTyping("");
                        }}
                      >
                        <img
                          src={
                            user.profileimage !== "undefined"
                              ? user.profileimage
                              : noAvatar
                          }
                          className="img_search"
                        />
                        <span>{user.userName}</span>
                      </div>
                    </>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )} */}
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
