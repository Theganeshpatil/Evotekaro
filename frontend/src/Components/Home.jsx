import React from "react";
import "../Assets/css/First.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bd">
      <div className="Heading">
        <h1>EvoteKaro</h1>
        <button className="button-89">
          <Link to="/login">Sign up</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
