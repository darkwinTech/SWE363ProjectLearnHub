import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import HomeIcon from "@mui/icons-material/Home";
import { getHomeRoute } from "../../utils/getHomeRoute";
import "../../index.css";
import "../../Main_profiles.css";
import "../ApplySession/ApplySession.css";

export default function TutorApplySession() {
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get session data from navigation state, or use defaults
  const session = location.state?.session || null;
  // Handle both formats: from calendar (courseCode) or from sessions list (id)
  const courseCode = session?.courseCode || session?.id || "MATH101";
  // Handle both formats: from calendar (tutorName) or from sessions list (totre)
  const tutorName = session?.tutorName || session?.totre?.replace("By ", "") || "Ahmad Alghamdi";
  const description = session?.sessionDesc || session?.description || "Description";

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  const handleRegister = () => {
    // Pass session data to Join Session page
    navigate("/join-session", {
      state: {
        session: {
          courseCode: courseCode,
          tutorName: tutorName,
          description: description,
          sessionDesc: description
        }
      }
    });
  };

  return (
    <main className="apply-session-wrap">
      {/* ToolBar with hamburger menu and notification */}
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />

      {/* Page Title */}
      <header className="apply-session-title-section">
        <h1 className="apply-session-title">Booking a Session</h1>
      </header>

      {/* Course and Tutor Information */}
      <section className="apply-session-info">
        <h1 className="apply-session-course-code">{courseCode}</h1>
        <h2 className="apply-session-tutor-name">{tutorName}</h2>
        <button
          className="apply-session-view-tutor"
          style={{ 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer', 
            textDecoration: 'underline',
            color: '#70b476',
            fontSize: '12px',
            fontWeight: '500'
          }}
          onClick={() => navigate("/tutor/favorite", {
            state: {
              tutor: {
                name: tutorName,
                courseCode: courseCode
              }
            }
          })}
        >
          View Tutor
        </button>
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
      <section className="unified-home-bottom-nav">
        <button className="unified-home-btn">
          <Link to={getHomeRoute()}>
            <HomeIcon />
          </Link>
        </button>
      </section>
    </main>
  );
}

