import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import React, { useState, useEffect, Suspense, lazy } from "react";

import Home from "./components/Home/Home";
import Registration from "./components/Registration/Registration";



function App() {
  return (
    <>
     <div className="App">
          <div className="Home">
            <Routes>
            <Route path="/Home" element={<Home/>} />
              {/* {state.isLoggedIn ? (
                <Route path="/Home" element={<Home />} />
              ) : (
                <></>
              )} */}
            </Routes>
          </div>
          {/* {state.isLoggedIn ? <></> : <Register />} */}
           <Registration/>
        </div>
    </>
  );
}

export default App;
