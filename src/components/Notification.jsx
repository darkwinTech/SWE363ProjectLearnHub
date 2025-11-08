import React from "react";
import "./Notification.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsItem from "@mui/icons-material/Notifications";
import StarsIcon from "@mui/icons-material/Stars";

export default function Notification() {
    const notifications = [
        {
            id: 1,
            icon: <CalendarTodayIcon />,
            title: "Your schedule meeting with Noor",
            subtitle: "2 hours ago",
            time: "9:40 AM",
        
        },
        {
            id: 2,
            icon: <StarsIcon />,
            title: "New features availabl",
            subtitle: "Check them out now",
            time: "11:40 AM", 
        },];
    return (
      <div className="notification-wrapper container py-5">
      <div className="notification-title d-flex align-items-center mb-4">
        <NotificationsItem className="me-2 fs-4 text-success" />
        <h3 className="fw-bold m-0">Notifications</h3>
      </div>

      <div className="notification-list">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="notification-item d-flex align-items-start p-3 mb-3 rounded-3"
          >
            <div className="notif-icon me-3 text-success fs-5">{item.icon}</div>
            <div className="flex-fill">
              <div className="d-flex justify-content-between">
                <div className="fw-semibold">{item.title}</div>
                <div className="text-muted small">{item.time}</div>
              </div>
              <div className="text-secondary small">{item.subtitle}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    );
}