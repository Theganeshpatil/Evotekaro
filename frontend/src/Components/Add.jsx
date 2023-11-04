import React from "react";
import { ReactComponent as Home } from "../Assets/images/home.svg";
import { ReactComponent as Past } from "../Assets/images/past.svg";
import { ReactComponent as Vote } from "../Assets/images/ongoing.svg";
import { ReactComponent as Q } from "../Assets/images/faq.svg";
import { ReactComponent as Logout } from "../Assets/images/logout.svg";
import { useNavigate } from "react-router-dom";

export const Add = () => {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="sidebar">
        <ul className="sidebarlist">
          <li className="row" onClick={() => navigate("/dashboard")}>
            {""}
            <div className="icon">
              <Home />
            </div>{" "}
            {""}
            <div className="title">Home</div>
          </li>

          <li className="row">
            {""}
            <div className="icon" onClick={() => navigate("/p")}>
              <Past />
            </div>{" "}
            {""}
            <div className="title">Past</div>
          </li>

          <li className="row">
            {""}
            <div className="icon" onClick={() => navigate("/add")}>
              <Vote />
            </div>{" "}
            {""}
            <div className="title">Vote</div>
          </li>

          <li className="row" onClick={() => navigate("/faq")}>
            {""}
            <div className="icon">
              <Q />
            </div>{" "}
            {""}
            <div className="title">FAQ</div>
          </li>

          <li className="row" onClick={() => navigate("/")}>
            {""}
            <div className="icon">
              <Logout />
            </div>{" "}
            {""}
            <div className="title">Logout</div>
          </li>
        </ul>
      </div>
      <div className="add">
        <center>
          <form>
            <input type="text" name="title" placeholder="Election Name"></input>
            <input type="text" name="rules" placeholder="Rules"></input>
          </form>
          <button>ADD</button>
        </center>
      </div>
    </div>
  );
};
