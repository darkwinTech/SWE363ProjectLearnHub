import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Notification.css";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import NotificationsItem from "@mui/icons-material/Notifications";
import StarsIcon from "@mui/icons-material/Stars";
import HomeIcon from "@mui/icons-material/Home";
import { getHomeRoute } from "../../utils/getHomeRoute";
import ToolBar from "../../components/ToolBar";
import { getToolBarData } from "../../utils/getToolBarData";

export default function Notification() {
    const [sideBar, setSideBar] = useState(false);
    
    const click_sideBar = () => {
        setSideBar((prevState) => !prevState);
    };
    
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

      {/* Home Icon at Bottom */}
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