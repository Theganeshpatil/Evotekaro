import React from "react";
import { useNavigate } from "react-router-dom";

function Side() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <div className="logo_details">
        <div className="logo_name">EvoteKaro</div>
      </div>
      <ul className="nav-list">
        <li onClick={() => navigate("/")}>
          <button>
            <i className="bx bx-user"></i>
            <span className="link_name">Home</span>
          </button>
          <span className="tooltip">Home</span>
        </li>
        <li onClick={() => navigate("/all")}>
          <button>
            <i className="bx bx-chat"></i>
            <span className="link_name">All</span>
          </button>
          <span className="tooltip">All</span>
        </li>
        <li onClick={() => navigate("/u")}>
          <button>
            <i className="bx bx-pie-chart-alt-2"></i>
            <span className="link_name">User</span>
          </button>
          <span className="tooltip">User</span>
        </li>
        <li onClick={() => navigate("/conduct")}>
          <button>
            <i className="bx bx-folder"></i>
            <span className="link_name">Conduct</span>
          </button>
          <span className="tooltip">Conduct</span>
        </li>
        <li className="profile" onClick={() => navigate("/")}>
          <button>
            <i className="bx bx-log-out" id="log_out"></i>
            <span className="link_name">Logout</span>
          </button>
          <span className="tooltip">Logout</span>
        </li>
      </ul>
    </div>
  );
}

export default Side;
