import { useState,useEffect } from "react";
import { sampleSessions} from "../../data/data2";
import CourseCard from "../../components/CourseCard";
import TutorSessions from "../Sessions/TutorSessions";
import ToolBar from "../../components/ToolBar";
import "../../index.css";
import "../../Main_profiles.css";
import SearchIcon from '@mui/icons-material/Search';
import {toolBarData} from "../../data/toolBarData_Tutor";
import { useNavigate } from "react-router-dom";
import CalculateIcon from "@mui/icons-material/Calculate";
import TerminalIcon from "@mui/icons-material/Terminal";
import ScienceIcon from "@mui/icons-material/Science";
import EngineeringIcon from "@mui/icons-material/PrecisionManufacturing";
import SchoolIcon from "@mui/icons-material/School";

const API_BASE_URL = "http://localhost:5000/api";

export default function TutorHome() {
  const [courses, setCourses] = useState([]);
  const [sessions, setSession] = useState([]);
  const [qurey,setQurey]=useState(" ")
  const [sideBar,setsideBar]=useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/courses`);
        const data = await res.json();
        setCourses(data || []);
      } catch (err) {
        console.error("Error fetching courses:", err);
      }
    };

    fetchCourses();
  }, []);

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
    navigate("/courses");
  };
  const See_More2 = () => {
    navigate("/tutors-list");
  };

  const clike_sideBr=()=>{
    setsideBar((prevState)=>!prevState)
  }
  const get_Filterd_courses=(qurey,courses)=>{  
    if(!qurey || qurey.trim() === " "){
      return courses;
    }
    return courses.filter(cors=>
      (cors.courseId && cors.courseId.includes(qurey)) ||
      (cors.title && cors.title.includes(qurey)) ||
      (cors.department && cors.department.includes(qurey))
    )
  }

  const getIconForSubject = (subject) => {
    const upperSubject = subject.toUpperCase();
    if (upperSubject.startsWith("ICS") || upperSubject.startsWith("COE") || upperSubject.startsWith("SWE") || upperSubject.startsWith("CS")) {
      return <TerminalIcon />;
    } else if (upperSubject.startsWith("MATH") || upperSubject.startsWith("STAT")) {
      return <CalculateIcon />;
    } else if (upperSubject.startsWith("PHYS") || upperSubject.startsWith("CHEM") || upperSubject.startsWith("BIO")) {
      return <ScienceIcon />;
    } else if (upperSubject.startsWith("EE") || upperSubject.startsWith("ME") || upperSubject.startsWith("CE")) {
      return <EngineeringIcon />;
    } else {
      return <SchoolIcon />;
    }
  };

  const getUniqueSubjects = (coursesList) => {
    const subjectMap = new Map();
    coursesList.forEach(course => {
      const courseId = course.courseId || "";
      // Extract subject prefix - get all letters before any numbers or spaces
      const match = courseId.match(/^([A-Za-z]+)/);
      const subject = match ? match[1].toUpperCase() : "";
      
      if (subject && subject.length >= 2) {
        if (!subjectMap.has(subject)) {
          // Use department field from the course
          const department = course.department || course.title || "";
          
          subjectMap.set(subject, {
            courseId: subject,
            title: department, 
            department: department,
            icon: getIconForSubject(subject)
          });
        }
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
            key={course.courseId}
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
