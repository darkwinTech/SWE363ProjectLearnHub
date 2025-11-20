import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { toolBarData } from "../../data/toolBarData";
import HomeIcon from "@mui/icons-material/Home";
import "../../index.css";
import "../../Main_profiles.css";
import "./AdminApplySession.css";

export default function AdminApplySession() {
  const [sideBar, setSideBar] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const navigate = useNavigate();

  // Editable state - these can be passed as props or fetched from state/API
  const [courseCode, setCourseCode] = useState("MATH101");
  const [tutorName, setTutorName] = useState("Tutor1");
  const [description, setDescription] = useState("Description");

  // Form state for editing
  const [editForm, setEditForm] = useState({
    courseCode: "",
    tutorName: "",
    description: "",
  });

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  const handleEdit = () => {
    // Set form values to current values
    setEditForm({
      courseCode: courseCode,
      tutorName: tutorName,
      description: description,
    });
    // Open edit modal
    setShowEditModal(true);
  };

  const handleSave = () => {
    // Validate form
    if (!editForm.courseCode.trim() || !editForm.tutorName.trim() || !editForm.description.trim()) {
      alert("Please fill in all fields");
      return;
    }
    // Update the state with new values
    setCourseCode(editForm.courseCode);
    setTutorName(editForm.tutorName);
    setDescription(editForm.description);
    // Close modal
    setShowEditModal(false);
    // Here you would typically save to API
    alert("Session updated successfully");
  };

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = () => {
    // Handle delete logic here
    const confirmDelete = window.confirm("Are you sure you want to delete this session?");
    if (confirmDelete) {
      // Handle deletion
      alert("Session deleted successfully");
      navigate("/main");
    }
  };

  return (
    <main className="admin-apply-wrap">
      {/* ToolBar with hamburger menu and notification */}
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={toolBarData}
      />

      {/* Page Title */}
      <header className="admin-apply-title-section">
        <h1 className="admin-apply-title">Admin - Booking a Session</h1>
      </header>

      {/* Course and Tutor Information */}
      <section className="admin-apply-info">
        <h1 className="admin-apply-course-code">{courseCode}</h1>
        <h2 className="admin-apply-tutor-name">{tutorName}</h2>
        <Link to="/profile" className="admin-apply-view-tutor">
          View Tutor
        </Link>
      </section>

      {/* Description Block */}
      <section className="admin-apply-description-container">
        <div className="admin-apply-description-box">
          <p className="admin-apply-description-text">{description}</p>
        </div>
      </section>

      {/* Edit and Delete Buttons */}
      <section className="admin-apply-buttons-container">
        <div className="admin-apply-buttons-row">
          <button className="admin-apply-edit-btn" onClick={handleEdit}>
            Edit
          </button>
          <button className="admin-apply-delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </section>

      {/* Home Icon at Bottom */}
      <section className="admin-apply-bottom-nav">
        <button className="admin-apply-home-btn">
          <Link to="/main">
            <HomeIcon />
          </Link>
        </button>
      </section>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="admin-apply-modal-overlay">
          <div className="admin-apply-modal">
            <div className="admin-apply-modal-content">
              <h2 className="admin-apply-modal-title">Edit Session</h2>
              
              {/* Subject/Course Code Input */}
              <div className="admin-apply-form-group">
                <label className="admin-apply-form-label">Subject/Course Code</label>
                <input
                  type="text"
                  name="courseCode"
                  className="admin-apply-form-input"
                  value={editForm.courseCode}
                  onChange={handleInputChange}
                  placeholder="Enter course code"
                />
              </div>

              {/* Tutor Name Input */}
              <div className="admin-apply-form-group">
                <label className="admin-apply-form-label">Tutor Name</label>
                <input
                  type="text"
                  name="tutorName"
                  className="admin-apply-form-input"
                  value={editForm.tutorName}
                  onChange={handleInputChange}
                  placeholder="Enter tutor name"
                />
              </div>

              {/* Description Input */}
              <div className="admin-apply-form-group">
                <label className="admin-apply-form-label">Description</label>
                <textarea
                  name="description"
                  className="admin-apply-form-textarea"
                  value={editForm.description}
                  onChange={handleInputChange}
                  placeholder="Enter description"
                  rows={4}
                />
              </div>

              {/* Modal Buttons */}
              <div className="admin-apply-modal-buttons">
                <button className="admin-apply-modal-cancel-btn" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="admin-apply-modal-save-btn" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

