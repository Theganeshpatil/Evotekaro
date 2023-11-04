import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import API_BASE_URL from "../config";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    console.log("clicked");

    const loginData = new URLSearchParams();
    loginData.append("username", username);
    loginData.append("password", password);

    fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // eslint-disable-next-line
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: loginData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Login request failed");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Login successful:", data);
        // checking for a given jwt token has admin access if yes forwart it to admin portal
        const token = data.access_token;
        const decoded = jwt_decode(token);
        // store it in localstorege
        localStorage.setItem("SavedToken", "Bearer " + token);
        if (decoded.isAdmin) {
          navigate("/user");
        } else {
          navigate("/dashboard");
        }
        // else to normal user portal
      })
      .catch((error) => {
        console.log("Login error:", error.message);
        alert("Invalid Username or Password");
      });
  };

  return (
    <div className="body">
      <div className="container">
        <div className="cover">
          <div className="front">
            <img
              src="https://images.shiksha.com/mediadata/images/1664006919phpGRGiBf_1280x960.png"
              alt=""
            />
            <div className="text">
              <span className="text-1">
                SignIn with the credentials <br /> provided by the college.
              </span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      className="input"
                      type="email"
                      id="username"
                      placeholder="Email"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      name="email"
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      className="input"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* <div className="text">
                    <a>Forgot password?</a>
                  </div> */}
                  <div className="button input-box">
                    <input
                      type="submit"
                      value="Sumbit"
                      onClick={(e) => handleClick(e)}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
