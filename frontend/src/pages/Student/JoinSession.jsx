import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import HomeIcon from "@mui/icons-material/Home";
import { getHomeRoute } from "../../utils/getHomeRoute";
import "../../index.css";
import "../../Main_profiles.css";
import "./JoinSession.css";

export default function StudentJoinSession() {
  const [sideBar, setSideBar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  // Get session data from navigation state, or use defaults
  const session = location.state?.session || null;
  // Extract course code
  const courseCode = session?.courseId?.courseId || session?.courseCode || session?.id || "Course";
  // Handle both formats
  const tutorName = session?.tutorName || session?.totre?.replace("By ", "") || "Tutor";
  const description = session?.sessionDesc || session?.description || "Description about the meeting";
  // Get session ID
  const sessionId = session?._id || session?.id || null;


  const handleJoin = () => {
    navigate("/student/rating-session", { 
      state: { 
        session: {
          sessionId: sessionId,
          courseCode: courseCode,
          courseId: session?.courseId,
          tutorName: tutorName,
          description: description,
          _id: sessionId
        }
      } 
  });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Failed to book session");
      return;
    }

    alert("Booking created successfully!");

    navigate("/student/rating-session", {
      state: { session }
    });

  } catch (err) {
    console.error(err);
    alert("Server error");
  }
};


  return (
    <main className="join-session-wrap">
      {/* ToolBar with hamburger menu and notification */}
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
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
            <h3 className="join-session-course-name">{courseCode}</h3>
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