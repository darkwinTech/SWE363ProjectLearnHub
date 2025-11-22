import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course, index, onMutateCourse, isEditMode }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleCourseClick = () => {
    if (isEditMode) return; // Don't navigate in edit mode
    // Extract subject from course ID (e.g., "SWE 353" -> "SWE")
    const subject = course.id.split(" ")[0];
    navigate(`/courses/${subject}`);
  };

  // Extract subject name (e.g., "SWE 353" -> "SWE", "MATH 201" -> "MATH")
  const subjectName = course.id.split(" ")[0];

  return (
    <article className="course-card" onClick={handleCourseClick} style={{ cursor: 'pointer' }}>
      <div className="cards_link_c">
      <header className="card-header">
        <span className="icon">{course.icon}</span>
        <div>
          <h1 className="course-id">{subjectName}</h1>
          <h2 className="course-title">{course.title}</h2>
        </div>
      </header>
      </div>
    </article>
  );
}