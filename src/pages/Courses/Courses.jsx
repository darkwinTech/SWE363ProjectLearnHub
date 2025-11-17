import React, { useMemo, useState } from "react";
import { useFavorites } from "../../data/state/useFavorites";

import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { courses } from "../../data/courses";
import "./Courses.css";

export default function Courses() {
  // ---- tags (alphabetical) ----
  const tags = useMemo(() => {
    const all = Array.from(new Set(courses.map((c) => c.id.split(" ")[0])));
    return all.sort();
  }, []);

  // ---- filters/search ----
  const [activeTag, setActiveTag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // ---- favorites via localStorage (shared with /favorites) ----
  const courseFav = useFavorites("courses"); // keys: FAV_COURSES

  const filtered = useMemo(() => {
    let list = courses;
    if (activeTag) list = list.filter((c) => c.id.startsWith(activeTag));
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (c) => c.id.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTag, searchTerm]);

  return (
    <main className="coursesWrap">
      <header className="coursesTop">
        <div />
        <h2 className="greeting">Hi, User</h2>
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
          const isFav = courseFav.isFav(course.id);
          return (
            <article key={course.id} className="courseCard">
              <div className="courseIcon">{course.icon}</div>
              <div className="courseId">{course.id}</div>
              <div className="courseTitle">{course.title}</div>
              <button
                className={`heartBtn ${isFav ? "heart--active" : ""}`}
                onClick={() => courseFav.toggleFav(course.id)}
                aria-label={isFav ? "Unfavorite" : "Favorite"}
                title={isFav ? "Unfavorite" : "Favorite"}
              >
                {isFav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </button>
            </article>
          );
        })}

        {filtered.length === 0 && (
          <div className="emptyMsg">No courses match your search.</div>
        )}
      </section>
    </main>
  );
}
