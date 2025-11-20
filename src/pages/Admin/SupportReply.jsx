import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ToolBar from "./components/ToolBar";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import "./SupportReply.css";

export default function SupportReply() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sideBar, setSideBar] = useState(false);
  const [answer, setAnswer] = useState("");
  
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
    
    // Here you would typically send the reply to the backend
    console.log("Reply sent:", { messageId: message.id, answer });
    
    // Show success message and navigate back
    alert("Reply sent successfully!");
    navigate("/admin/support");
  };

  return (
    <main className="support-reply-wrap">
      <ToolBar openSideBar={toggleSideBar} sideBarState={sideBar} />
      
      <header className="support-reply-title-section">
        <h1 className="support-reply-title">Support Conversations</h1>
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
            <label className="support-reply-label">message</label>
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
            <label className="support-reply-label">your ansower</label>
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
      <div className="support-reply-bottom-nav">
        <button className="support-reply-home-btn">
          <Link to="/admin/support">
            <HomeIcon />
          </Link>
        </button>
      </div>
    </main>
  );
}

