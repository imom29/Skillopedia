import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/Dashboard";

export default function DashboardPage() {
  return (
    <div style={{ overflow: "hidden" }}>
      {/* <Navbar/> */}
      <div className="container-fluid" id="main">
        <div className="row row-offcanvas row-offcanvas-left">
          <Sidebar />
          <Dashboard />
        </div>
      </div>
    </div>
  );
}
