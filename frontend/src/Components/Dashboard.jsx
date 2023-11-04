import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CreateElection from "./CreateElection";
import "../Assets/css/Dashboard.css";
import Sidebar from "./Sidebar";
import jwt_decode from "jwt-decode";
import API_BASE_URL from "../config";

export const Dashboard = ({ onFormSwitch, setElectionId, seteId }) => {
  const [d, setd] = useState([]);
  const decoded = jwt_decode(localStorage.getItem("SavedToken"));

  useEffect(() => {
    fetch(`${API_BASE_URL}/election/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("SavedToken"),
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("request failed");
        }
        return response.json();
      })
      .then((data) => {
        setd(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  function shouldRenderElection(item, decoded) {
    return (
      item.batch === "all" ||
      item.batch === decoded.batch ||
      item.year === "all" ||
      item.year === decoded.year ||
      item.branch === "all" ||
      item.branch === decoded.branch
    );
  }

  return (
    <div className="bg-image">
      <div className="side">
        <Sidebar change={onFormSwitch}></Sidebar>
      </div>
      <div className="view-section">
        <p className="sumo-text">EvoteKaro</p>

        <div className="cards-list">
          {d.map((item) =>
            shouldRenderElection(item, decoded) ? (
              <CreateElection
                title={item.name}
                rule={item.rules}
                onFormSwitch={onFormSwitch}
                setElectionId={setElectionId}
                start={item.startTime}
                end={item.endTime}
                seteId={seteId}
                id={item.id}
                key={item.id}
              />
            ) : null
          )}
        </div>
        <div className="about_container">
          <p className="about_text">About :</p>
        </div>
      </div>
    </div>
  );
};
