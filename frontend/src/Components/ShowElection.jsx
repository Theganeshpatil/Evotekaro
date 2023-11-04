import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../Assets/css/Election.css";

function ShowElection({ title, batch, branch, year }) {
  return (
    <div className="card 1">
      <div className="card_image">
        {" "}
        <img src="https://i.redd.it/b3esnz5ra34y.jpg" />
      </div>
      <div className="card_title title-white">{title}</div>
      <Popup
        trigger={
          <button className="but">
            <b>REQ</b>
          </button>
        }
        position="bottom center"
      >
        Year: {year}
        <br></br>
        Branch: {branch}
        <br></br>
        Batch: {batch}
        <br></br>
      </Popup>
    </div>
  );
}

export default ShowElection;
