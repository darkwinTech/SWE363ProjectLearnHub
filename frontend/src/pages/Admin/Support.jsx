// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { sampleSupport } from "../../data/data5";
// import "./App.css";
// import ToolBar from "../../components/ToolBar";
// import { getToolBarData } from "../../utils/getToolBarData";
// import HomeIcon from '@mui/icons-material/Home';
// import { getHomeRoute } from "../../utils/getHomeRoute";

// export default function Support() {
//   const navigate = useNavigate();
//   const [messages, setMessages] = useState(sampleSupport);
//   const [sortBy, setSortBy] = useState("most-recent");
//   const [sideBar, setSideBar] = useState(false);

//   // Toggle sidebar
//   const toggleSideBar = () => setSideBar(prev => !prev);

//   // Handle Reply button click
//   const handleReply = (message) => {
//     navigate("/admin/support/reply", { state: { message } });
//   };

//   // Sorting Logic 
//   const sortedMessages = [...messages].sort((a, b) => { 
//     if (sortBy === "names") { 
//       return a.name.localeCompare(b.name);
//     } else {
//       return new Date(b.time) - new Date(a.time);
//     }
//   });

//   return (
//     <main className="wrap">
//       {/* Toolbar */}
//       <ToolBar openSideBar={toggleSideBar} sideBarState={sideBar} toolBarData={getToolBarData()} />

//       <div className="support-page">
//         <h2 className="support-title">Support</h2>

//         <div className="support-sort">
//           <label>Show by:</label>
//           <select 
//             value={sortBy} 
//             onChange={(e) => setSortBy(e.target.value)}
//           >
//             <option value="most-recent">Most Recent</option>
//             <option value="names">Names</option>
//           </select>
//         </div>

//         <section className="support-list">
//           {sortedMessages.map(msg => (
//             <div key={msg.id} className="support-card">

//               {/* Left: Avatar + Name */}
//               <div className="support-left">
//                 <div className="avatar"></div>
//                 <p className="support-name">{msg.name}</p>
//               </div>

//               {/* Center info */}
//               <div className="support-center">
//                 <p className="support-time">{msg.time}</p>
//                 <p className="support-type">{msg.type}</p>
//               </div>

//               {/* Right section */}
//               <div className="support-right">
//                 <div className="issue-title">{msg.issue}</div>
//                 <button className="reply-btn" onClick={() => handleReply(msg)}>Reply</button>
//               </div>

//             </div>
//           ))}
//         </section>
//       </div>

//       {/* Home Icon at Bottom */}
//       <section className="unified-home-bottom-nav">
//         <button className="unified-home-btn">
//           <Link to={getHomeRoute()}>
//             <HomeIcon />
//           </Link>
//         </button>
//       </section>
//     </main>
//   );
// }
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import HomeIcon from '@mui/icons-material/Home';
import { getHomeRoute } from "../../utils/getHomeRoute";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export default function Support() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [sortBy, setSortBy] = useState("most-recent");
  const [sideBar, setSideBar] = useState(false);

  const toggleSideBar = () => setSideBar(prev => !prev);

  // FETCH ALL SUPPORT TICKETS FROM BACKEND
  useEffect(() => {
    async function loadTickets() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${BASE}/api/support`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Error loading tickets:", data.message);
          return;
        }

        setTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
      }
    }

    loadTickets();
  }, []);

  // Handle click on Reply button
  const handleReply = (ticket) => {
    navigate("/admin/support/reply", { state: { ticket } });
  };

  // SORTING: most recent or by student name
  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === "names") {
      return a.userId.name.localeCompare(b.userId.name);
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <main className="wrap">
      <ToolBar openSideBar={toggleSideBar} sideBarState={sideBar} toolBarData={getToolBarData()} />

      <div className="support-page">
        <h2 className="support-title">Support Tickets</h2>

        <div className="support-sort">
          <label>Show by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="most-recent">Most Recent</option>
            <option value="names">Names</option>
          </select>
        </div>

        <section className="support-list">
          {sortedTickets.map(ticket => (
            <div key={ticket._id} className="support-card">

              {/* Left: Avatar + User Name */}
              <div className="support-left">
                <div className="avatar"></div>
                <p className="support-name">{ticket.userId.name}</p>
              </div>

              {/* Center info */}
              <div className="support-center">
                <p className="support-time">{new Date(ticket.createdAt).toLocaleString()}</p>
                <p className="support-type">{ticket.status}</p>
              </div>

              {/* Right */}
              <div className="support-right">
                <div className="issue-title">{ticket.issue}</div>
                <button className="reply-btn" onClick={() => handleReply(ticket)}>
                  Reply
                </button>
              </div>

            </div>
          ))}
        </section>
      </div>

      {/* Home Icon */}
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
