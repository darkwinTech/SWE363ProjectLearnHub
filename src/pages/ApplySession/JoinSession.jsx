import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { toolBarData } from "../../data/toolBarData";
import HomeIcon from "@mui/icons-material/Home";
import "../../index.css";
import "../../Main_profiles.css";
import "./JoinSession.css";

export default function JoinSession() {
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  // Example data - these can be passed as props or fetched from state/API
  const courseName = "Course";
  const description = "Description about the meeting";

  const handleJoin = () => {
    // Navigate to Rating Session page after joining
    navigate("/rating-session");
  };

  return (
    <main className="join-session-wrap">
      {/* ToolBar with hamburger menu and notification */}
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={toolBarData}
      />

      {/* Page Title */}
      <header className="join-session-title-section">
        <h1 className="join-session-title">Join Session</h1>
      </header>

      {/* Course Block with Description and JOIN Button */}
      <section className="join-session-content-container">
        <div className="join-session-course-block">
          {/* Course Name at Top */}
          <div className="join-session-course-header">
            <h3 className="join-session-course-name">{courseName}</h3>
          </div>

          {/* Description Text */}
          <div className="join-session-description-area">
            <p className="join-session-description-text">{description}</p>
          </div>

          {/* JOIN Button in Bottom Right */}
          <div className="join-session-button-wrapper">
            <button className="join-session-join-btn" onClick={handleJoin}>
              JOIN
            </button>
          </div>
        </div>
      </section>

      {/* Home Icon at Bottom */}
      <section className="join-session-bottom-nav">
        <button className="join-session-home-btn">
          <Link to="/main">
            <HomeIcon />
          </Link>
        </button>
      </section>
    </main>
  );
}

