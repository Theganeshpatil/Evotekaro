import React from "react";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="logo_details">
        <div className="logo_name">EvoteKaro</div>
      </div>
      <ul className="nav-list">
        <li onClick={() => navigate("/home")}>
          <button>
            <i className="bx bx-user"></i>
            <span className="link_name">Home</span>
          </button>
          <span className="tooltip">Home</span>
        </li>
        <li onClick={() => navigate("/p")}>
          <button>
            <i className="bx bx-chat"></i>
            <span className="link_name">Past</span>
          </button>
          <span className="tooltip">Past</span>
        </li>
        <li onClick={() => navigate("/vote")}>
          <button>
            <i className="bx bx-pie-chart-alt-2"></i>
            <span className="link_name">Ongoing</span>
          </button>
          <span className="tooltip">Ongoing</span>
        </li>
        <li onClick={() => navigate("/faq")}>
          <button>
            <i className="bx bx-folder"></i>
            <span className="link_name">Help</span>
          </button>
          <span className="tooltip">Help</span>
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

export default Sidebar;
