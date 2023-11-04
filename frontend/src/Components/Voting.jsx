import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "../Assets/css/Voting.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import API_BASE_URL from "../config";

export const Voting = ({ electionId }) => {
  const [k, setk] = useState([]);
  const [can, setcan] = useState([]);
  const [vote, setVote] = useState(false);
  const [candid, setcandid] = useState(0);
  const [useri, setUseri] = useState(0);
  const [ei, setEi] = useState(0);

  const voteHandler = (id, electionId) => {
    setVote(true);
    setcandid(id);
    setEi(electionId);
  };

  const submitHandler = (e) => {
    console.log(useri);
    console.log(candid);
    console.log(ei);

    axios
      .post(
        `${API_BASE_URL}/votes`,
        {
          id: 1,
          userId: useri,
          electionId: ei,
          candidateId: candid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("SavedToken"),
          },
        }
      )
      .then((response) => {
        console.log("Voted successfully:", response.data);
        alert("Voted successfully");
      })
      .catch((error) => {
        console.log("Vote error:", error.message);
        alert("Already Voted");
      });
  };

  useEffect(() => {
    k.forEach((i) => {
      if (i.name === electionId) {
        setcan(i.candidates);
      }
    });
  }, [electionId, k]);

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
        setk(data);
        const token = jwt_decode(localStorage.getItem("SavedToken"));
        setUseri(token.userId);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  useEffect(() => {
    const pastvote = JSON.parse(localStorage.getItem("vote", vote));
    setVote(pastvote);
  }, []);

  useEffect(() => {
    localStorage.setItem("vote", vote);
  }, []);

  return (
    <>
      <div className="a">
        <Sidebar></Sidebar>
      </div>
      <div className="candidates">
        <div className="election-name">{electionId}</div>
        <div className="Voting">
          {can.map((i) => {
            return (
              <div className="candid">
                <div className="name">
                  {i.name}
                  <button
                    className={candid === i.id ? "votebut" : "votebu"}
                    onClick={(id) => voteHandler(i.id, i.electionId)}
                  >
                    {candid === i.id ? "Voted" : "Vote"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <button type="button" className="sub" onClick={submitHandler}>
            Submit
          </button>{" "}
        </div>
      </div>
    </>
  );
};
