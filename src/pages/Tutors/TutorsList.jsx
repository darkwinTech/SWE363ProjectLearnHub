import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import { getToolBarData } from "../../utils/getToolBarData";
import { getHomeRoute } from "../../utils/getHomeRoute";
import "./TutorsList.css";

// Sample tutors data with sessions - This should eventually come from a data file
const sampleTutorSessions = [
  {
    id: 1,
    tutorName: "Ahmad Alqarni",
    date: "19 Sep",
    time: "8:00PM",
    courseCode: "Math 201",
    sessionDesc: "Session: ch 2.4"
  },
  {
    id: 2,
    tutorName: "lama alghamdi",
    date: "19 Sep",
    time: "9:00PM",
    courseCode: "ICS 108",
    sessionDesc: "Session: Solving old exams"
  },
  {
    id: 3,
    tutorName: "Norh alharbie",
    date: "20 Sep",
    time: "3:00PM",
    courseCode: "ICS321",
    sessionDesc: "Session: ch 4"
  },
  {
    id: 4,
    tutorName: "Hayat Alghamdi",
    date: "6 Oct",
    time: "7:00PM",
    courseCode: "CHEM101",
    sessionDesc: "Session: ch 3.2"
  },
  {
    id: 5,
    tutorName: "Abdulaziz Alnufaie",
    date: "10 Oct",
    time: "8:00PM",
    courseCode: "Math 201",
    sessionDesc: "Session: ch 2.5"
  }
];

export default function TutorsList() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const toggleSideBar = () => setSideBar(prev => !prev);

  // Filter tutors by name
  const getFilteredTutors = (query, tutors) => {
    if (!query) {
      return tutors;
    }
    return tutors.filter(tutor =>
      tutor.tutorName.toLowerCase().includes(query.toLowerCase()) ||
      tutor.courseCode.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredTutors = getFilteredTutors(searchQuery, sampleTutorSessions);

  // Pagination logic
  const totalPages = Math.ceil(filteredTutors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTutors = filteredTutors.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTutorSessionClick = (tutor) => {
    // Transform tutor session data to match ApplySession expected format
    const sessionData = {
      id: tutor.courseCode,
      courseCode: tutor.courseCode,
      totre: `By ${tutor.tutorName}`,
      tutorName: tutor.tutorName,
      description: tutor.sessionDesc,
      sessionDesc: tutor.sessionDesc,
      time: tutor.time,
      date: tutor.date
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
                setCurrentPage(1); // Reset to first page on search
              }}
            />
          </div>
        </div>
      </div>

      <section className="tutors-list-content">
        {currentTutors.length > 0 ? (
          currentTutors.map((tutor) => (
            <div 
              key={tutor.id} 
              className="tutors-list-card"
              onClick={() => handleTutorSessionClick(tutor)}
              style={{ cursor: 'pointer' }}
            >
              <div className="tutors-list-card-left">
                <div className="tutors-list-avatar">
                  <PersonIcon className="tutors-list-avatar-icon" />
                </div>
                <p className="tutors-list-tutor-name">{tutor.tutorName}</p>
              </div>
              <div className="tutors-list-card-right">
                <p className="tutors-list-session-time">
                  {tutor.date} at {tutor.time}
                </p>
                <p className="tutors-list-course-code">{tutor.courseCode}</p>
                <p className="tutors-list-session-desc">{tutor.sessionDesc}</p>
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

