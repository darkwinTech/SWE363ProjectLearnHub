import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import { Link } from "react-router-dom";



export default function ToturSesions({ seesion, index, onMutateCourse }) {
  const [totre, settotre] = useState("");
  const [date, setDate] = useState("");
  return (
    <article className="Session-card">
      <Link to={seesion.link} className="cards_link_s">
      <header className="cardHeader-session">
        <h2 className="session-title">{seesion.id}</h2>
        <h4 className="session-time">{seesion.time}</h4>
      </header>
      <div className="cardHeader-session-totr">
      <PersonIcon/>
      <h5>{seesion.totre}</h5>
      </div>
      </Link>
    </article>
  );
}