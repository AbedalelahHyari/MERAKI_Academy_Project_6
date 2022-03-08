import { logoutRed } from "../../reducers/login/index";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { AiFillHome } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import axios from "axios";
import "../Navigation/Navigation.css";
const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      token: state.loginReducer.token,
      isLoggedIn: state.loginReducer.isLoggedIn,
      user_id:state.loginReducer.user_id,
      name:state.loginReducer.name,


    };
  });
  console.log(state.token);
  console.log(state.isLoggedIn);
  console.log(state.user_id);
  console.log(state.name);

  return<>
  <div className="nav">
    <div className="logo_search">
      {/* <img className="logo" src="https://res.cloudinary.com/dvg9eijgb/image/upload/v1645002900/su1xnqw4k9jxcaxmyuwu.png" onClick={()=>{
         navigate(`/home`);
      }}/> */}
        
  

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

        {/* <BsSearch className="icon_search" /> */}
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

    {/* <FaFacebookMessenger
      className="chat"
      onClick={() => {
        navigate(`/chat`);
      }}
    /> */}
    <div className="home_nav">
      <Link to="/home">
        <AiFillHome className="home_icon" />
      </Link>
    </div>

    <div
      className="user_nav"
   
    >
      {/* <img
        className="img_user_nav"
        src={imgUser !== "undefined" ? imgUser : noAvatar}
      /> */}

<img
        className="img_user_nav"
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/271deea8-e28c-41a3-aaf5-2913f5f48be6/de7834s-6515bd40-8b2c-4dc6-a843-5ac1a95a8b55.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI3MWRlZWE4LWUyOGMtNDFhMy1hYWY1LTI5MTNmNWY0OGJlNlwvZGU3ODM0cy02NTE1YmQ0MC04YjJjLTRkYzYtYTg0My01YWMxYTk1YThiNTUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.BopkDn1ptIwbmcKHdAOlYHyAOOACXW0Zfgbs0-6BY-E"
      />
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
</>;
};

export default Navigation;
