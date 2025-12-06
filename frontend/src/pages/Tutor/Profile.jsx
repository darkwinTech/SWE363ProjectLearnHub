import '../../Main_profiles.css';
import ToolBar from "../../components/ToolBar";
import { useState, useEffect } from "react";
import React from "react";
import Person2Icon from '@mui/icons-material/Person2';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { getHomeRoute } from "../../utils/getHomeRoute";
import { toolBarData } from "../../data/toolBarData_Tutor";

const API_BASE_URL = "http://localhost:5000/api";

export default function TutorProfile() {
  const clike_sideBr = () => {
    setsideBar((prevState) => !prevState)
  }
  const [sideBar, setsideBar] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [tutorProfile, setTutorProfile] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/auth/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setUser(data);

        // Fetch tutor profile to get rating
        if (data && data._id) {
          try {
            const tutorProfileRes = await fetch(`${API_BASE_URL}/reviews/tutor/${data._id}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });

            const tutorProfileData = await tutorProfileRes.json();
            if (tutorProfileRes.ok && tutorProfileData.reviews) {
              setReviews(tutorProfileData.reviews || []);
              
              // Calculate average rating from reviews
              if (tutorProfileData.reviews.length > 0) {
                const avgRating = tutorProfileData.reviews.reduce((sum, rev) => sum + rev.rating, 0) / tutorProfileData.reviews.length;
                setRating(Math.round(avgRating * 10) / 10);
              }
            }
          } catch (err) {
            console.error("Error fetching tutor reviews:", err);
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <main className="wrap">
        <ToolBar
          openSideBar={clike_sideBr}
          sideBarState={sideBar}
          toolBarData={toolBarData}
        />
        <div style={{ padding: "20px", textAlign: "center" }}>Loading profile...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="wrap">
        <ToolBar
          openSideBar={clike_sideBr}
          sideBarState={sideBar}
          toolBarData={toolBarData}
        />
        <div style={{ padding: "20px", textAlign: "center" }}>User not found</div>
      </main>
    );
  }

  return (
    <main className="wrap">
      <ToolBar
        openSideBar={clike_sideBr}
        sideBarState={sideBar}
        toolBarData={toolBarData}
      />
      <section className="info">
        <section className="info_name">
          <div className="Main_profile">
            <Person2Icon style={{ fontSize: '60px', color: '#2a4d3d' }} />
          </div>
          <div className="content">
            <h4>{user.name || "N/A"}</h4>
            <p>Student ID: {user.studentId || "N/A"}</p>
          </div>
        </section>
      </section>
      <section className="info">
        {user.college && (
          <div className="info_box">
            <h4>College:</h4>
            <p>{user.college}</p>
          </div>
        )}
        {user.major && (
          <div className="info_box">
            <h4>Major:</h4>
            <p>{user.major}</p>
          </div>
        )}
        {user.program && (
          <div className="info_box">
            <h4>Program:</h4>
            <p>{user.program}</p>
          </div>
        )}
        {user.email && (
          <div className="info_box">
            <h4>Email:</h4>
            <p>{user.email}</p>
          </div>
        )}
      </section>
      <section className="info">
        <div className="content">
          <h4>Your feedback:</h4>
          {reviews.length > 0 ? (
            <>
              <span className="rating"><p>{rating || 0}/5</p><StarIcon /></span>
              {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review, index) => (
                <div key={review._id || index} className="info_box">
                  <span className="by">
                    <PersonIcon />
                    <p>{review.studentId?.name || "Anonymous"}</p>
                  </span>
                  <h6>{review.comment || "No comment"}</h6>
                </div>
              ))}
              {reviews.length > 3 && (
                <button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  style={{
                    marginTop: "12px",
                    padding: "8px 16px",
                    backgroundColor: "#56B46F",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    transition: "background-color 0.2s ease"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#0B6623"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#56B46F"}
                >
                  {showAllReviews ? "Show Less" : `Show More (${reviews.length - 3} more)`}
                </button>
              )}
            </>
          ) : (
            <>
              <span className="rating"><p>0/5</p><StarIcon /></span>
              <div className="info_box">
                <p>No feedback yet</p>
              </div>
            </>
          )}
        </div>
      </section>
      <section className="unified-home-bottom-nav">
        <button className="unified-home-btn">
          <Link to={getHomeRoute()}>
            <HomeIcon />
          </Link>
        </button>
      </section>
    </main>
  );
}
