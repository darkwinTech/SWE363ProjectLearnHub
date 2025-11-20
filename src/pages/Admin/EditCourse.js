import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditCourse({ courses, setCourses }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const courseData = courses.find((c) => c.id === id);

  const [courseId, setCourseId] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (courseData) {
      setCourseId(courseData.id);
      setTitle(courseData.title);
    }
  }, [courseData]);

  if (!courseData) return <h1>Course Not Found</h1>;

  const handleSubmit = () => {
    const updated = courses.map((c) =>
      c.id === id
        ? {
            ...c,
            id: courseId,
            title: title,
          }
        : c
    );

    setCourses(updated);
    navigate("/"); 
  };

  return (
    <div className="edit-course-container">
      <h1 className="page-title">Edit Course</h1>

      <label className="input-label">Course</label>
      <input
        type="text"
        className="input-field"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />

      <label className="input-label">Title</label>
      <input
        type="text"
        className="input-field"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button className="save-btn" onClick={handleSubmit}>
        Edit Course
      </button>
    </div>
  );
}
