import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Home/Home.css";
const Home = () => {
  const navigation = useNavigate();
  const [services, setServices] = useState([]);

  const getAllServices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/services/");
      if (res.data.success) {
        // dispatch(setPosts(res.data.results.reverse()));

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
        <div className="Services">
          {services ? (
            services.map((e, i) => {
              return (
                <>
                  <div className="oneService" onClick={()=>{
                 navigation(`/services/${e._id}`);
                  }}>
                    {" "}
                    <h2 className="nameSer">{e.name}</h2>
                    {/* <div className="descriptionSer">{e.description}</div>{" "} */}
                  </div>
                </>
              );
            })
          ) : (
            <>No services</>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
