import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../Assets/css/Dashboard.css";
import ShowElection from "./ShowElection";
import Side from "./Side";

export const All = ({ setElectionId, seteId }) => {
  const [d, setd] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/election", {
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
        console.log(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  return (
    <div className="bg-image">
      <div className="side">
        <Side></Side>
      </div>
      <div className="view-section">
        <div className="sumo-text">
          <p>E VOTEKARO</p>
        </div>

        <div className="cards-list">
          {d.map((item) => {
            return (
              <ShowElection
                title={item.name}
                batch={item.batch}
                year={item.year}
                branch={item.branch}
              ></ShowElection>
            );
          })}
        </div>
      </div>
    </div>
  );
};
