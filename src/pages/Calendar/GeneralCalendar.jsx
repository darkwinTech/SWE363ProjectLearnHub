import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { toolBarData } from "../../data/toolBarData_student";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { getHomeRoute } from "../../utils/getHomeRoute";
import "./GeneralCalendar.css";

// Sample sessions data with dates
const sampleSessions = [
  {
    id: 1,
    tutorName: "Ahmad alghamdi",
    date: "19",
    month: 8, // September (0-indexed, so 8 = September)
    year: 2021,
    time: "8:00PM",
    courseCode: "Math 101",
    sessionDesc: "Session: ch 2.4"
  },
  {
    id: 2,
    tutorName: "Ghada alghamdi",
    date: "19",
    month: 8,
    year: 2021,
    time: "9:00PM",
    courseCode: "ICS 108",
    sessionDesc: "Session: solving old exams"
  },
  {
    id: 3,
    tutorName: "Mohamed alzhrane",
    date: "20",
    month: 8,
    year: 2021,
    time: "6:00PM",
    courseCode: "SWE 353",
    sessionDesc: "Session: Web Development"
  },
  {
    id: 4,
    tutorName: "Norah alghamdi",
    date: "25",
    month: 8,
    year: 2021,
    time: "7:00PM",
    courseCode: "ICS 104",
    sessionDesc: "Session: Python Basics"
  }
];

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function GeneralCalendar() {
  const [sideBar, setSideBar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date(2021, 8, 19)); // September 2021
  const [selectedDate, setSelectedDate] = useState(19);
  const navigate = useNavigate();

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
    // Transform session data to match ApplySession expected format
    const sessionData = {
      id: session.courseCode,
      totre: `By ${session.tutorName}`,
      description: session.sessionDesc,
      time: session.time,
      date: session.date,
      month: session.month,
      year: session.year
    };
    navigate("/apply-session", { state: { session: sessionData } });
  };

  // Get sessions for selected date
  const getSessionsForDate = () => {
    return sampleSessions.filter(
      (session) =>
        parseInt(session.date) === selectedDate &&
        session.month === currentDate.getMonth() &&
        session.year === currentDate.getFullYear()
    );
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
        toolBarData={toolBarData}
      />

      <header className="general-calendar-header">
        <h1 className="general-calendar-title">General Calendar</h1>
        <div className="general-calendar-greeting">
          <h2>Hi, User</h2>
        </div>
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
            </article>
          ))
        ) : (
          <div className="calendar-no-sessions">
            <p>No sessions scheduled for this date</p>
          </div>
        )}
      </section>

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

