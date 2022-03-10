import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Home/Home.css";
import { MdHomeRepairService } from "react-icons/md";

const Home = () => {
  const navigation = useNavigate();
  const [services, setServices] = useState([]);

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

  useEffect(() => {
    getAllServices();
  }, []);

  console.log(services);
  return (
    <>
      <div className="Container">
        <div className="title-services">
          <div className="title">
            {" "}
            SEVICES <MdHomeRepairService className="icon_title_ser" />{" "}
          </div>
          <div className="Services">
            {services ? (
              services.map((e, i) => {
                return (
                  <>
                    <div
                      className="oneService"
                      onClick={() => {
                        navigation(`/services/${e._id}`);
                      }}
                    >
                      {" "}
                      <img src={e.img_service} className="img_service" />
                      <span className="nameService">
                        {" "}
                        <span className="span_service">service</span>
                        {e.name}{" "}
                      </span>
                      <div className="middle">
                        <div className="text">See More</div>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <>No services</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
