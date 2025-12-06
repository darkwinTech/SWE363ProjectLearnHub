import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from "react-router-dom";



export default function TutorSessions({ seesion, index, onMutateCourse, isEditMode }) {
  const [totre, settotre] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSessionClick = () => {
    if (isEditMode) return; 
    navigate("/apply-session", { state: { session: seesion } });
  };

  return (
    <article 
      className="Session-card" 
      onClick={handleSessionClick} 
      style={{ cursor: 'pointer' }}
      data-edit-mode={isEditMode ? "true" : "false"}
    >
      <div className="cards_link_s">
      <header className="cardHeader-session">
        <h2 className="session-title">{seesion.title}</h2>
        <h4 className="session-time">{new Date(seesion.dateTime).toLocaleTimeString([], {hour: "2-digit",minute: "2-digit",hour12: false})}</h4>
      </header>
      <div className="cardHeader-session-totr">
      <PersonIcon/>
      <h5>{seesion.tutorName}</h5>
      </div>
      </div>
    </article>
  );
}

