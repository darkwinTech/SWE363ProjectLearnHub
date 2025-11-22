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
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Home.css";


export default function AdminHome() {
  const [courses, setCourses] = useState(sampleCourses);
  const [sessions, setSession] = useState(sampleSessions);
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

  // Course handlers
  const handleEditCourse = (course, e) => {
    e.stopPropagation();
    setEditingCourse(course);
    setEditForm({
      id: course.id,
      title: course.title,
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
    const subjectPrefix = editingCourse.id;
    setCourses(courses.map(c => {
      const courseSubject = c.id.split(" ")[0];
      if (courseSubject === subjectPrefix) {
        // Update all courses with this subject prefix
        const courseNumber = c.id.split(" ")[1] || "";
        return { 
          ...c, 
          id: editForm.id + (courseNumber ? ` ${courseNumber}` : ""), 
          title: editForm.title 
        };
      }
      return c;
    }));
    setEditingCourse(null);
    setEditForm({ id: "", title: "", icon: null, time: "", totre: "" });
    alert("Course updated successfully");
  };

  const handleConfirmDeleteCourse = () => {
    // Delete all courses that start with the subject prefix
    const subjectPrefix = deletingCourse.id;
    setCourses(courses.filter(c => {
      const courseSubject = c.id.split(" ")[0];
      return courseSubject !== subjectPrefix;
    }));
    setDeletingCourse(null);
    alert("Course deleted successfully");
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

  const handleSaveSessionEdit = () => {
    if (!editForm.id.trim() || !editForm.time.trim() || !editForm.totre.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    setSession(sessions.map(s => 
      s.id === editingSession.id 
        ? { ...s, id: editForm.id, time: editForm.time, totre: editForm.totre }
        : s
    ));
    setEditingSession(null);
    setEditForm({ id: "", title: "", icon: null, time: "", totre: "" });
    alert("Session updated successfully");
  };

  const handleConfirmDeleteSession = () => {
    setSession(sessions.filter(s => s.id !== deletingSession.id));
    setDeletingSession(null);
    alert("Session deleted successfully");
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
          <div key={course.id} style={{ position: 'relative' }}>
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
        {sessions.map((seaion, idx) => (
          <div key={seaion.id} style={{ position: 'relative' }}>
            <div onClick={(e) => isEditSessions && e.stopPropagation()}>
              <TutorSessions
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
                Are you sure you want to delete "{deletingCourse.id}"?
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
                  placeholder="e.g., By Mohamed alzhrane"
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
                Are you sure you want to delete "{deletingSession.id}" session?
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

