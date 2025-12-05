
import { useState,useEffect } from "react";
import { sampleCourses } from "../../data/data";
import { sampleSessions} from "../../data/data2";
import CourseCard from "../../components/CourseCard";
import TutorSessions from "../Sessions/TutorSessions";
import ToolBar from "../../components/ToolBar";
import "../../index.css";
import "../../Main_profiles.css";
import SearchIcon from '@mui/icons-material/Search';
import {toolBarData} from "../../data/toolBarData_Tutor";
import { useNavigate } from "react-router-dom";


export default function TutorHome() {
  const [courses, setCourses] = useState(sampleCourses);
  const [sessions, setSession] = useState([]);
  const [qurey,setQurey]=useState(" ")
  const [sideBar,setsideBar]=useState(false)

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
  
        setSession(sessionsArray);
      } catch (err) {
        console.error("Error loading sessions:", err);
      }
    };
  
    readSessions();
  }, []);

  const navigate = useNavigate();
  const See_More = () => {
    navigate("/Courses");
  };
  const See_More2 = () => {
    navigate("/tutors-list");
  };

  const clike_sideBr=()=>{
    setsideBar((prevState)=>!prevState)
  }
  const get_Filterd_courses=(qurey,courses)=>{
    if(!qurey){
      return courses;
    }
    return courses.filter(cors=>cors.id.includes(qurey)||cors.title.includes(qurey))

  }

  const getUniqueSubjects = (coursesList) => {
    const subjectMap = new Map();
    coursesList.forEach(course => {
      const subject = course.id.split(" ")[0]; 
      if (!subjectMap.has(subject)) {
        subjectMap.set(subject, {
          id: subject, 
          title: course.title, 
          icon: course.icon 
        });
      }
    });
    return Array.from(subjectMap.values());
  };

  const Filterd_courses=get_Filterd_courses(qurey,courses)
  const uniqueSubjects = getUniqueSubjects(Filterd_courses)

  return (
    <main className="wrap">
      <ToolBar 
        openSideBar={clike_sideBr}
        sideBarState={sideBar}
        toolBarData={toolBarData}
        />
      <input id="searchBar" type="text" placeholder="Search Course/Tutor" onChange={txt=>setQurey(txt.target.value)}></input>
      <br></br>
      <div className="header-row">
      <h3>Recomended courses:</h3>
      <button id="bt2" onClick={See_More}>See More</button>
      </div>
      <br></br>
      <section className="grid">
        {uniqueSubjects.map((course, idx) => (
          <CourseCard
            key={course.id}
            course={course}
            index={idx}
          />
        ))}
        
      </section>
      <br></br>
      <div className="header-row">
      <h3>Recomended Sessions:</h3>
      <button id="bt1" onClick={See_More2}>See More</button>
      </div>
      <br></br>
      <section className="sessions">
        {sessions.slice(0, 4).map((session, idx) => (
          <TutorSessions
            key={session._id}
            seesion={session}
            index={idx}
          />
        ))}
      </section>

    </main>
  );
}

