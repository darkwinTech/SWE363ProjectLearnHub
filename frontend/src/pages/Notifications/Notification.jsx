import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Notification.css";

import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsItem from "@mui/icons-material/Notifications";
import StarsIcon from "@mui/icons-material/Stars";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CampaignIcon from "@mui/icons-material/Campaign";
import HomeIcon from "@mui/icons-material/Home";

import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";
import { getHomeRoute } from "../../utils/getHomeRoute";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

// Convert timestamp → "2 hours ago"
const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = (now - past) / 1000;

  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return past.toLocaleDateString();
};

// Map backend type → icon
const getIconByType = (type) => {
  switch (type) {
    case "booking":
      return <CalendarTodayIcon />;
    case "announcement":
      return <CampaignIcon />;
    case "application":
      return <StarsIcon />;
    case "support":
      return <SupportAgentIcon />;
    default:
      return <NotificationsItem />;
  }
};

export default function NotificationPage() {
  const [sideBar, setSideBar] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const click_sideBar = () => {
    setSideBar((prev) => !prev);
  };

  // Fetch notifications from backend
  useEffect(() => {
    async function loadNotifications() {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch(`${BASE}/api/notifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          console.error("Error loading notifications:", data.message);
          return;
        }

        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    }

    loadNotifications();
  }, []);

  // Mark a notification as read and remove it from UI
  async function markAsRead(id) {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${BASE}/api/notifications/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("Error marking as read:", data.message);
        return;
      }

      // Remove it from UI
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Error marking as read:", err);
    }
  }

  return (
    <div className="notification-wrapper container py-5">
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
      />

      <div className="notification-title d-flex align-items-center mb-4">
        <NotificationsItem className="me-2 fs-4 text-success" />
        <h3 className="fw-bold m-0">Notifications</h3>
      </div>

      <div className="notification-list">
        {notifications.length === 0 ? (
          <p className="text-muted text-center">No notifications yet.</p>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id}
              className="notification-item d-flex align-items-start p-3 mb-3 rounded-3 bg-white border border-success"
            >
              <div className="notif-icon me-3 text-success fs-5">
                {getIconByType(item.type)}
              </div>

              <div className="flex-fill">
                <div className="d-flex justify-content-between">
                  <div className="fw-semibold">{item.title}</div>
                  <div className="text-muted small">
                    {new Date(item.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>

                <div className="text-secondary small">{item.message}</div>

                <div className="text-muted small mt-1">
                  {timeAgo(item.createdAt)}
                </div>

                {/* BUTTON TO REMOVE */}
                <button
                  className="btn btn-sm btn-outline-success mt-3"
                  onClick={() => markAsRead(item._id)}
                >
                  Mark as Read
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Home button */}
      <div className="unified-home-bottom-nav">
        <button className="unified-home-btn">
          <Link to={getHomeRoute()}>
            <HomeIcon />
          </Link>
        </button>
      </div>
    </div>
  );
}
