import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { getToolBarData } from "../../utils/getToolBarData";
import { getHomeRoute } from "../../utils/getHomeRoute";
import "./TutorsList.css";


export default function TutorsList() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sessions, setSession] = useState([]);
  const itemsPerPage = 5;

    useEffect(() => {
    const readSessions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/session/read-session", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          console.error("Failed to load sessions, status:", res.status);
          return;
        }
        const data = await res.json();
        const sessionsArray = Array.isArray(data) ? data : data.sessions || data.data || [];
  
        setSession(sessionsArray);
      } catch (err) {
        console.error("Error loading sessions:", err);
      }
    };
  
    readSessions();
  }, []);

  const formatTime = (dateTime) => {
  return new Date(dateTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

  const toggleSideBar = () => setSideBar(prev => !prev);

  const getFilteredTutors = (query, tutors) => {
    if (!query) {
      return tutors;
    }
    return tutors.filter(tutor =>
      tutor.tutorName.toLowerCase().includes(query.toLowerCase()) ||
      tutor.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredTutors = getFilteredTutors(searchQuery, sessions);

  const totalPages = Math.ceil(filteredTutors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTutors = filteredTutors.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTutorSessionClick = (tutor) => {
    const sessionData = {
      _id: tutor._id,
      title: tutor.title,
      totre: `By ${tutor.tutorName}`,
      tutorName: tutor.tutorName,
      description: tutor.description,
      sessionDesc: tutor.description,
      time: tutor.dateTime,
      courseId: tutor.courseId,
      courseCode: tutor.courseId?.courseId || tutor.title,
    };
    navigate("/apply-session", { state: { session: sessionData } });
  };

  return (
    <main className="tutors-list-wrap">
      <ToolBar
        openSideBar={toggleSideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />

      <div className="tutors-list-header">
        <div className="tutors-list-title-row">
          <h2 className="tutors-list-title">Tutors</h2>
          <div className="tutors-list-search-container">
            <SearchIcon className="tutors-list-search-icon" />
            <input
              type="text"
              className="tutors-list-search-input"
              placeholder="Search Tutor..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); 
              }}
            />
          </div>
        </div>
      </div>

      <section className="tutors-list-content">
        {currentTutors.length > 0 ? (
          currentTutors.map((sessions) => (
            <div 
              key={sessions._id} 
              className="tutors-list-card"
              onClick={() => handleTutorSessionClick(sessions)}
              style={{ cursor: 'pointer' }}
            >
              <div className="tutors-list-card-left">
                <div className="tutors-list-avatar">
                  <PersonIcon className="tutors-list-avatar-icon" />
                </div>
                <p className="tutors-list-tutor-name">{sessions.tutorName}</p>
              </div>
              <div className="tutors-list-card-right">
                <p className="tutors-list-session-time">
                  at {formatTime(sessions.dateTime)}
                </p>
                <p className="tutors-list-course-code">{sessions.title}</p>
                <p className="tutors-list-session-desc">{sessions.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="tutors-list-empty">
            <p>No tutors found matching your search.</p>
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="tutors-list-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`tutors-list-page-btn ${
                currentPage === page ? "tutors-list-page-btn-active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </div>
      )}

      {/* Home Icon at Bottom */}
      <div className="unified-home-bottom-nav">
        <button className="unified-home-btn">
          <Link to={getHomeRoute()}>
            <HomeIcon />
          </Link>
        </button>
      </div>
    </main>
  );
}

