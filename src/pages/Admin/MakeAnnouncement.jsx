import { announcementCourses, announcementLevels } from "./data3";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import HomeIcon from "@mui/icons-material/Home";
import { getHomeRoute } from "../../utils/getHomeRoute";
import "./MakeAnnouncement.css";


export default function MakeAnnouncement() {
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [sideBar, setSideBar] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSend = () => {
    // Validate form fields
    if (!selectedCourse.trim()) {
      alert("Please select a course.");
      return;
    }
    if (!selectedLevel.trim()) {
      alert("Please select a student level.");
      return;
    }
    if (!announcement.trim()) {
      alert("Please write an announcement.");
      return;
    }
    
    // Here you would typically send the announcement to the backend
    console.log("Announcement sent:", { 
      course: selectedCourse, 
      level: selectedLevel, 
      announcement 
    });
    
    // Show success message
    setShowSuccessModal(true);
  };

  const handleOkClick = () => {
    // Close modal and navigate to home
    setShowSuccessModal(false);
    navigate(getHomeRoute());
  };


  return (
    <main className="mic-announcement">
      <ToolBar openSideBar={() => setSideBar(!sideBar)} sideBarState={sideBar} toolBarData={getToolBarData()} />

      <h2 className="pageTitle">Make Announcement</h2>

      <div className="form-section">
        <div className="mic-announcement-form-block">
          <div className="mic-announcement-form-group">
            <label>Course</label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">Select Course</option>
              {announcementCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.id}
                </option>
              ))}
            </select>
          </div>

          {/* LEVEL DROPDOWN */}
          <div className="mic-announcement-form-group">
            <label>Students Level</label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value="">Select Level</option>
              {announcementLevels.map((level) => (
                <option key={level.id} value={level.id}>
                  {level.title}
                </option>
              ))}
            </select>
          </div>

          {/* ANNOUNCEMENT */}
          <div className="mic-announcement-form-group">
            <label>New Announcement</label>
            <textarea
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
              placeholder="Write your announcement..."
            />
          </div>

          <button className="main-btn" onClick={handleSend}>Send</button>
        </div>
      </div>

      {/* Home Icon at Bottom */}
      <section className="unified-home-bottom-nav">
        <button className="unified-home-btn">
          <Link to={getHomeRoute()}>
            <HomeIcon />
          </Link>
        </button>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-modal-content">
              <p className="success-modal-message">Announcement sent successfully.</p>
              <button className="success-modal-ok-btn" onClick={handleOkClick}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
