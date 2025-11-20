import { announcementCourses, announcementLevels } from "./data3";
import { useState } from "react";
import ToolBar from "./components/ToolBar";


export default function MakeAnnouncement() {

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const [sideBar, setSideBar] = useState(false);


  return (
    <main className="mic-announcement">
      <ToolBar openSideBar={() => setSideBar(!sideBar)} sideBarState={sideBar} />

      <h2 className="pageTitle">Make Announcement</h2>

      <div className="form-section">

        <label>Course</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">Select Course</option>
          {announcementCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.id}
            </option>
          ))}
        </select>

        {/* LEVEL DROPDOWN */}
        <label>Students Level</label>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="">Select Level</option>
          {announcementLevels.map((level) => (
            <option key={level.id} value={level.id}>
              {level.title}
            </option>
          ))}
        </select>

        {/* ANNOUNCEMENT */}
        <label>New Announcement</label>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          placeholder="Write your announcement..."
        />

        <button className="main-btn">Send</button>
      </div>
    </main>
  );
}
