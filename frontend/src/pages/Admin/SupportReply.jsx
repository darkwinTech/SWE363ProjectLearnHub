// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import ToolBar from "../../components/ToolBar";
// import HomeIcon from '@mui/icons-material/Home';
// import { Link } from "react-router-dom";
// import { getHomeRoute } from "../../utils/getHomeRoute";
// import { getToolBarData } from "../../utils/getToolBarData";
// import "./SupportReply.css";

// export default function SupportReply() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [sideBar, setSideBar] = useState(false);
//   const [answer, setAnswer] = useState("");
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
  
//   // Get message data from location state or use default
//   const message = location.state?.message || {
//     id: 1,
//     name: "User",
//     type: "Student",
//     time: "2025-11-16 4:35 PM",
//     issue: "Problem with adding courses",
//     subject: "a Problem with adding courses",
//     message: "problem when trying to add courses to my account. Each time I attempt to do so, the course doesn't appear in my list Could you please help me resolve this issue?"
//   };

//   const toggleSideBar = () => setSideBar(prev => !prev);

//   const handleSend = () => {
//     if (answer.trim() === "") {
//       alert("Please provide an answer before sending.");
//       return;
//     }
    
//     console.log("Reply sent:", { messageId: message.id, answer });
    
//     // Show success message
//     setShowSuccessModal(true);
//   };

//   const handleOkClick = () => {
//     // Close modal and navigate to home
//     setShowSuccessModal(false);
//     navigate(getHomeRoute());
//   };

//   return (
//     <main className="support-reply-wrap">
//       <ToolBar 
//         openSideBar={toggleSideBar} 
//         sideBarState={sideBar}
//         toolBarData={getToolBarData()}
//       />
      
//       <header className="support-reply-title-section">
//         <h1 className="support-reply-title">Support Conversation</h1>
//       </header>

//       {/* User's Support Message Block */}
//       <div className="support-reply-user-message-container">
//         <div className="support-reply-message-block">
//           <div className="support-reply-form-group">
//             <label className="support-reply-label">Subject</label>
//             <input
//               type="text"
//               className="support-reply-input-readonly"
//               value={message.subject || message.issue}
//               readOnly
//             />
//           </div>
          
//           <div className="support-reply-form-group">
//             <label className="support-reply-label">Message</label>
//             <textarea
//               className="support-reply-textarea-readonly"
//               value={message.message || `Issue: ${message.issue}`}
//               readOnly
//             />
//           </div>
//         </div>
//       </div>

//       {/* Admin's Answer Block */}
//       <div className="support-reply-admin-answer-container">
//         <div className="support-reply-message-block">
//           <div className="support-reply-form-group">
//             <label className="support-reply-label">Your Answer</label>
//             <textarea
//               className="support-reply-textarea"
//               placeholder="Provide as much details as possible"
//               value={answer}
//               onChange={(e) => setAnswer(e.target.value)}
//               rows={6}
//             />
//           </div>
          
//           <button className="support-reply-send-btn" onClick={handleSend}>
//             Send
//           </button>
//         </div>
//       </div>

//       {/* Home Icon at Bottom */}
//       <div className="unified-home-bottom-nav">
//         <button className="unified-home-btn">
//           <Link to={getHomeRoute()}>
//             <HomeIcon />
//           </Link>
//         </button>
//       </div>

//       {/* Success Modal */}
//       {showSuccessModal && (
//         <div className="success-modal-overlay">
//           <div className="success-modal">
//             <div className="success-modal-content">
//               <p className="success-modal-message">Message sent successfully.</p>
//               <button className="success-modal-ok-btn" onClick={handleOkClick}>
//                 OK
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }

import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { getHomeRoute } from "../../utils/getHomeRoute";
import { getToolBarData } from "../../utils/getToolBarData";
import "./SupportReply.css";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function SupportReply() {
  const navigate = useNavigate();
  const location = useLocation();
  const ticket = location.state?.ticket;  // from navigation
  const [sideBar, setSideBar] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const toggleSideBar = () => setSideBar(prev => !prev);

  // Send reply to backend
  async function handleSend() {
    if (answer.trim() === "") {
      alert("Please provide an answer.");
      return;
    }

    if (!ticket || !ticket._id) {
      alert("Invalid ticket information.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in to reply to tickets.");
      return;
    }

    try {
      const res = await fetch(`${BASE}/api/support/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          response: answer,
          status: "resolved"
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to send reply");
        return;
      }

      setShowSuccessModal(true);
    } catch (err) {
      console.error("Error sending reply:", err);
      alert("Server error. Please try again later.");
    }
  }

  const handleOkClick = () => {
    setShowSuccessModal(false);
    navigate("/admin/support");
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

      {/* User ticket information */}
      <div className="support-reply-user-message-container">
        <div className="support-reply-message-block">
          <div className="support-reply-form-group">
            <label className="support-reply-label">Issue</label>
            <input className="support-reply-input-readonly"
              value={ticket.issue}
              readOnly />
          </div>

          <div className="support-reply-form-group">
            <label className="support-reply-label">User</label>
            <input className="support-reply-input-readonly"
              value={ticket.userId.name}
              readOnly />
          </div>
        </div>
      </div>

      {/* Admin reply */}
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

      {/* Home icon */}
      <div className="unified-home-bottom-nav">
        <button className="unified-home-btn">
          <Link to={getHomeRoute()}>
            <HomeIcon />
          </Link>
        </button>
      </div>

      {/* Success modal */}
      {showSuccessModal && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <div className="success-modal-content">
              <p className="success-modal-message">Reply sent successfully!</p>
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
