import React, { useState } from "react";
import Side from "./Sidebar";
import { useForm } from "react-hook-form";
import axios from "axios";
import API_BASE_URL from "../../config";

function Conduct({ onFormSwitch }) {
  const [state, setState] = useState({});
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [candidate, setCandidate] = useState([]);
  const [countID, setCountID] = useState(1);

  const handleUniquKeyClick = () => {
    setCountID((prevCount) => prevCount + 1);
  };

  const handleCandidateDelete = (id) => {
    setCandidate((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    handleUniquKeyClick();
    setState((prevState) => ({
      ...prevState,
      id: countID,
      [name]: value,
      electionId: 1,
    }));
  };

  const confirmChange = (e, i) => {
    e.preventDefault();
    setCandidate([...candidate, state]);
    setState({ id: 1, name: "", electionId: 1, manifesto: "" });
  };

  const headers = {
    accept: "application/json",
    Authorization: localStorage.getItem("SavedToken"),
    "Content-Type": "application/json",
  };

  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (startTime && endTime) {
      const formattedStartTime = new Date(startTime).toISOString();
      const formattedEndTime = new Date(endTime).toISOString();

      axios
        .post(
          `${API_BASE_URL}/election/`,
          {
            id: 1,
            name: data.electionName,
            startTime: formattedStartTime,
            endTime: formattedEndTime,
            rules: data.rules,
            year: data.year,
            branch: data.branch,
            batch: data.batch,
            candidates: candidate,
          },
          { headers }
        )
        .then((res) => {
          if (res.request.staus === 200) {
          }
        });
    }
  };

  return (
    <div className="bg-image">
      <div className="side">
        <Side change={onFormSwitch}></Side>
      </div>
      <div>
        <div className="container1">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="name-date">
              <div className="name-election">
                <label className="Head1">Name of the election : </label>
                <input
                  className="tm1"
                  type="text"
                  name="electionName"
                  {...register("electionName", { maxLength: 20 })}
                />
              </div>
              <div className="name-election"></div>
            </div>
            <div className="YBB">
              <div className="input-grp2">
                {" "}
                <label className="Head1">Year : </label>
                <select name="year" {...register("year")}>
                  <option value="all">ALL</option>
                  <option value="2020">2020</option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                </select>
              </div>

              <div className="input-grp2">
                {" "}
                <label className="Head1">Branch : </label>
                <select name="branch" {...register("branch")}>
                  <option value="all">ALL</option>
                  <option value="bcs">CSE</option>
                  <option value="bcy">CSY</option>
                  <option value="ece">ECE</option>
                  <option value="ai">DS/AI</option>
                </select>
              </div>
              <div className="input-grp2">
                {" "}
                <label className="Head1">Batch : </label>
                <select name="batch" {...register("batch")}>
                  <option value="all">ALL</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            </div>

            <div className="all-box">
              <label className="Head1">Add Candidates:</label>
              <div className="allBox">
                <div className="first-candi">
                  <input
                    className="tm1"
                    type="text"
                    name="name"
                    value={state.name || ""}
                    onChange={(e) => handleChange(e, 0)}
                  />
                  <input
                    className="tm1"
                    type="text"
                    name="manifesto"
                    value={state.manifesto || ""}
                    onChange={(e) => handleChange(e, 0)}
                  />

                  <button onClick={(e) => confirmChange(e, 0)}>Confirm</button>
                </div>
                <div className="displayCandi">
                  <ul>
                    {candidate.map((item) => (
                      <li key={item.id}>
                        {item.name}:{item.manifesto}
                        <button onClick={() => handleCandidateDelete(item.id)}>
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="textarea">
              <label className="Head1">Rules and regulations:</label>
              <textarea
                name="rules"
                id="rules"
                cols="100"
                rows="10"
                {...register("rules", { maxLength: 20 })}
              ></textarea>
            </div>
            <div>
              <div className="Stime">
                <div className="Stime2">
                  <label className="Head1">Start time/Date: </label>
                  <input
                    className="tm2"
                    type="datetime-local"
                    value={startTime}
                    onChange={handleStartTimeChange}
                  />
                </div>
              </div>
              <div>
                <div className="Stime2">
                  <label className="Head1">End Time/Date: </label>
                  <input
                    className="tm2"
                    type="datetime-local"
                    value={endTime}
                    onChange={handleEndTimeChange}
                  />
                </div>
              </div>
            </div>

            <button className="on">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Conduct;
