import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import HomeIcon from "@mui/icons-material/Home";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { getHomeRoute } from "../../utils/getHomeRoute";
import "../../index.css";
import "../../Main_profiles.css";
import "./RatingSession.css";

export default function StudentRatingSession() {
  const [sideBar, setSideBar] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  // Get session data from navigation state, or use defaults
  const session = location.state?.session || null;
  // Extract course code
  const courseCode = session?.courseId?.courseId || session?.courseCode || session?.id || "Course";
  // Handle both formats
  const tutorName = session?.tutorName || session?.totre?.replace("By ", "") || "Tutor";
  // Get session ID for submitting review
  const sessionId = session?.sessionId || session?._id || session?.id || null;

  const handleStarClick = (index) => {
    setRating(index);
  };

  const handleStarHover = (index) => {
    setHoverRating(index);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = async () => {
    // Validate rating
    if (rating === 0) {
      setErrorMessage("Please select a rating");
      return;
    }

    // Validate session ID
    if (!sessionId) {
      setErrorMessage("Session information is missing. Please try again.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("You must be logged in to submit a review.");
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("http://localhost:5000/api/reviews/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sessionId: sessionId,
          rating: rating,
          comment: comment.trim() || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error submitting review:", error);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOkClick = () => {
    // Close modal and navigate to user's home page
    setShowSuccessModal(false);
    navigate(getHomeRoute());
  };

  return (
    <main className="rating-session-wrap">
      {/* ToolBar with hamburger menu and notification */}
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />

      {/* Page Title */}
      <header className="rating-session-title-section">
        <h1 className="rating-session-title">Rating</h1>
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

      {/* Error Message */}
      {errorMessage && (
        <section className="rating-session-error-container">
          <p className="rating-session-error-message">{errorMessage}</p>
        </section>
      )}

      {/* Submit Button */}
      <section className="rating-session-button-container">
        <button 
          className="rating-session-submit-btn" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </section>

      {/* Home Icon at Bottom */}
      <section className="unified-home-bottom-nav">
        <button className="unified-home-btn">
          <Link to={getHomeRoute()}>
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

