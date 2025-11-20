import { useState } from "react";
import { sampleSupport } from "./data5.js";
import "./App.css";
import ToolBar from "./components/ToolBar";

export default function Support() {
  const [messages, setMessages] = useState(sampleSupport);
  const [sortBy, setSortBy] = useState("most-recent");
  const [sideBar, setSideBar] = useState(false);

  // Toggle sidebar
  const toggleSideBar = () => setSideBar(prev => !prev);

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
      <ToolBar openSideBar={toggleSideBar} sideBarState={sideBar} />

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
                <button className="reply-btn">Reply</button>
              </div>

            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
