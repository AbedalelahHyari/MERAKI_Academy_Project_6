import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../SingleServicePage/SingleServicePage.css";
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
          {OneServices ? (
            <>
              <div className="SingleService">
                {" "}
                <h2 className="nameOneSer">{OneServices.name}</h2>
                <div className="descriptionOneSer">
                  {OneServices.description}
                </div>{" "}
              </div>
            </>
          ) : (
            <>404 NOT FOUND</>
          )}
        </div>

        <div className="flexColAllWorker">
          <h2 className="Header">Workers</h2>

          <div className="ContainerWorkers">
            {OneServices.workers.length ? (
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
                      <h3 className="workers">{e.name}</h3>
                    </div>
                  </>
                );
              })
            ) : (
              <h1>No Workers</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleServicePage;
