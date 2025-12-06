import { useEffect, useState } from "react";
import { apiGetApplications, apiUpdateApplicationStatus } from "../../apiApplications";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home'; 
import { getHomeRoute } from "../../utils/getHomeRoute"; 
import "./App.css";

export default function ViewApplications() {
  const [applications, setApplications] = useState([]);
  const [sortBy, setSortBy] = useState("most-recent");
  const [sideBar, setSideBar] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load from API
  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await apiGetApplications();
      // Filter to only show pending applications
      const pendingApps = data.filter(app => app.status === "pending");
      setApplications(pendingApps);
    } catch (err) {
      console.error(err);
      alert("Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadApplications(); }, []);

  const handleApprove = async (id) => { 
    try {
      await apiUpdateApplicationStatus(id, "approved");
      // Remove the application card from the list
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to approve");
    }
  };

  const handleReject = async (id) => {
    try {
      await apiUpdateApplicationStatus(id, "rejected");
      // Remove the application card from the list
      setApplications(prev => prev.filter(app => app.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to reject");
    }
  };

  const sortedApplications = [...applications].sort((a, b) => {
    if (sortBy === "most-recent") {
      return new Date(b.appliedAt) - new Date(a.appliedAt);
    } else if (sortBy === "names") {
      return a.studentName.localeCompare(b.studentName);
    }
    return 0;
  });

  return (
    <main className="applications-page">
      <ToolBar openSideBar={() => setSideBar(!sideBar)} sideBarState={sideBar} toolBarData={getToolBarData()} />
      <h2 className="page-title">View Applications</h2>

      <div className="sort-container">
        <label htmlFor="sort">Show by: </label>
        <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="most-recent">Most Recent</option>
          <option value="names">Names</option>
        </select>
      </div>

      <section className="applications-list">
        {loading ? (
          <p>Loading...</p>
        ) : sortedApplications.length === 0 ? (
          <p style={{ textAlign: "center", padding: "20px", color: "#666" }}>
            No pending applications found.
          </p>
        ) : (
          sortedApplications.map(app => (
            <div key={app.id} className="application-card">
              <div className="app-left">
                <div className="avatar-placeholder"></div>
                <p className="student-name">{app.studentName}</p>
              </div>
              <div className="app-center">
                <p className="submitted-at">{new Date(app.appliedAt).toLocaleString()}</p>
                <p className="course">{app.courseName}</p>
                <p className="grade">Grade: {app.grade}</p>
                <p className="status">Status: Pending</p>
              </div>
              <div className="app-right">
                <CheckIcon 
                  className="icon approve" 
                  onClick={() => handleApprove(app.id)}
                  title="Approve application"
                  style={{ cursor: "pointer" }}
                />
                <CloseIcon 
                  className="icon reject" 
                  onClick={() => handleReject(app.id)}
                  title="Reject application"
                  style={{ cursor: "pointer" }}
                />
              </div>
            </div>
          ))
        )}
      </section>

      <section className="unified-home-bottom-nav">
        <button className="unified-home-btn">
          <Link to={getHomeRoute()}><HomeIcon /></Link>
        </button>
      </section>
    </main>
  );
}
