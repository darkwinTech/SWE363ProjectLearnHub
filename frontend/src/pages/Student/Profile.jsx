import '../../Main_profiles.css';
import ToolBar from "../../components/ToolBar";
import { useState, useEffect } from "react";
import React from "react";
import Person2Icon from '@mui/icons-material/Person2';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { getHomeRoute } from "../../utils/getHomeRoute";
import { getToolBarData } from "../../utils/getToolBarData";

const API_BASE_URL = "http://localhost:5000/api";

export default function StudentProfile() {
  const clike_sideBr = () => {
    setsideBar((prevState) => !prevState)
  }
  const [sideBar, setsideBar] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
          toolBarData={getToolBarData()}
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
          toolBarData={getToolBarData()}
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
        toolBarData={getToolBarData()}
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
        {user.degree && (
          <div className="info_box">
            <h4>Degree:</h4>
            <p>{user.degree}</p>
          </div>
        )}
        {user.program && (
          <div className="info_box">
            <h4>Program:</h4>
            <p>{user.program}</p>
          </div>
        )}
        {user.year && (
          <div className="info_box">
            <h4>Year:</h4>
            <p>{user.year}</p>
          </div>
        )}
        {user.email && (
          <div className="info_box">
            <h4>Email:</h4>
            <p>{user.email}</p>
          </div>
        )}
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
