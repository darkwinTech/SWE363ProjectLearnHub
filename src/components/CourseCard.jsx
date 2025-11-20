import { useState } from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course, index, onMutateCourse }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  return (
    <article className="course-card">
      <Link to={course.link} className="cards_link_c">
      <header className="card-header">
        <span className="icon">{course.icon}</span>
        <div>
          <h1 className="course-id">{course.id}</h1>
          <h2 className="course-title">{course.title}</h2>
        </div>
      </header>
      </Link>
    </article>
  );
}