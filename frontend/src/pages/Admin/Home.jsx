import { useState,useEffect } from "react";
import { sampleSessions} from "../../data/data2";
import CourseCard from "../../components/CourseCard";
import TutorSessions from "../Sessions/TutorSessions";
import ToolBar from "../../components/ToolBar";
import "../../index.css";
import "../../Main_profiles.css";
import SearchIcon from '@mui/icons-material/Search';
import { getToolBarData } from "../../utils/getToolBarData";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Home.css";
import CalculateIcon from "@mui/icons-material/Calculate";
import TerminalIcon from "@mui/icons-material/Terminal";
import ScienceIcon from "@mui/icons-material/Science";
import EngineeringIcon from "@mui/icons-material/PrecisionManufacturing";
import SchoolIcon from "@mui/icons-material/School";

const API_BASE_URL = "http://localhost:5000/api";

export default function AdminHome() {
  const [courses, setCourses] = useState([]);
  const [sessions, setSession] = useState([]);
  const [qurey,setQurey]=useState(" ")
  const [sideBar,setsideBar]=useState(false)
  const [isEditCourses, setIsEditCourses] = useState(false);
  const [isEditSessions, setIsEditSessions] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [editingSession, setEditingSession] = useState(null);
  const [deletingSession, setDeletingSession] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    icon: null,
    time: "",
    totre: ""
  });

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
    navigate("/Courses");
  };
  const See_More2 = () => {
    navigate("/tutors-list");
  };
  const Edit_Courses = () => {
    setIsEditCourses(!isEditCourses);
  };
  const Edit_Sessions = () => {
    setIsEditSessions(!isEditSessions);
  };

  const handleEditCourse = (course, e) => {
    e.stopPropagation();
    setEditingCourse(course);
    setEditForm({
      id: course.courseId || "",
      title: course.department || course.title || "",
      icon: course.icon,
      time: "",
      totre: ""
    });
  };

  const handleDeleteCourse = (course, e) => {
    e.stopPropagation();
    setDeletingCourse(course);
  };

  const handleSaveCourseEdit = () => {
    if (!editForm.id.trim() || !editForm.title.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    const subjectPrefix = editingCourse.courseId || "";
    setCourses(courses.map(c => {
      const courseId = c.courseId || "";
      const courseSubject = courseId.split(" ")[0];
      if (courseSubject === subjectPrefix) {
        // Update all courses with this subject prefix
        const courseNumber = courseId.split(" ")[1] || "";
        return { 
          ...c, 
          courseId: editForm.id + (courseNumber ? ` ${courseNumber}` : ""), 
          department: editForm.title,
          title: c.title
        };
      }
      return c;
    }));
    setEditingCourse(null);
    setEditForm({ id: "", title: "", icon: null, time: "", totre: "" });
    alert("Course updated successfully");
  };

  const handleConfirmDeleteCourse = async () => {
    if (!deletingCourse) return;
    
    try {
      const token = localStorage.getItem("token");

      
      const subjectPrefix = (deletingCourse.courseId || "").toUpperCase();
      
      // Find all courses that match this subject prefix 
      const coursesToDelete = courses.filter(c => {
        const courseId = c.courseId || "";
        const match = courseId.match(/^([A-Za-z]+)/);
        const courseSubject = match ? match[1].toUpperCase() : "";
        return courseSubject === subjectPrefix;
      });

      if (coursesToDelete.length === 0) {
        alert("No courses found to delete.");
        setDeletingCourse(null);
        return;
      }

      // Delete each course via API
      const deletePromises = coursesToDelete.map(async (course) => {
        const encodedCourseId = encodeURIComponent(course.courseId);
        const res = await fetch(`${API_BASE_URL}/courses/${encodedCourseId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Failed to delete course ${course.courseId}`);
        }
        return res.json();
      });

      await Promise.all(deletePromises);

      // Refresh the courses list from the backend
      const res = await fetch(`${API_BASE_URL}/courses`);
      const data = await res.json();
      setCourses(data || []);

      setDeletingCourse(null);
      alert(`Successfully deleted ${coursesToDelete.length} course(s).`);
    } catch (err) {
      console.error("Error deleting courses:", err);
      alert(`Error deleting courses: ${err.message}`);
      setDeletingCourse(null);
    }
  };

  const handleCancelCourseEdit = () => {
    setEditingCourse(null);
    setEditForm({ id: "", title: "", icon: null, time: "", totre: "" });
  };

  const handleCancelCourseDelete = () => {
    setDeletingCourse(null);
  };

  // Session handlers
  const handleEditSession = (session, e) => {
    e.stopPropagation();
    setEditingSession(session);
    setEditForm({
      id: session.id,
      title: "",
      icon: null,
      time: session.time,
      totre: session.totre
    });
  };
  const handleDeleteSession = (session, e) => {
    e.stopPropagation();
    setDeletingSession(session);
  };
  //becase the admin can only edit the time we need to combine it with the same date object
  const buildDateTime = (oldDate, newtime) => {
  const date = new Date(oldDate);
  const [hours, minutes] = newtime.split(":");
  date.setHours(Number(hours));
  date.setMinutes(Number(minutes));
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.toISOString();
};

  const handleSaveSessionEdit = async () => {
    try{
    if (!editForm.title.trim() || !editForm.time.trim() || !editForm.totre.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    const res = await fetch("http://localhost:5000/api/session/admin-edit-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: editingSession._id,
        courseId:editingSession.courseId,
        tutorId:editingSession.tutorId,
        tutorName:editForm.totre,
        title:editForm.title,
        description:editingSession.description,
        dateTime:buildDateTime(editingSession.dateTime, editForm.time),
        teamsLink:editingSession.teamsLink,
        status:editingSession.status
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Failed to edit session.");
    }
    setEditingSession(null);
    setEditForm({ id: "", title: "", icon: null, time: "", totre: "" });
    alert("Session updated successfully");
    }
      catch(err){
      console.error("Error edditing sessions:", err);
      }
  };
  const handleConfirmDeleteSession = async () => {
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
      setDeletingSession(null);
      alert("Session deleted successfully");
      }
      catch(err){
      console.error("Error deleting sessions:", err);
      }
  };
  
  const handleCancelSessionEdit = () => {
    setEditingSession(null);
    setEditForm({ id: "", title: "", icon: null, time: "", totre: "" });
  };

  const handleCancelSessionDelete = () => {
    setDeletingSession(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
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

  // Get unique icon for each course prefix
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
      // Extract subject prefix 
      const match = courseId.match(/^([A-Za-z]+)/);
      const subject = match ? match[1].toUpperCase() : "";
      
      // Only process if we have a valid subject prefix
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
        toolBarData={getToolBarData()}
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
        {uniqueSubjects.map((course, idx) => (
          <div key={course.courseId} style={{ position: 'relative' }}>
            <div onClick={(e) => isEditCourses && e.stopPropagation()}>
              <CourseCard
                course={course}
                index={idx}
                isEditMode={isEditCourses}
              />
            </div>
            {isEditCourses && (
              <div className="admin-edit-actions">
                <button className="admin-edit-btn" onClick={(e) => handleEditCourse(course, e)}>
                  <EditIcon />
                </button>
                <button className="admin-delete-btn" onClick={(e) => handleDeleteCourse(course, e)}>
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
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
        {sessions.slice(0,4).map((seaion, idx) => (
          <div key={seaion.id} style={{ position: 'relative' }}>
            <div onClick={(e) => isEditSessions && e.stopPropagation()}>
              <TutorSessions
                key={seaion._id}
                seesion={seaion}
                index={idx}
                isEditMode={isEditSessions}
              />
            </div>
            {isEditSessions && (
              <div className="admin-edit-actions">
                <button className="admin-edit-btn" onClick={(e) => handleEditSession(seaion, e)}>
                  <EditIcon />
                </button>
                <button className="admin-delete-btn" onClick={(e) => handleDeleteSession(seaion, e)}>
                  <DeleteIcon />
                </button>
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Edit Course Modal */}
      {editingCourse && (
        <div className="admin-edit-modal-overlay" onClick={handleCancelCourseEdit}>
          <div className="admin-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-edit-modal-content">
              <h2 className="admin-edit-modal-title">Edit Course</h2>
              
              <div className="admin-edit-form-group">
                <label className="admin-edit-form-label">Course Code</label>
                <input
                  type="text"
                  name="id"
                  className="admin-edit-form-input"
                  value={editForm.id}
                  onChange={handleInputChange}
                  placeholder="e.g., SWE 353"
                />
              </div>

              <div className="admin-edit-form-group">
                <label className="admin-edit-form-label">Course Title</label>
                <input
                  type="text"
                  name="title"
                  className="admin-edit-form-input"
                  value={editForm.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Web Engineering"
                />
              </div>

              <div className="admin-edit-modal-buttons">
                <button className="admin-edit-modal-cancel-btn" onClick={handleCancelCourseEdit}>
                  Cancel
                </button>
                <button className="admin-edit-modal-edit-btn" onClick={handleSaveCourseEdit}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Course Confirmation Modal */}
      {deletingCourse && (
        <div className="admin-delete-modal-overlay" onClick={handleCancelCourseDelete}>
          <div className="admin-delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-delete-modal-content">
              <h2 className="admin-delete-modal-title">Delete Course</h2>
              <p className="admin-delete-modal-message">
                Are you sure you want to delete "{deletingCourse.courseId}"?
              </p>
              
              <div className="admin-delete-modal-buttons">
                <button className="admin-delete-modal-cancel-btn" onClick={handleCancelCourseDelete}>
                  Cancel
                </button>
                <button className="admin-delete-modal-confirm-btn" onClick={handleConfirmDeleteCourse}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Session Modal */}
      {editingSession && (
        <div className="admin-edit-modal-overlay" onClick={handleCancelSessionEdit}>
          <div className="admin-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-edit-modal-content">
              <h2 className="admin-edit-modal-title">Edit Session</h2>
              
              <div className="admin-edit-form-group">
                <label className="admin-edit-form-label">Titel</label>
                <input
                  type="text"
                  name="title"
                  className="admin-edit-form-input"
                  value={editForm.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Software Engenering"
                />
              </div>

              <div className="admin-edit-form-group">
                <label className="admin-edit-form-label">Time</label>
                <input
                  type="text"
                  name="time"
                  className="admin-edit-form-input"
                  value={editForm.time}
                  onChange={handleInputChange}
                  placeholder="e.g., 6:00 pm"
                />
              </div>

              <div className="admin-edit-form-group">
                <label className="admin-edit-form-label">Tutor</label>
                <input
                  type="text"
                  name="totre"
                  className="admin-edit-form-input"
                  value={editForm.totre}
                  onChange={handleInputChange}
                  placeholder="e.g., Mohamed alzhrane"
                />
              </div>

              <div className="admin-edit-modal-buttons">
                <button className="admin-edit-modal-cancel-btn" onClick={handleCancelSessionEdit}>
                  Cancel
                </button>
                <button className="admin-edit-modal-edit-btn" onClick={handleSaveSessionEdit}>
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Session Confirmation Modal */}
      {deletingSession && (
        <div className="admin-delete-modal-overlay" onClick={handleCancelSessionDelete}>
          <div className="admin-delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-delete-modal-content">
              <h2 className="admin-delete-modal-title">Delete Session</h2>
              <p className="admin-delete-modal-message">
                Are you sure you want to delete "{deletingSession.title}" session?
              </p>
              
              <div className="admin-delete-modal-buttons">
                <button className="admin-delete-modal-cancel-btn" onClick={handleCancelSessionDelete}>
                  Cancel
                </button>
                <button className="admin-delete-modal-confirm-btn" onClick={handleConfirmDeleteSession}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
  
}


