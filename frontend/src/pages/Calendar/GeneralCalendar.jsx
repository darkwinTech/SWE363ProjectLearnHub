import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { getHomeRoute } from "../../utils/getHomeRoute";
import "./GeneralCalendar.css";


const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

// Available time slots
const availableTimes = [
  "6:00AM", "7:00AM", "8:00AM", "9:00AM", "10:00AM", "11:00AM",
  "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM",
  "6:00PM", "7:00PM", "8:00PM", "9:00PM", "10:00PM", "11:00PM"
];

const STORAGE_KEY = "tutor_sessions";

const getEarliestSessionDate = (sessions) => {
  if (!sessions || sessions.length === 0) {
    return { date: new Date(2025, 0, 1), selected: 1 };
  }

  const sessionDates = sessions.map(session => ({
    year: session.year,
    month: session.month,
    date: parseInt(session.date),
    session: session
  }));

  sessionDates.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    if (a.month !== b.month) return a.month - b.month;
    return a.date - b.date;
  });

  const earliest = sessionDates[0];
  return {
    date: new Date(earliest.year, earliest.month, earliest.date),
    selected: earliest.date
  };
};

export default function GeneralCalendar() {
  const [sideBar, setSideBar] = useState(false);
  const [allSessions, setAllSessions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [deletingSession, setDeletingSession] = useState(null);
  const [formData, setFormData] = useState({
    time: "",
    courseCode: "",
    sessionDesc: ""
  });
  const navigate = useNavigate();
  const userType = localStorage.getItem('userType');
  const currentTutorName = "Fatima Al-Rashid";

useEffect(() => {
  const readSessions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/session/read-session", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.error("Failed to load sessions, status:", res.status);
        return;
      }
      const data = await res.json();
      const sessionsArray = Array.isArray(data) ? data : data.sessions || data.data || [];
      // here i am changing how my data is orderd in the backend to match the calander format
      //i am also splitting the dateTime object to allow my orgainal frontend calander to gropy by date
      const mapped = sessionsArray.map((s) => {
        const dt = new Date(s.dateTime);
        return {
          _id: s._id,
          tutorName: s.tutorName,
          date: String(dt.getDate()),
          month: dt.getMonth(),
          year: dt.getFullYear(),
          time: dt.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          courseCode: s.courseId?.courseId || s.title,
          sessionDesc: s.description,
          courseId: s.courseId,
          title: s.title,
          description: s.description,
        };
      });
      setAllSessions(mapped);

      if (mapped.length > 0) {
        const earliest = getEarliestSessionDate(mapped);
        setCurrentDate(earliest.date);
        setSelectedDate(earliest.selected);
      }
    } catch (err) {
      console.error("Error loading sessions:", err);
    }
  };
  readSessions();
}, []);


  const saveSessions = (sessions) => {
    const tutorSessions = sessions.filter(s => s.createdBy === currentTutorName);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tutorSessions));
  };

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleMoreClick = () => {
    navigate("/tutors-list");
  };

  const handleSessionClick = (session) => {
    const sessionData = {
      _id: session._id,
      courseCode: session.courseCode,
      courseId: session.courseId,
      id: session.courseCode,
      tutorName: session.tutorName,
      totre: `By ${session.tutorName}`,
      description: session.sessionDesc || session.description,
      sessionDesc: session.sessionDesc || session.description,
      time: session.time,
      date: session.date,
      month: session.month,
      year: session.year,
      title: session.title
    };
    navigate("/apply-session", { state: { session: sessionData } });
  };

  const getSessionsForDate = () => {
    return allSessions.filter(
      (session) =>
        parseInt(session.date) === selectedDate &&
        session.month === currentDate.getMonth() &&
        session.year === currentDate.getFullYear()
    );
  };

  const getAvailableTimes = () => {
    const sessionsForDate = getSessionsForDate();
    const bookedTimes = sessionsForDate.map(s => s.time);
    return availableTimes.filter(time => !bookedTimes.includes(time));
  };

  // Handle add session
  const handleAddSession = () => {
    setEditingSession(null);
    setFormData({ time: "", courseCode: "", sessionDesc: "" });
    setShowAddModal(true);
  };

  // Handle edit session
  const handleEditSession = (session, e) => {
    e.stopPropagation();
    setEditingSession(session);
    setFormData({
      time: session.time,
      courseCode: session.courseCode,
      sessionDesc: session.sessionDesc
    });
    setShowAddModal(true);
  };

  // Handle delete session
  const handleDeleteSession = (session, e) => {
    e.stopPropagation();
    setDeletingSession(session);
  };

  const handleConfirmDeleteSession = async  () => {
    if(!deletingSession) return;
    try {
    const res = await fetch("http://localhost:5000/api/session/admin-delete-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deletingSession._id }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to delete session.");
    }
    //the old UI delete way i will delete it after i load the data (do not forget)
      const updatedSessions = allSessions.filter(s => s.id !== deletingSession.id);
      setAllSessions(updatedSessions);
      saveSessions(updatedSessions);
      setDeletingSession(null);
      alert("Session deleted successfully");
      }
      catch(err){
      console.error("Error deleting sessions:", err);
      }
  };
  const handleCancelDeleteSession = () => {
    setDeletingSession(null);
  };

  // Handle form submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.time || !formData.courseCode || !formData.sessionDesc) {
      alert("Please fill in all fields");
      return;
    }

    if (editingSession) {
      // Update existing session
      const updatedSessions = allSessions.map(s => 
        s.id === editingSession.id 
          ? { ...s, ...formData }
          : s
      );
      setAllSessions(updatedSessions);
      saveSessions(updatedSessions);
    } else {
      // Add new session
      const newSession = {
        id: Date.now(),
        tutorName: currentTutorName,
        date: selectedDate.toString(),
        month: currentDate.getMonth(),
        year: currentDate.getFullYear(),
        time: formData.time,
        courseCode: formData.courseCode,
        sessionDesc: formData.sessionDesc,
        createdBy: currentTutorName
      };
      const updatedSessions = [...allSessions, newSession];
      setAllSessions(updatedSessions);
      saveSessions(updatedSessions);
    }

    setShowAddModal(false);
    setFormData({ time: "", courseCode: "", sessionDesc: "" });
    setEditingSession(null);
  };

  // Check if session belongs to current tutor
  const isTutorSession = (session) => {
    return session.createdBy === currentTutorName || 
           (userType === 'tutor' && !session.createdBy && session.tutorName === currentTutorName);
  };

  // Generate calendar days
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = getCalendarDays();
  const sessionsForSelectedDate = getSessionsForDate();

  return (
    <main className="general-calendar-wrap">
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />

      <header className="general-calendar-header">
        <h1 className="general-calendar-title">General Calendar</h1>
      </header>

      <section className="calendar-container">
        <div className="calendar-header">
          <button className="calendar-nav-btn" onClick={handlePrevMonth}>
            <ArrowBackIosIcon />
          </button>
          <h3 className="calendar-month-year">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button className="calendar-nav-btn" onClick={handleNextMonth}>
            <ArrowForwardIosIcon />
          </button>
        </div>

        <div className="calendar-days-header">
          {dayNames.map((day) => (
            <div key={day} className="calendar-day-name">
              {day}
            </div>
          ))}
        </div>

        <div className="calendar-grid">
          {calendarDays.map((day, index) => {
            if (day === null) {
              return <div key={`empty-${index}`} className="calendar-day-empty"></div>;
            }
            const isSelected = day === selectedDate;
            return (
              <button
                key={day}
                className={`calendar-day ${isSelected ? "calendar-day-selected" : ""}`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </button>
            );
          })}
        </div>
      </section>

      <section className="calendar-sessions">
        {userType === 'tutor' && (
          <button className="calendar-add-session-btn" onClick={handleAddSession}>
            <AddIcon />
            <span>Add Session</span>
          </button>
        )}
        {sessionsForSelectedDate.length > 0 ? (
          sessionsForSelectedDate.map((session) => (
            <article 
              key={session.id} 
              className="calendar-session-card"
              onClick={() => handleSessionClick(session)}
              style={{ cursor: 'pointer' }}
            >
              <div className="calendar-session-tutor">
                <div className="calendar-tutor-icon">
                  <PersonIcon />
                </div>
                <p className="calendar-tutor-name">{session.tutorName}</p>
              </div>
              <div className="calendar-session-details">
                <p className="calendar-session-date-time">
                  {session.date} {monthNames[session.month].substring(0, 3).toLowerCase()} at {session.time}
                </p>
                <p className="calendar-session-course">{session.courseCode}</p>
                <p className="calendar-session-desc">{session.sessionDesc}</p>
              </div>
              {(userType === 'admin' || (userType === 'tutor' && isTutorSession(session))) && (
                <div className="calendar-session-actions" onClick={(e) => e.stopPropagation()}>
                  <button 
                    className="calendar-edit-btn"
                    onClick={(e) => handleEditSession(session, e)}
                    title="Edit session"
                  >
                    <EditIcon />
                  </button>
                  <button 
                    className="calendar-delete-btn"
                    onClick={(e) => handleDeleteSession(session, e)}
                    title="Delete session"
                  >
                    <DeleteIcon />
                  </button>
                </div>
              )}
            </article>
          ))
        ) : (
          <div className="calendar-no-sessions">
            <p>No sessions scheduled for this date</p>
          </div>
        )}
      </section>

      {/* Delete Confirmation Modal */}
      {deletingSession && (
        <div className="calendar-delete-modal-overlay" onClick={handleCancelDeleteSession}>
          <div className="calendar-delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-delete-modal-content">
              <h2 className="calendar-delete-modal-title">Delete Session</h2>
              <p className="calendar-delete-modal-message">
                Are you sure you want to delete "{deletingSession.courseCode}" session?
              </p>
              
              <div className="calendar-delete-modal-buttons">
                <button className="calendar-delete-modal-cancel-btn" onClick={handleCancelDeleteSession}>
                  Cancel
                </button>
                <button className="calendar-delete-modal-confirm-btn" onClick={handleConfirmDeleteSession}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Session Modal */}
      {showAddModal && (
        <div className="calendar-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="calendar-modal" onClick={(e) => e.stopPropagation()}>
            <div className="calendar-modal-header">
              <h3>{editingSession ? "Edit Session" : "Add New Session"}</h3>
              <button className="calendar-modal-close" onClick={() => setShowAddModal(false)}>
                <CloseIcon />
              </button>
            </div>
            <form className="calendar-modal-form" onSubmit={handleFormSubmit}>
              <div className="calendar-modal-field">
                <label>Date</label>
                <input 
                  type="text" 
                  value={`${selectedDate} ${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                  disabled
                />
              </div>
              <div className="calendar-modal-field">
                <label>Time *</label>
                <select 
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  required
                >
                  <option value="">Select time</option>
                  {(editingSession ? availableTimes : getAvailableTimes()).map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              <div className="calendar-modal-field">
                <label>Course Code *</label>
                <input 
                  type="text"
                  value={formData.courseCode}
                  onChange={(e) => setFormData({...formData, courseCode: e.target.value})}
                  placeholder="e.g., Math 101"
                  required
                />
              </div>
              <div className="calendar-modal-field">
                <label>Session Title/Description *</label>
                <textarea
                  value={formData.sessionDesc}
                  onChange={(e) => setFormData({...formData, sessionDesc: e.target.value})}
                  placeholder="e.g., Session: ch 2.4"
                  rows="3"
                  required
                />
              </div>
              <div className="calendar-modal-actions">
                <button type="button" className="calendar-modal-cancel" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="calendar-modal-submit">
                  {editingSession ? "Update" : "Add"} Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <section className="calendar-bottom-nav">
        <button className="calendar-more-btn" onClick={handleMoreClick}>
          <MoreVertIcon />
          <span>More</span>
        </button>
        <button className="unified-home-btn">
          <Link to={getHomeRoute()}>
            <HomeIcon />
          </Link>
        </button>
      </section>
    </main>
  );
}

