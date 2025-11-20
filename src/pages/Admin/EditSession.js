import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditSession({ sessions, setSessions }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const sessionData = sessions.find((s) => s.id === id);
  
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [overview, setOverview] = useState("");

  useEffect(() => {
    if (sessionData) {
      setDate(sessionData.date);
      setTime(sessionData.time);
      setOverview(sessionData.overview || "");
    }
  }, [sessionData]);

  if (!sessionData) return <h1>Session Not Found</h1>;

  // يمنع اختيار يوم قبل اليوم
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = () => {
    const updated = sessions.map((s) =>
      s.id === id
        ? {
            ...s,
            date,
            time,
            overview,
          }
        : s
    );

    setSessions(updated);

    navigate("/"); 
  };

  return (
    <div className="edit-session-container">
      <h1 className="page-title">Edit Session</h1>

      <label className="input-label">Course</label>
      <div className="readonly-box">{sessionData.id}</div>

      <label className="input-label">Tutor</label>
      <div className="readonly-box">{sessionData.totre}</div>

      <div className="date-time-row">

        <div className="date-box">
          <label className="input-label">Session Date</label>
          <input
            type="date"
            className="input-field"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="time-box">
          <label className="input-label">Session Time</label>
          <input
            type="time"
            className="input-field"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
      </div>

      <label className="input-label">Enter Course Overview</label>
      <textarea
        className="textarea"
        placeholder="Type here..."
        value={overview}
        onChange={(e) => setOverview(e.target.value)}
      />

      <button className="save-btn" onClick={handleSubmit}>
        Edit Session
      </button>
    </div>
  );
}
