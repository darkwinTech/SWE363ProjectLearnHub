import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ToturSesions({ session, onEdit, onDelete, editMode = false }) {
    const navigate = useNavigate();
    const [showConfirm, setShowConfirm] = useState(false);

    const handleConfirmDelete = () => {
        onDelete(session);
        setShowConfirm(false);
    };

    return (
        <>
        <article className="Session-card">
            {/* Header: Course Name + Time + Actions */}
            <div className="cardHeader-session">
                <h3 className="session-title">{session.id}</h3>
                <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
                    <p className="session-time" style={{ margin: 0 }}>{session.time}</p>
                    {editMode && (
                      <>
                        <EditIcon
                            style={{ cursor: "pointer", color: "white" }}
                            onClick={() => navigate(`/admin/edit-session/${session.id}`)}
                        />
                        <DeleteIcon
                            style={{ cursor: "pointer", color: "white" }}
                            onClick={() => setShowConfirm(true)}
                        />
                      </>
                    )}
                </div>
            </div>

            {/* Tutor Name */}
            <div className="cardHeader-session-totr">
                <span>{session.totre}</span>
            </div>
        </article>

        {/* Confirm Delete Overlay */}
        {showConfirm && (
            <div className="confirm-overlay">
                <div className="confirm-box">
                    <h3>Delete Session?</h3>
                    <p>Are you sure you want to delete this session?</p>
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
