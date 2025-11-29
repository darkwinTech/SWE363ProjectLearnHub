import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Analytics/AnalyticsPage.css";
import BarChartIcon from "@mui/icons-material/BarChart";
import HomeIcon from "@mui/icons-material/Home";
import { getHomeRoute } from "../../utils/getHomeRoute";
import ToolBar from "../../components/ToolBar";
import { toolBarData as toolBarData_tutor } from "../../data/toolBarData_Tutor";

export default function TutorAnalytics() {
  const [sideBar, setSideBar] = useState(false);
  
  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };
  
  const stats = [
    { id: 1, label: "Total Sessions", value: 4, icon: <BarChartIcon /> },
    { id: 2, label: "Total Enrollments", value: 20, icon: <BarChartIcon /> },
    { id: 3, label: "Average Rating", value: 4.5, icon: <BarChartIcon /> },
    { id: 4, label: "Subject", value: "Math 101", icon: <BarChartIcon /> },
  ];

  const subjects = [
    { id: 1, name: "Session 1", height: "20%" },
    { id: 2, name: "Session 2", height: "25%" },
    { id: 3, name: "Session 3", height: "60%" },
    { id: 4, name: "Session 4", height: "35%" },
  ];

  return (
    <div className="d-flex justify-content-center">
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={toolBarData_tutor}
      />
      <div className="analytics-shell">
        {/* Content */}
          <div className="d-flex justify-content-center mb-3">
            <BarChartIcon className="me-2 text-success" />
            <h2 className="m-0 analytics-title">Analytics</h2>
          </div>

          {/* Stat cards */}
          <div className="row g-3 mb-4">
            {stats.map((s) => (
              <div key={s.id} className="col-6">
                <div className="analytics-stat-card">
                  <div className="analytics-stat-icon">{s.icon}</div>
                  <div className="analytics-stat-label">{s.label}</div>
                  <div className="analytics-stat-value">{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Sessions by Subject */}
          <div className="analytics-section">
            <h3 className="analytics-section-title mb-3">Sessions Rate</h3>
            <div className="d-flex justify-content-between">
              {subjects.map((subject) => (
                <div key={subject.id} className="analytics-subject-card">
                  <div className="analytics-subject-bar-wrapper">
                    <div
                      className="analytics-subject-bar"
                      style={{ height: subject.height }}
                    />
                  </div>
                  <div className="analytics-subject-name">{subject.name}</div>
                </div>
              ))}
            </div>
          </div>

        {/* Bottom home button */}
        <div className="unified-home-bottom-nav">
          <button className="unified-home-btn">
            <Link to={getHomeRoute()}>
              <HomeIcon />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

