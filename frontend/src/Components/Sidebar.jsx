import React from 'react';
import { useNavigate } from 'react-router-dom';

 function Sidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
    <div className="logo_details">
      <div className="logo_name">E VoteKaro</div>
    </div>
    <ul className="nav-list">
      <li onClick={() => navigate('/dashboard')}>
        <a href="#">
          <i className="bx bx-user"></i>
          <span className="link_name">Home</span>
        </a>
        <span className="tooltip">Home</span>
      </li>
      <li onClick={() => navigate('/p')}>
        <a href="#">
          <i className="bx bx-chat"></i>
          <span className="link_name">Past</span>
        </a>
        <span className="tooltip">Past</span>
      </li>
      <li onClick={() => navigate('/vote')}>
        <a href="#">
          <i className="bx bx-pie-chart-alt-2"></i>
          <span className="link_name">Ongoing</span>
        </a>
        <span className="tooltip">Ongoing</span>
      </li>
      <li onClick={() => navigate('/faq')}>
        <a href="#">
          <i className="bx bx-folder"></i>
          <span className="link_name">Help</span>
        </a>
        <span className="tooltip">Help</span>
      </li>
      <li class="profile" onClick={() => navigate('/')}>
        <a href="#">
        <i class="bx bx-log-out" id="log_out"></i>
        <span className="link_name">Logout</span>
        </a>
        <span className="tooltip">Logout</span>
      </li>
    </ul>
  </div>
);
}

export default Sidebar;
