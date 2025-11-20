import { useState } from "react";
import { sampleCourses } from "../../data/data";
import { sampleSessions} from "../../data/data2";
import CourseCard from "../../components/CourseCard";
import ToturSesions from "../Sessions/ToturSesions";
import ToolBar from "../../components/ToolBar";
import "../../index.css";
import "../../Main_profiles.css";
import SearchIcon from '@mui/icons-material/Search';
import {toolBarData} from "../../data/toolBarData"
import { useNavigate } from "react-router-dom";


export default function Main() {
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
  const Edit_Courses = () => {
    // Navigate to course editing page or show edit functionality
    alert("Edit courses functionality");
  };
  const Edit_Sessions = () => {
    // Navigate to session editing page or show edit functionality
    alert("Edit sessions functionality");
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

  const Filterd_courses=get_Filterd_courses(qurey,courses)

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
      <div style={{ display: "flex", gap: "8px" }}>
        <button id="bt2" onClick={See_More}>See More</button>
        <button id="bt2" onClick={Edit_Courses}>Edit</button>
      </div>
      </div>
      <br></br>
      <section className="grid">
        {Filterd_courses.map((course, idx) => (
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
      <div style={{ display: "flex", gap: "8px" }}>
        <button id="bt1" onClick={See_More2}>See More</button>
        <button id="bt1" onClick={Edit_Sessions}>Edit</button>
      </div>
      </div>
      <br></br>
      <section className="sessions">
        {sessions.map((seaion, idx) => (
          <ToturSesions
            key={seaion.id}
            seesion={seaion}
            index={idx}
          />
        ))}
      </section>

    </main>
  );
}
