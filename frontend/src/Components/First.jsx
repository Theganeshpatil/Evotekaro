import React from "react";
import "../Assets/css/First.css";
import { useNavigate } from "react-router-dom";

export const First = () => {
  const navigate = useNavigate();
  const clickHandler = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="bd">
      <div className="Heading">
        <h1>E VOTEKARO</h1>
        <button className="button-89" onClick={clickHandler}>
          Sign up
        </button>
      </div>
    </div>
  );
};
