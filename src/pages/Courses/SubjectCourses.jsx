import React, { useState, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFavorites } from "../../data/state/useFavorites";
import { courses } from "../../data/courses";
import ToolBar from "../../components/ToolBar";
import { toolBarData } from "../../data/toolBarData_student";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import { getHomeRoute } from "../../utils/getHomeRoute";
import "./SubjectCourses.css";

export default function SubjectCourses() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const courseFav = useFavorites("courses");

  const clike_sideBr = () => {
    setSideBar((prevState) => !prevState);
  };

  // Get subject icon - default to CalculateIcon for MATH
  const getSubjectIcon = () => {
    return <CalculateIcon />;
  };

  // Filter courses by subject and search term
  const filteredCourses = useMemo(() => {
    let list = courses.filter((c) => {
      const courseSubject = c.id.split(" ")[0];
      return courseSubject.toUpperCase() === subject?.toUpperCase();
    });

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
      );
    }

    return list;
  }, [subject, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="subject-courses-wrap">
      <ToolBar
        openSideBar={clike_sideBr}
        sideBarState={sideBar}
        toolBarData={toolBarData}
      />

      <header className="subject-courses-header">
        <div className="subject-courses-greeting">
          <h2>Hi, User</h2>
        </div>
        <div className="subject-courses-subject">
          <span className="subject-icon">{getSubjectIcon()}</span>
          <span className="subject-name">{subject?.toUpperCase()}</span>
        </div>
      </header>

      <section className="subject-courses-search">
        <div className="subject-search-pill">
          <SearchIcon className="subject-search-icon" />
          <input
            type="text"
            className="subject-search-input"
            placeholder="Search Course..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </section>

      <section className="subject-courses-grid">
        {paginatedCourses.length > 0 ? (
          paginatedCourses.map((course) => {
            const isFav = courseFav.isFav(course.id);
            return (
              <article key={course.id} className="subject-course-card">
                <div className="subject-course-code">{course.id}</div>
                <button
                  className={`subject-heart-btn ${isFav ? "heart--active" : ""}`}
                  onClick={() => courseFav.toggleFav(course.id)}
                  aria-label={isFav ? "Unfavorite" : "Favorite"}
                  title={isFav ? "Unfavorite" : "Favorite"}
                >
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </button>
              </article>
            );
          })
        ) : (
          <div className="subject-empty-msg">No courses found for {subject}.</div>
        )}
      </section>

      {totalPages > 1 && (
        <section className="subject-pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`subject-page-btn ${
                currentPage === page ? "page--active" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
        </section>
      )}

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

