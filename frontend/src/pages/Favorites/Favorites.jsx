import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Favorites.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import { getHomeRoute } from "../../utils/getHomeRoute";

const API_BASE_URL = "http://localhost:5000/api";

export default function Favorites() {
  const [sideBar, setSideBar] = useState(false);
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [favoriteTutors, setFavoriteTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  // Fetch favorites from backend
  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFavoriteCourses(data.favoriteCourses || []);
      setFavoriteTutors(data.favoriteTutors || []);
    } catch (err) {
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  };

  // Add course to favorites
  const addFavoriteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/favorites/courses/${courseId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFavoriteCourses(data.favoriteCourses || []);
    } catch (err) {
      console.error("Error adding favorite course:", err);
    }
  };

  // Remove course from favorites
  const removeFavoriteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/favorites/courses/${courseId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFavoriteCourses(data.favoriteCourses || []);
    } catch (err) {
      console.error("Error removing favorite course:", err);
    }
  };

  // Add tutor to favorites
  const addFavoriteTutor = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/favorites/tutors/${studentId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFavoriteTutors(data.favoriteTutors || []);
    } catch (err) {
      console.error("Error adding favorite tutor:", err);
    }
  };

  // Remove tutor from favorites
  const removeFavoriteTutor = async (studentId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE_URL}/favorites/tutors/${studentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setFavoriteTutors(data.favoriteTutors || []);
    } catch (err) {
      console.error("Error removing favorite tutor:", err);
    }
  };

  // Check if course is favorited
  const isCourseFavorited = (courseId) => {
    return favoriteCourses.some((course) => course.courseId === courseId);
  };

  // Check if tutor is favorited
  const isTutorFavorited = (tutorId) => {
    return favoriteTutors.some((tutor) => tutor._id === tutorId || tutor.studentId === tutorId);
  };

  // Toggle course favorite
  const toggleCourseFavorite = (courseId) => {
    if (isCourseFavorited(courseId)) {
      removeFavoriteCourse(courseId);
    } else {
      addFavoriteCourse(courseId);
    }
  };

  // Toggle tutor favorite
  const toggleTutorFavorite = (studentId) => {
    if (isTutorFavorited(studentId)) {
      removeFavoriteTutor(studentId);
    } else {
      addFavoriteTutor(studentId);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <main className="fav-wrap">
        <ToolBar
          openSideBar={click_sideBar}
          sideBarState={sideBar}
          toolBarData={getToolBarData()}
        />
        <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
      </main>
    );
  }

  return (
    <main className="fav-wrap">
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />
      <header className="fav-top">
        <h2 className="fav-title">My Favorites</h2>
      </header>

      {/* Favorite Courses */}
      <section className="fav-section">
        <div className="fav-rowhead">
          <h3>Favorite Courses</h3>
        </div>

        <div className="fav-grid">
          {favoriteCourses.length === 0 && (
            <div className="fav-empty">You haven't added any favorite courses yet.</div>
          )}

          {favoriteCourses.map((course) => {
            const isFav = isCourseFavorited(course.courseId);
            return (
              <article key={course._id || course.courseId} className="fav-card">
                <div className="fav-card-id">{course.courseId}</div>
                <div className="fav-card-title">{course.title}</div>
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
                <button
                  className={`fav-heart ${isFav ? "is-active" : ""}`}
                  onClick={() => toggleCourseFavorite(course.courseId)}
                  title={isFav ? "Unfavorite" : "Favorite"}
                >
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Favorite Tutors */}
      <section className="fav-section">
        <div className="fav-rowhead">
          <h3>Favorite Tutors</h3>
        </div>

        <div className="fav-grid">
          {favoriteTutors.length === 0 && (
            <div className="fav-empty">You haven't added any favorite tutors yet.</div>
          )}

          {favoriteTutors.map((tutor) => {
            const tutorId = tutor._id || tutor.studentId;
            const isFav = isTutorFavorited(tutorId);
            return (
              <article key={tutor._id || tutor.studentId} className="fav-card">
                <div className="fav-card-id">{tutor.name || "Unknown Tutor"}</div>
                {tutor.studentId && (
                  <div className="fav-card-title">ID: {tutor.studentId}</div>
                )}
                {tutor.major && (
                  <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "4px" }}>
                    Major: {tutor.major}
                  </div>
                )}
                {tutor.college && (
                  <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "2px" }}>
                    {tutor.college}
                  </div>
                )}
                <button
                  className={`fav-heart ${isFav ? "is-active" : ""}`}
                  onClick={() => toggleTutorFavorite(tutor.studentId || tutorId)}
                  title={isFav ? "Unfavorite" : "Favorite"}
                >
                  {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </button>
              </article>
            );
          })}
        </div>
      </section>

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
