import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sampleSupport } from "./data5.js";
import "./App.css";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import HomeIcon from '@mui/icons-material/Home';
import { getHomeRoute } from "../../utils/getHomeRoute";

export default function Support() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState(sampleSupport);
  const [sortBy, setSortBy] = useState("most-recent");
  const [sideBar, setSideBar] = useState(false);

  // Toggle sidebar
  const toggleSideBar = () => setSideBar(prev => !prev);

  // Handle Reply button click
  const handleReply = (message) => {
    navigate("/admin/support/reply", { state: { message } });
  };

  // Sorting Logic 
  const sortedMessages = [...messages].sort((a, b) => { 
    if (sortBy === "names") { 
      return a.name.localeCompare(b.name);
    } else {
      return new Date(b.time) - new Date(a.time);
    }
  });

  return (
    <main className="wrap">
      {/* Toolbar */}
      <ToolBar openSideBar={toggleSideBar} sideBarState={sideBar} toolBarData={getToolBarData()} />

      <div className="support-page">
        <h2 className="support-title">Support</h2>

        <div className="support-sort">
          <label>Show by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="most-recent">Most Recent</option>
            <option value="names">Names</option>
          </select>
        </div>

        <section className="support-list">
          {sortedMessages.map(msg => (
            <div key={msg.id} className="support-card">

              {/* Left: Avatar + Name */}
              <div className="support-left">
                <div className="avatar"></div>
                <p className="support-name">{msg.name}</p>
              </div>

              {/* Center info */}
              <div className="support-center">
                <p className="support-time">{msg.time}</p>
                <p className="support-type">{msg.type}</p>
              </div>

              {/* Right section */}
              <div className="support-right">
                <div className="issue-title">{msg.issue}</div>
                <button className="reply-btn" onClick={() => handleReply(msg)}>Reply</button>
              </div>

            </div>
          ))}
        </section>
      </div>

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
