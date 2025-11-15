import { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';



export default function ToturSesions({ seesion, index, onMutateCourse }) {
  const [totre, settotre] = useState("");
  const [date, setDate] = useState("");
  return (
    <article className="Session-card">
      <header className="cardHeader-session">
        <h2>{seesion.id}</h2>
        <h2>{seesion.time}</h2>
      </header>
      <div className="cardHeader-session-totr">
      <PersonIcon/>
      <h3>{seesion.totre}</h3>
      </div>
    </article>
  );
}