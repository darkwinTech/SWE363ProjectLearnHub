import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { toolBarData } from "../../data/toolBarData";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import "../../index.css";
import "../../Main_profiles.css";
import "./RatingSession.css";

export default function RatingSession() {
  const [sideBar, setSideBar] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  // Example data - these can be passed as props or fetched from state/API
  const courseCode = "MATH101";
  const tutorName = "Tutor1";

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleStarHover = (index) => {
    setHoverRating(index);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = () => {
    // Handle submit logic here
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }
    // Show success modal
    setShowSuccessModal(true);
  };

  const handleOkClick = () => {
    // Close modal and navigate to main page
    setShowSuccessModal(false);
    navigate("/main");
  };

  return (
    <main className="rating-session-wrap">
      {/* ToolBar with hamburger menu and notification */}
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={toolBarData}
      />

      {/* Page Title */}
      <header className="rating-session-title-section">
        <h1 className="rating-session-title">Rating/Feedback</h1>
      </header>

      {/* Course and Tutor Information */}
      <section className="rating-session-info">
        <h1 className="rating-session-course-code">{courseCode}</h1>
        <h2 className="rating-session-tutor-name">{tutorName}</h2>
      </section>

      {/* Rating Section */}
      <section className="rating-session-rating-container">
        <h3 className="rating-session-rating-title">Rating</h3>
        <div className="rating-session-stars">
          {[1, 2, 3, 4, 5].map((index) => {
            const isFilled = index <= (hoverRating || rating);
            return (
              <button
                key={index}
                className="rating-session-star-btn"
                onClick={() => handleStarClick(index)}
                onMouseEnter={() => handleStarHover(index)}
                onMouseLeave={handleStarLeave}
                aria-label={`Rate ${index} stars`}
              >
                {isFilled ? (
                  <StarIcon className="rating-session-star-filled" />
                ) : (
                  <StarBorderIcon className="rating-session-star-empty" />
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Comment Section */}
      <section className="rating-session-comment-container">
        <textarea
          className="rating-session-comment-input"
          placeholder="Comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={6}
        />
      </section>

      {/* Submit Button */}
      <section className="rating-session-button-container">
        <button className="rating-session-submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </section>

      {/* Home Icon at Bottom */}
      <section className="rating-session-bottom-nav">
        <button className="rating-session-home-btn">
          <Link to="/main">
            <HomeIcon />
          </Link>
        </button>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="rating-session-modal-overlay">
          <div className="rating-session-modal">
            <div className="rating-session-modal-content">
              <p className="rating-session-modal-message">Message sent successfully.</p>
              <button className="rating-session-modal-ok-btn" onClick={handleOkClick}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

