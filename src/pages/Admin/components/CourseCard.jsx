import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CourseCard({ course, onDelete }) { 
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false); 

  const handleConfirmDelete = () => { 
      onDelete(course);
      setShowConfirm(false);
  };

  return (
    <>
    <article className="course-card">
      {/* Header: Course Icon + Name + Actions */}
      <div className="cardHeader-session">
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span>{course.icon}</span>
          <div>
            <h3 className="session-title">{course.id}</h3>
            <p style={{ margin: 0, fontWeight: 500 }}>{course.title}</p>
          </div>
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
          <EditIcon 
            style={{ cursor: "pointer", color: "#054727" }} 
            onClick={() => navigate(`/edit-course/${course.id}`)}
          />
          <DeleteIcon 
            style={{ cursor: "pointer", color: "#054727" }}
            onClick={() => setShowConfirm(true)}
          />
        </div>
      </div>
    </article>

    {/* Confirm Delete Overlay */}
    {showConfirm && (
        <div className="confirm-overlay">
            <div className="confirm-box">
                <h3>Delete Course?</h3>
                <p>Are you sure you want to delete this course?</p>

                <div className="confirm-actions">
                    <button className="cancel-btn" onClick={() => setShowConfirm(false)}>Cancel</button>
                    <button className="delete-btn" onClick={handleConfirmDelete}>Delete</button>
                </div>
            </div>
        </div>
    )}
    </>
  );
}
