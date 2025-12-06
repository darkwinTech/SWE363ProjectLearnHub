import '../../Main_profiles.css';
import "../Favorites/Favorites.css";
import ToolBar from "../../components/ToolBar";
import { useState, useEffect } from "react";
import React from "react";
import Person2Icon from '@mui/icons-material/Person2';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { getHomeRoute } from "../../utils/getHomeRoute";
import { getToolBarData } from "../../utils/getToolBarData";

const API_BASE_URL = "http://localhost:5000/api";

export default function TutorProfileView() {
  const location = useLocation();
  const [sideBar, setSideBar] = useState(false);
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteTutors, setFavoriteTutors] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const userType = localStorage.getItem('userType');
  const isAdmin = userType === 'admin';

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  // Get tutor data from location state
  const tutorData = location.state?.tutor || null;
  const tutorName = tutorData?.name || null;
  const tutorStudentId = tutorData?.studentId || null;
  const tutorId = tutorData?.tutorId || tutorData?._id || null;

  // Fetch tutor profile from backend
  useEffect(() => {
    const fetchTutorProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const params = new URLSearchParams();
        if (tutorStudentId) {
          params.append('studentId', tutorStudentId);
        } else if (tutorId) {
          params.append('tutorId', tutorId);
        } else if (tutorName) {
          params.append('name', tutorName);
        } else {
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/auth/tutor?${params.toString()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok && data) {
          setTutor(data);
          
          // Fetch reviews for this tutor
          if (data._id) {
            try {
              const reviewsRes = await fetch(`${API_BASE_URL}/reviews/tutor/${data._id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              });

              const reviewsData = await reviewsRes.json();
              if (reviewsRes.ok && reviewsData.reviews) {
                setReviews(reviewsData.reviews || []);
                
                // Calculate average rating from reviews
                if (reviewsData.reviews.length > 0) {
                  const avgRating = reviewsData.reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviewsData.reviews.length;
                  setRating(Math.round(avgRating * 10) / 10);
                }
              }
            } catch (err) {
              console.error("Error fetching tutor reviews:", err);
            }
          }
        }
      } catch (err) {
        console.error("Error fetching tutor profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTutorProfile();
  }, [tutorName, tutorStudentId]);

  useEffect(() => {
    if (isAdmin || !tutor) return;

    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_BASE_URL}/favorites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok && data.favoriteTutors) {
          setFavoriteTutors(data.favoriteTutors || []);
          // Check if current tutor is favorited
          const tutorId = tutor._id || tutor.studentId;
          const isFav = data.favoriteTutors.some(
            (favTutor) => favTutor._id === tutorId || favTutor.studentId === tutorId || favTutor.studentId === tutor.studentId
          );
          setIsFavorited(isFav);
        }
      } catch (err) {
        console.error("Error fetching favorites:", err);
      }
    };

    fetchFavorites();
  }, [tutor, isAdmin]);

  // Toggle favorite
  const toggleFavorite = async () => {
    if (!tutor || !tutor.studentId) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const endpoint = `${API_BASE_URL}/favorites/tutors/${tutor.studentId}`;
      const method = isFavorited ? "DELETE" : "POST";

      const res = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setIsFavorited(!isFavorited);
        if (data.favoriteTutors) {
          setFavoriteTutors(data.favoriteTutors);
        }
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
    }
  };

  if (loading) {
    return (
      <main className="wrap">
        <ToolBar
          openSideBar={click_sideBar}
          sideBarState={sideBar}
          toolBarData={getToolBarData()}
        />
        <div style={{ padding: "20px", textAlign: "center" }}>Loading tutor profile...</div>
      </main>
    );
  }

  if (!tutor) {
    return (
      <main className="wrap">
        <ToolBar
          openSideBar={click_sideBar}
          sideBarState={sideBar}
          toolBarData={getToolBarData()}
        />
        <div style={{ padding: "20px", textAlign: "center" }}>Tutor not found</div>
      </main>
    );
  }

  return (
    <main className="wrap">
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />
      <section className="info">
        <section className="info_name" style={{ justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
            <div className="Main_profile">
              <Person2Icon style={{ fontSize: '60px', color: '#2a4d3d' }} />
            </div>
            <div className="content">
              <h4>{tutor.name || "N/A"}</h4>
              <p>Student ID: {tutor.studentId || "N/A"}</p>
            </div>
          </div>
          {!isAdmin && (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
              <button 
                onClick={toggleFavorite} 
                className={`heartBtn_toter ${isFavorited ? "heart--active" : ""}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {isFavorited ? (
                  <FavoriteIcon style={{ fontSize: '40px', color: '#e91e63' }} />
                ) : (
                  <FavoriteBorderIcon style={{ fontSize: '40px', color: '#2a4d3d' }} />
                )}
              </button>
            </div>
          )}
        </section>
      </section>
      <section className="info">
        {tutor.college && (
          <div className="info_box">
            <h4>College:</h4>
            <p>{tutor.college}</p>
          </div>
        )}
        {tutor.major && (
          <div className="info_box">
            <h4>Major:</h4>
            <p>{tutor.major}</p>
          </div>
        )}
        {tutor.program && (
          <div className="info_box">
            <h4>Program:</h4>
            <p>{tutor.program}</p>
          </div>
        )}
        {tutor.email && (
          <div className="info_box">
            <h4>Email:</h4>
            <p>{tutor.email}</p>
          </div>
        )}
      </section>
      <section className="info">
        <div className="content">
          <span className="rating"><p>{rating || 0}/5</p><StarIcon /></span>
          <p>FeedBacks</p>
          {reviews.length > 0 ? (
            <>
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
            <div className="info_box">
              <p>No feedback yet</p>
            </div>
          )}
        </div>
      </section>
      <section className="info">
        <p>Available Session</p>
        <div className="info_box">
          <div className="flex_content">
            <span className="by_sesion"><p>Math208</p></span>
            <h7>1 Oct at 5:00PM Revision for ch3</h7>
          </div>
        </div>
        <div className="info_box">
          <div className="flex_content">
            <span className="by_sesion"><p>SWE363</p></span>
            <h7>3 Oct at 8:00PM starting for ch1</h7>
          </div>
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

