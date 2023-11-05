import React, { useState, useEffect } from "react";
import Sidebar from "../User/Sidebar";
import CreateElection from "./CreateElection";
import jwt_decode from "jwt-decode";
import API_BASE_URL from "../../config";

const Vote = ({ setElectionId, seteId }) => {
  const [d, setd] = useState([]);

  const currentDateTime = new Date().toISOString();
  const decoded = jwt_decode(localStorage.getItem("SavedToken"));

  useEffect(() => {
    fetch(`${API_BASE_URL}/election`, {
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
        // react componants here
        console.log(data);
        setd(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);
  function shouldRenderElection(item, decoded) {
    return (
      (item.batch === "all" || item.batch === decoded.batch) &&
      (item.year === "all" || item.year === decoded.year) &&
      (item.branch === "all" || item.branch === decoded.branch)
    );
  }

  return (
    <div className="bg-image">
      <div className="side">
        <Sidebar></Sidebar>
      </div>
      <div className="view-section">
        <p className="sumo-text">EvoteKaro</p>
        <div className="cards-list">
          {d.map((item) => {
            if (
              currentDateTime > item.startTime &&
              currentDateTime < item.endTime &&
              shouldRenderElection(item, decoded)
            ) {
              return (
                <CreateElection
                  title={item.name}
                  rule={item.rules}
                  setElectionId={setElectionId}
                  start={item.startTime}
                  end={item.endTime}
                  seteId={seteId}
                  id={item.id}
                  key={item.id}
                />
              );
            }
            return null; // It's good practice to return null if nothing should be rendered
          })}
        </div>
      </div>
    </div>
  );
};

export default Vote;
