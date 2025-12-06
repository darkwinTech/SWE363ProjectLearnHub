import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CourseCard({ course, index, onMutateCourse, isEditMode }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleCourseClick = () => {
    if (isEditMode) return; 
    const courseId = course.courseId || "";
    // Extract subject prefix - get all letters before any numbers or spaces
    const match = courseId.match(/^([A-Za-z]+)/);
    const subject = match ? match[1].toUpperCase() : courseId.split(" ")[0];
    navigate(`/courses/${subject}`);
  };

  const courseId = course.courseId || "";
  // Extract subject prefix - get all letters before any numbers or spaces
  const match = courseId.match(/^([A-Za-z]+)/);
  const subjectName = match ? match[1].toUpperCase() : courseId.split(" ")[0];
  const displayTitle = course.department || course.title || "";

  return (
    <article className="course-card" onClick={handleCourseClick} style={{ cursor: 'pointer' }}>
      <div className="cards_link_c">
      <header className="card-header">
        {course.icon && <span className="icon">{course.icon}</span>}
        <div>
          <h1 className="course-id">{subjectName}</h1>
          <h2 className="course-title">{displayTitle}</h2>
        </div>
      </header>
      </div>
    </article>
  );
}
