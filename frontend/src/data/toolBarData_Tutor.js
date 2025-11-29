import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';

export const toolBarData = [
  { title: "My Profile", icon: <AccountCircleIcon />, link: "/tutor/profile" },
  { title: "Favorites", icon: <FavoriteBorderIcon />, link: "/favorites" },
  { title: "Calendar", icon: <CalendarTodayIcon />, link: "/general-calendar" },
  { title: "Support", icon: <ContactSupportIcon />, link: "/support" },
  { title: "Analytics", icon: <AssessmentIcon />, link: "/tutor/analytics" },
  { title: "Log Out", icon: <LogoutIcon />, link: "logout" },
];

