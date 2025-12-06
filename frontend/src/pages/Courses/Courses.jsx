import React, { useMemo, useState, useEffect } from "react";
import { useFavorites } from "../../data/state/useFavorites";
import { Link } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";

import "./Courses.css";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import { getHomeRoute } from "../../utils/getHomeRoute";

const API_BASE_URL = "http://localhost:5000/api";

export default function Courses() {
  const clike_sideBr = () => {
    setsideBar((prevState) => !prevState);
  };
  const [sideBar, setsideBar] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const userType = localStorage.getItem('userType');
  const isAdmin = userType === 'admin';

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

  // Get unique subject prefixes from courses
  const tags = useMemo(() => {
    const all = Array.from(
      new Set(
        courses.map((c) => {
          const courseId = c.courseId || "";
          return courseId.split(" ")[0];
        })
      )
    );
    return all.filter(Boolean).sort();
  }, [courses]);

  const [activeTag, setActiveTag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    let list = courses;
    if (activeTag) {
      list = list.filter((c) => {
        const courseId = c.courseId || "";
        return courseId.startsWith(activeTag);
      });
    }
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
  }, [activeTag, searchTerm, courses]);

  if (loading) {
    return (
      <main className="coursesWrap">
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
    <main className="coursesWrap">
      <ToolBar
        openSideBar={clike_sideBr}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />
      <header className="coursesTop">
        <div />
        <h2 className="greeting"></h2>
        <div />
      </header>

      <section className="coursesControls">
        {/* chips */}
        <div className="chipsRow">
          <button
            className={`chip ${activeTag === "" ? "chip--active" : ""}`}
            onClick={() => setActiveTag("")}
            title="All subjects"
          >
            <FilterListIcon className="chipIcon" />
            <span>All</span>
            {activeTag === "" && <CloseIcon className="chipClose" />}
          </button>

          {tags.map((tag) => (
            <button
              key={tag}
              className={`chip ${activeTag === tag ? "chip--active" : ""}`}
              onClick={() => setActiveTag(tag)}
              title={`Filter: ${tag}`}
            >
              <FilterListIcon className="chipIcon" />
              <span>{tag}</span>
              {activeTag === tag && <CloseIcon className="chipClose" />}
            </button>
          ))}
        </div>

        {/* centered search */}
        <div className="searchRow">
          <div className="searchPill">
            <SearchIcon className="searchIcon" />
            <input
              type="text"
              className="searchInput"
              placeholder="Search Course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* grid */}
      <section className="coursesGrid">
        {filtered.map((course) => {
          const courseId = course.courseId || "";
          const isFav = isCourseFavorited(courseId);
          return (
            <article key={course._id || courseId} className="courseCard">
              <div className="courseId">{courseId}</div>
              <div className="courseTitle">{course.title}</div>
              {course.description && (
                <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                  {course.description}
                </div>
              )}
              {course.department && (
                <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>
                  {course.department}
                </div>
              )}
              {!isAdmin && (
                <button
                  className={`heartBtn ${isFav ? "heart--active" : ""}`}
                  onClick={() => toggleCourseFavorite(courseId)}
                  aria-label={isFav ? "Unfavorite" : "Favorite"}
                  title={isFav ? "Unfavorite" : "Favorite"}
                >
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </button>
              )}
            </article>
          );
        })}

        {filtered.length === 0 && (
          <div className="emptyMsg">No courses match your search.</div>
        )}
      </section>

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
