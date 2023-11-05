import React from "react";
import Side from "../AdminPages/Sidebar";
import { useState } from "react";
import { useEffect } from "react";
import API_BASE_URL from "../../config";

export const User = () => {
  const [a, seta] = useState("");
  const [c, setc] = useState("");
  const [e, sete] = useState("");
  const [v, setv] = useState("");

  useEffect(() => {
    fetch(`${API_BASE_URL}/user`, {
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
        seta(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    fetch(`${API_BASE_URL}/candidates`, {
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
        setc(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });

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
        sete(data);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    fetch(`${API_BASE_URL}/votes`, {
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
        setv(data);
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
          <p>EvoteKaro (admin)</p>
        </div>
        <div className="cards-list">
          <div className="card 1">
            <div className="card_image">
              {" "}
              <img src="https://i.redd.it/b3esnz5ra34y.jpg" alt="bg" />
            </div>
            <div className="number">
              <>{a.length}</>
            </div>
            <div className="card_title title-white">
              <p>Number of Voters</p>
            </div>
          </div>

          <div className="card 1">
            <div className="card_image">
              {" "}
              <img src="https://i.redd.it/b3esnz5ra34y.jpg" alt="bg" />
            </div>
            <div className="number">
              <>{c.length}</>
            </div>
            <div className="card_title title-white">
              <p>Candidates</p>
            </div>
          </div>
          <div className="card 1">
            <div className="card_image">
              {" "}
              <img src="https://i.redd.it/b3esnz5ra34y.jpg" alt="bg" />
            </div>
            <div className="number">
              <>{v.length}</>
            </div>
            <div className="card_title title-white">
              <p>Vote Count</p>
            </div>
          </div>
          <div className="card 1">
            <div className="card_image">
              {" "}
              <img src="https://i.redd.it/b3esnz5ra34y.jpg" alt="bg" />
            </div>
            <div className="number">
              <>{e.length}</>
            </div>
            <div className="card_title title-white">
              <p>Election Count</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
