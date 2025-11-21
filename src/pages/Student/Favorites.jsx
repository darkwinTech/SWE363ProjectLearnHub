import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../Favorites/Favorites.css";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";

import { courses } from "../../data/courses";
import { useFavorites } from "../../data/state/useFavorites"; //
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import { useState } from "react";
import { getHomeRoute } from "../../utils/getHomeRoute";



const tutors = [
  { id: "tutor_ahmad", name: "Ahmad Alghamdi" },
  { id: "tutor_2", name: "Tutor 2" },
  { id: "tutor_3", name: "Tutor 3" },
  { id: "tutor_4", name: "Tutor 4" },
];

export default function StudentFavorites() {
  const clike_sideBr=()=>{
    setsideBar((prevState)=>!prevState)
  }
  const [sideBar,setsideBar]=useState(false)
  const courseFav = useFavorites("courses");
  const tutorFav = useFavorites("tutors");

  const favoriteCourses = useMemo(
    () => courses.filter((c) => courseFav.isFav(c.id)),
    [courseFav, courses]
  );

  const favoriteTutors = useMemo(
    () => tutors.filter((t) => tutorFav.isFav(t.id)),
    [tutorFav]
  );

  return (
    <main className="fav-wrap">
      <ToolBar
        openSideBar={clike_sideBr}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
        />
      <header className="fav-top">
        <h2 className="fav-title"></h2>
      </header>

      {/* Favorite Courses */}
      <section className="fav-section">
        <div className="fav-rowhead">
          <h3>Favorite Courses</h3>
          <button className="fav-more">
            <span className="fav-more-dots">•••</span> More
          </button>
        </div>

        <div className="fav-grid">
          {favoriteCourses.length === 0 && (
            <div className="fav-empty">You haven't added any favorite courses yet.</div>
          )}

          {favoriteCourses.map((course) => {
            const fav = courseFav.isFav(course.id);
            return (
              <article key={course.id} className="fav-card">
                <div className="fav-card-icon">{course.icon}</div>
                <div className="fav-card-id">{course.id}</div>
                <div className="fav-card-title">{course.title}</div>
                <button
                  className={`fav-heart ${fav ? "is-active" : ""}`}
                  onClick={() => courseFav.toggleFav(course.id)}
                  title={fav ? "Unfavorite" : "Favorite"}
                >
                  {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
          <button className="fav-more">
            <span className="fav-more-dots">•••</span> More
          </button>
        </div>

        <div className="fav-grid">
          {favoriteTutors.length === 0 && (
            <div className="fav-empty">You haven't added any favorite tutors yet.</div>
          )}

          {favoriteTutors.map((tutor) => {
            const fav = tutorFav.isFav(tutor.id);
            return (
              <article key={tutor.id} className="fav-card">
                <div className="fav-card-id">{tutor.name}</div>
                <button
                  className={`fav-heart ${fav ? "is-active" : ""}`}
                  onClick={() => tutorFav.toggleFav(tutor.id)}
                  title={fav ? "Unfavorite" : "Favorite"}
                >
                  {fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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

