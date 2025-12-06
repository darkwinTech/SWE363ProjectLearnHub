import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import { getHomeRoute } from "../../utils/getHomeRoute";
import HomeIcon from "@mui/icons-material/Home";
import "../../index.css";
import "../../Main_profiles.css";
import "../Support/StudentSupport.css";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function StudentSupport() {
  const [sideBar, setSideBar] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      alert("Please fill in both subject and message fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to submit a support ticket.");
      return;
    }

    try {
      const res = await fetch(`${BASE}/api/support`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          issue: `${subject}: ${message}`
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to submit support ticket");
        return;
      }

      setShowSuccessModal(true);
    } catch (err) {
      console.error("Error submitting support ticket:", err);
      alert("Server error. Please try again later.");
    }
  };

  const handleOkClick = () => {
    setShowSuccessModal(false);
    // Clear form
    setSubject("");
    setMessage("");
    navigate(getHomeRoute());
  };

  return (
    <main className="student-support-wrap">
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />

      <div className="student-support-container">
        <h1 className="student-support-title">Support Conversations</h1>

        <form className="student-support-form" onSubmit={handleSubmit}>
          <div className="student-support-form-group">
            <label htmlFor="subject" className="student-support-label">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              className="student-support-input"
              placeholder="How can we help you?"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="student-support-form-group">
            <label htmlFor="message" className="student-support-label">
              Your message
            </label>
            <textarea
              id="message"
              className="student-support-textarea"
              placeholder="Provide as much details as possible"
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button type="submit" className="student-support-send-btn">
            Send
          </button>
        </form>
      </div>

      {/* Home Icon at Bottom */}
      <div className="unified-home-bottom-nav">
        <button className="unified-home-btn">
          <Link to={getHomeRoute()}>
            <HomeIcon />
          </Link>
        </button>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="student-support-modal-overlay">
          <div className="student-support-modal">
            <div className="student-support-modal-content">
              <p className="student-support-modal-message">Message sent successfully.</p>
              <button className="student-support-modal-ok-btn" onClick={handleOkClick}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

