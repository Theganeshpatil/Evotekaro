import React from "react";
import { useNavigate } from "react-router-dom";

export const Forgot = () => {
  const navigate = useNavigate();
  return (
    <div className="Login_background">
      <div className="box2">
        <form className="forget-form">
          <h1>Forgot Password??</h1>
          <br></br>
          <div>
            <input
              className="fore1"
              type="email"
              placeholder="EMAIL ADDRESS"
              id="email"
            />
            <button
              className="button otp"
              onclick="return false;"
              type="button"
            >
              Send OTP
            </button>
          </div>
          <br></br>
          <input
            className="fore"
            type="password"
            placeholder="OTP"
            id="otp"
            name="otp"
          />
          <br></br>
          <input
            className="fore"
            type="newpassword"
            placeholder="NEW PASSWORD"
            id="newpassword"
            name="newpassword"
          />
          <br></br>

          <button
            class="button reset"
            type="button"
            onClick={() => navigate("/login")}
          >
            <b>Reset</b>
          </button>
        </form>
      </div>
    </div>
  );
};
