import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../Assets/css/Election.css";
import { useNavigate } from "react-router-dom";

function CreateElection({
  title,
  rule,
  setElectionId,
  start,
  end,
  seteId,
  id,
}) {
  let r = rule;
  const currentDateTime = new Date().toISOString();
  const navigate = useNavigate();
  const vote = () => {
    console.log("clicked");
    setElectionId(title);
    seteId(id);
    // eslint-disable-next-line
    {
      if (currentDateTime > end) {
        navigate("/results");
        console.log("Past");
      } else if (currentDateTime > start && currentDateTime < end) {
        navigate("/voting");
        console.log("Ongoing");
      }
    }
  };

  return (
    <div className="card 1" onClick={vote}>
      <div className="card_image">
        <img src="https://i.redd.it/b3esnz5ra34y.jpg" />
      </div>
      <div className="card_title title_white">
        <p>{title}</p>
      </div>
      <Popup
        trigger={<button className="but"> Rules</button>}
        position="botttom center"
      >
        {r}
      </Popup>
    </div>
  );
}

export default CreateElection;
