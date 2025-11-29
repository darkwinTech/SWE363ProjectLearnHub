import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { getHomeRoute } from "../../utils/getHomeRoute";
import { getToolBarData } from "../../utils/getToolBarData";
import "./SupportReply.css";

export default function SupportReply() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideBar, setSideBar] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Get message data from location state or use default
  const message = location.state?.message || {
    id: 1,
    name: "User",
    type: "Student",
    time: "2025-11-16 4:35 PM",
    issue: "Problem with adding courses",
    subject: "a Problem with adding courses",
    message: "problem when trying to add courses to my account. Each time I attempt to do so, the course doesn't appear in my list Could you please help me resolve this issue?"
  };

  const toggleSideBar = () => setSideBar(prev => !prev);

  const handleSend = () => {
    if (answer.trim() === "") {
      alert("Please provide an answer before sending.");
      return;
    }
    
    console.log("Reply sent:", { messageId: message.id, answer });
    
    // Show success message
    setShowSuccessModal(true);
  };

  const handleOkClick = () => {
    // Close modal and navigate to home
    setShowSuccessModal(false);
    navigate(getHomeRoute());
  };

  return (
    <main className="support-reply-wrap">
      <ToolBar 
        openSideBar={toggleSideBar} 
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />
      
      <header className="support-reply-title-section">
        <h1 className="support-reply-title">Support Conversation</h1>
      </header>

      {/* User's Support Message Block */}
      <div className="support-reply-user-message-container">
        <div className="support-reply-message-block">
          <div className="support-reply-form-group">
            <label className="support-reply-label">Subject</label>
            <input
              type="text"
              className="support-reply-input-readonly"
              value={message.subject || message.issue}
              readOnly
            />
          </div>
          
          <div className="support-reply-form-group">
            <label className="support-reply-label">Message</label>
            <textarea
              className="support-reply-textarea-readonly"
              value={message.message || `Issue: ${message.issue}`}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Admin's Answer Block */}
      <div className="support-reply-admin-answer-container">
        <div className="support-reply-message-block">
          <div className="support-reply-form-group">
            <label className="support-reply-label">Your Answer</label>
            <textarea
              className="support-reply-textarea"
              placeholder="Provide as much details as possible"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={6}
            />
          </div>
          
          <button className="support-reply-send-btn" onClick={handleSend}>
            Send
          </button>
        </div>
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
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-modal-content">
              <p className="success-modal-message">Message sent successfully.</p>
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

