import React from "react";
import { Route, Routes } from "react-router-dom";
// import Dashboard from "./Admin/Dashboard";
// import Conduct from "./Admin/Conduct";
import { Dashboard, Conduct } from "./AdminPages";
import Sidebar from "./User/Sidebar";

const Admin = () => {
  return (
    <div>
      <Sidebar />
      <Routes path="/admin">
        <Route path="/" element={<Dashboard />} />
        <Route path="/conduct" element={<Conduct />} />
      </Routes>
    </div>
  );
};

export default Admin;
