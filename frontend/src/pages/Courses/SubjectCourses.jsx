import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useFavorites } from "../../data/state/useFavorites";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import CalculateIcon from "@mui/icons-material/Calculate";
import { getHomeRoute } from "../../utils/getHomeRoute";
import "./SubjectCourses.css";

const API_BASE_URL = "http://localhost:5000/api";

export default function SubjectCourses() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [courses, setCourses] = useState([]);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;
  const userType = localStorage.getItem('userType');
  const isAdmin = userType === 'admin';

  const clike_sideBr = () => {
    setSideBar((prevState) => !prevState);
  };

  // Fetch courses from backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/courses`);
        const data = await res.json();
        setCourses(data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fetch user's favorites (only for non-admin users)
  useEffect(() => {
    if (isAdmin) return;

    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/favorites`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setFavoriteCourses(data.favoriteCourses || []);
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, [isAdmin]);

  // Check if course is favorited
  const isCourseFavorited = (courseId) => {
    return favoriteCourses.some((course) => course.courseId === courseId);
  };

  // Toggle course favorite
  const toggleCourseFavorite = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const isFav = isCourseFavorited(courseId);
      const method = isFav ? "DELETE" : "POST";
      const res = await fetch(`${API_BASE_URL}/favorites/courses/${courseId}`, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFavoriteCourses(data.favoriteCourses || []);
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  const getSubjectIcon = () => {
    return <CalculateIcon />;
  };

  const filteredCourses = useMemo(() => {
    let list = courses.filter((c) => {
      const courseId = c.courseId || "";
      // Extract subject prefix - get all letters before any numbers or spaces
      const match = courseId.match(/^([A-Za-z]+)/);
      const courseSubject = match ? match[1].toUpperCase() : courseId.split(" ")[0].toUpperCase();
      return courseSubject === subject?.toUpperCase();
    });

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (c) =>
          c.courseId?.toLowerCase().includes(q) ||
          c.title?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [subject, searchTerm, courses]);

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

  if (loading) {
    return (
      <main className="subject-courses-wrap">
        <ToolBar
          openSideBar={clike_sideBr}
          sideBarState={sideBar}
          toolBarData={getToolBarData()}
        />
        <div style={{ padding: "20px", textAlign: "center" }}>Loading courses...</div>
      </main>
    );
  }

  return (
    <main className="subject-courses-wrap">
      <ToolBar
        openSideBar={clike_sideBr}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />

      <header className="subject-courses-header">
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
            const courseId = course.courseId || "";
            const isFav = isCourseFavorited(courseId);
            return (
              <article key={course._id || courseId} className="subject-course-card">
                <div className="subject-course-code">{courseId}</div>
                {!isAdmin && (
                  <button
                    className={`subject-heart-btn ${isFav ? "heart--active" : ""}`}
                    onClick={() => toggleCourseFavorite(courseId)}
                    aria-label={isFav ? "Unfavorite" : "Favorite"}
                    title={isFav ? "Unfavorite" : "Favorite"}
                  >
                    {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </button>
                )}
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
