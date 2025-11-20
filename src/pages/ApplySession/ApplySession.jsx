import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { toolBarData } from "../../data/toolBarData";
import HomeIcon from "@mui/icons-material/Home";
import "../../index.css";
import "../../Main_profiles.css";
import "./ApplySession.css";

export default function ApplySession() {
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get session data from navigation state, or use defaults
  const session = location.state?.session || null;
  const courseCode = session?.id || "MATH101";
  const tutorName = session?.totre?.replace("By ", "") || "Ahmad Alghamdi";
  const description = session?.description || "Description";

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  const handleRegister = () => {
    // Navigate to Join Session page after registration
    navigate("/join-session");
  };

  return (
    <main className="apply-session-wrap">
      {/* ToolBar with hamburger menu and notification */}
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={toolBarData}
      />

      {/* Page Title */}
      <header className="apply-session-title-section">
        <h1 className="apply-session-title">Booking a Session</h1>
      </header>

      {/* Course and Tutor Information */}
      <section className="apply-session-info">
        <h1 className="apply-session-course-code">{courseCode}</h1>
        <h2 className="apply-session-tutor-name">{tutorName}</h2>
        <Link to="/profile" className="apply-session-view-tutor">
          View Tutor
        </Link>
      </section>

      {/* Description Block */}
      <section className="apply-session-description-container">
        <div className="apply-session-description-box">
          <p className="apply-session-description-text">{description}</p>
        </div>
      </section>

      {/* Register Button */}
      <section className="apply-session-button-container">
        <button className="apply-session-register-btn" onClick={handleRegister}>
          Register
        </button>
      </section>

      {/* Home Icon at Bottom */}
      <section className="apply-session-bottom-nav">
        <button className="apply-session-home-btn">
          <Link to="/main">
            <HomeIcon />
          </Link>
        </button>
      </section>
    </main>
  );
}

