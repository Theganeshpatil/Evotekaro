import React from 'react';
import { useNavigate } from 'react-router-dom';


 function Side() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
    <div className="logo_details">
      <div className="logo_name">E VoteKaro</div>
    </div>
    <ul className="nav-list">
      <li onClick={() => navigate('/user')}>
        <a href="#">
          <i className="bx bx-user"></i>
          <span className="link_name">Home</span>
        </a>
        <span className="tooltip">Home</span>
      </li>
      <li onClick={() => navigate('/all')}>
        <a href="#">
          <i className="bx bx-chat"></i>
          <span className="link_name">All</span>
        </a>
        <span className="tooltip">All</span>
      </li>
      <li onClick={() => navigate('/u')}>
        <a href="#">
          <i className="bx bx-pie-chart-alt-2"></i>
          <span className="link_name">User</span>
        </a>
        <span className="tooltip">User</span>
      </li>
      <li onClick={() => navigate('/conduct')}>
        <a href="#">
          <i className="bx bx-folder"></i>
          <span className="link_name">Conduct</span>
        </a>
        <span className="tooltip">Conduct</span>
      </li>
      <li class="profile" onClick={() => navigate('/')}>
        <a href="">
        <i class="bx bx-log-out" id="log_out"></i>
        <span className="link_name">Logout</span>
        </a>
        <span className="tooltip">Logout</span>
      </li>
    </ul>
  </div>
);
}

export default Side;
