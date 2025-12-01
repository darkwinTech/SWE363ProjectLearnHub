import { useState } from "react";
import { sampleApplications } from "../../data/data4";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import "./App.css";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { getHomeRoute } from "../../utils/getHomeRoute";

export default function ViewApplications() {
  const [applications, setApplications] = useState(sampleApplications);
  const [sortBy, setSortBy] = useState("most-recent"); // default sort
  const [sideBar, setSideBar] = useState(false);


  const handleApprove = (id) => { 
    alert(`Application ${id} approved`); 
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const handleReject = (id) => {
    alert(`Application ${id} rejected`);
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  const sortedApplications = [...applications].sort((a, b) => {
    if (sortBy === "most-recent") {
      return new Date(b.submittedAt) - new Date(a.submittedAt);
    } else if (sortBy === "names") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <main className="applications-page">
    <ToolBar openSideBar={() => setSideBar(!sideBar)} sideBarState={sideBar} toolBarData={getToolBarData()} />


      <h2 className="page-title">View Applications</h2>

      <div className="sort-container">
        <label htmlFor="sort">Show by: </label>
        <select 
          id="sort" 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="most-recent">Most Recent</option>
          <option value="names">Names</option>
        </select>
      </div>

      <section className="applications-list">
        {sortedApplications.map(app => (
          <div key={app.id} className="application-card">
            
            {/* Left: Image and Name */}
            <div className="app-left">
              <div className="avatar-placeholder"></div>
              <p className="student-name">{app.name}</p>
            </div>

            {/* Center: Data */}
            <div className="app-center">
              <p className="submitted-at">{app.submittedAt}</p>
              <p className="course">{app.course}</p>
              <p className="grade">Grade: {app.grade}</p>
            </div>

            {/* Right: Icons */}
            <div className="app-right">
              <CheckIcon className="icon approve" onClick={() => handleApprove(app.id)} />
              <CloseIcon className="icon reject" onClick={() => handleReject(app.id)} />
            </div>

          </div>
        ))}
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
