import { useState } from "react";
import { sampleCourses } from "../../data/data";
import { sampleSessions} from "../../data/data2";
import CourseCard from "../../components/CourseCard";
import TutorSessions from "../Sessions/TutorSessions";
import ToolBar from "../../components/ToolBar";
import "../../index.css";
import "../../Main_profiles.css";
import SearchIcon from '@mui/icons-material/Search';
import { getToolBarData } from "../../utils/getToolBarData";
import { useNavigate } from "react-router-dom";


export default function StudentHome() {
  const [courses, setCourses] = useState(sampleCourses);
  const [sessions, setSession] = useState(sampleSessions);
  const [qurey,setQurey]=useState(" ")
  const [sideBar,setsideBar]=useState(false)


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

  // Group courses by subject (e.g., combine all ICS courses into one)
  const getUniqueSubjects = (coursesList) => {
    const subjectMap = new Map();
    coursesList.forEach(course => {
      const subject = course.id.split(" ")[0]; // Extract subject (e.g., "ICS" from "ICS 104")
      if (!subjectMap.has(subject)) {
        // Use the first course of each subject as representative
        subjectMap.set(subject, {
          id: subject, // Use just the subject name as ID
          title: course.title, // Use first course's title
          icon: course.icon // Use first course's icon
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
        toolBarData={getToolBarData()}
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
        {sessions.map((seaion, idx) => (
          <TutorSessions
            key={seaion.id}
            seesion={seaion}
            index={idx}
          />
        ))}
      </section>

    </main>
  );
}

