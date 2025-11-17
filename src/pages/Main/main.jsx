import { useState } from "react";
import { sampleCourses } from "../../data/data";
import { sampleSessions} from "../../data/data2";
import CourseCard from "../../components/CourseCard";
import ToturSesions from "../Sessions/ToturSesions";
import ToolBar from "../../components/ToolBar";
import "../../index.css";
import "../../App.css"
import SearchIcon from '@mui/icons-material/Search';


export default function Main() {
  const [courses, setCourses] = useState(sampleCourses);
  const [sessions, setSession] = useState(sampleSessions);
  const [qurey,setQurey]=useState(" ")
  const [sideBar,setsideBar]=useState(false)



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
        />
      <input id="searchBar" type="text" placeholder="Search Course/Tutor" onChange={txt=>setQurey(txt.target.value)}></input>
      <br></br>
      <div className="header-row">
      <h3>Recomended courses:</h3>
      <button id="bt2">See More</button>
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
      <button id="bt1">See More</button>
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
