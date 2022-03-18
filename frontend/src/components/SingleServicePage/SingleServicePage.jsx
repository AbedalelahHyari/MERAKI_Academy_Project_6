import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../SingleServicePage/SingleServicePage.css";
import { MdHardware,MdOutlineWork } from "react-icons/md";
const SingleServicePage = () => {
  const { id } = useParams();
  const navigation = useNavigate();
  const [OneServices, setOneServices] = useState([]);

  const getOneServiceById = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/services/${id}`);
      if (res.data.success) {
        setOneServices(res.data.service);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOneServiceById();
  }, []);

  console.log("array", OneServices.workers);
  return (
    <>


      <div className="ContainerSingle">

        <div className="AllOneServices">
      
      <span className="description-title">profession <MdOutlineWork className="icon_worker" style={{color:"white"}}/></span>
     
          {OneServices ? (
            <>
              <div className="SingleService">
                <img
                  src={OneServices.img_service}
                  alt="photo"
                  className="img-single-service"
                />

                <div className="container-name-description">
                  <span className="nameOneSer">
                    {" "}
                    {OneServices.name} <span className="border"></span>
                  </span>
                  <div className="descriptionOneSer">
                    {OneServices.description}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>404 NOT FOUND</>
          )}
        </div>


        <div className="flexColAllWorker">
        
        <span className="Header">Workers <MdHardware className="icon_worker" style={{color:"white"}}/></span>
        
        
         <div className="workers-flex-row">
            {OneServices.workers?.length ? (
              OneServices.workers.map((e, i) => {
                return (
                  <>
                    <div
                      className="worker_info"
                      onClick={() => {
                        navigation(`/worker/${e._id}`);
                      }}
                    >
                      <img alt="image" className="img_worker" src={e.image} />
                      <span className="worker-name">{e.name}</span>

                      <button className="connect-button">Connect</button>
                    </div>


                  
                  </>
                );
              })
            ) : (
              <h3>No Workers available on this service</h3>
            )}
        
        </div>
        </div>


      </div>
    </>
  );
};

export default SingleServicePage;
