import { useState } from "react";
import { sampleCourses } from "./data.js";
import { sampleSessions } from "./data2";
import CourseCard from "./components/CourseCard";
import ToturSesions from "./components/ToturSesions";
import ToolBar from "./components/ToolBar";
import EditSession from "./EditSession";
import EditCourse from "./EditCourse";
import MakeAnnouncement from "./MakeAnnouncement";
import ViewApplications from "./ViewApplications";
import Support from "./Support";


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

export default function Main() {
  const [courses, setCourses] = useState(sampleCourses);
  const [sessions, setSessions] = useState(sampleSessions);
  const [query, setQuery] = useState("");
  const [sideBar, setSideBar] = useState(false);

  const toggleSideBar = () => {
    setSideBar(prev => !prev);
  };

  const getFilteredCourses = (query, courses) => {
    if (!query) return courses;
    return courses.filter(
      course =>
        course.id.toLowerCase().includes(query.toLowerCase()) ||
        course.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredCourses = getFilteredCourses(query, courses);

  const HomePage = () => (
    <main className="wrap">
      <ToolBar openSideBar={toggleSideBar} sideBarState={sideBar} />

      <input
        id="searchBar"
        type="text"
        placeholder="Search Course/Tutor"
        onChange={e => setQuery(e.target.value)}
      />

      <div className="header-row">
        <h3>Recommended Courses:</h3>
        <button id="bt2">See More</button>
      </div>

      <section className="grid">
        {filteredCourses.map((course, idx) => (
          <CourseCard
            key={course.id}
            course={course}
            index={idx}
            onEdit={(c) => console.log("Edit course:", c)}
            onDelete={(c) => setCourses(prev => prev.filter(x => x.id !== c.id))}
          />
        ))}
      </section>

      <div className="header-row">
        <h3>Recommended Sessions:</h3>
        <button id="bt1">See More</button>
      </div>

      <section className="sessions">
        {sessions.map((session, idx) => (
          <ToturSesions
            key={session.id}
            session={session}
            index={idx}
            onEdit={(s) => console.log("Edit session:", s)}
            onDelete={(s) => setSessions(prev => prev.filter(x => x.id !== s.id))}
          />
        ))}
      </section>
    </main>
  );

  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={<HomePage />} />
  //       <Route path="/edit-session/:id" element={<EditSession sessions={sessions} setSessions={setSessions} />} />
  //       <Route path="/edit-course/:id" element={<EditCourse courses={courses} setCourses={setCourses} />} />
  //       <Route path="/make-announcement" element={<MakeAnnouncement />} />
  //       <Route path="/view-applications" element={<ViewApplications />} />
  //       <Route path="/support" element={<Support />} />
  //     </Routes>
  //   </Router>
  // );
}