import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';

export const toolBarData = [
  {title: "My profile", 
  icon:<AccountCircleIcon/>, 
  link:"/admin/profile"},
  {title: "Announcements", 
  icon:<AssignmentAddIcon/>, 
  link:"/admin/make-announcement"},
  {title: "Analytics", 
  icon:<AssessmentIcon/>,
  link:"/admin/analytics"},
  {title: "Support", 
  icon:<ContactSupportIcon/>, 
  link:"/admin/support"},
  {title: "Calendar", 
  icon:<CalendarTodayIcon/>, 
  link:"/general-calendar"},
  {title: "View Application", 
  icon:<AssignmentIcon/>, 
  link:"/admin/view-applications"},
  {title: "Log out", 
  icon:<LogoutIcon/>, 
  link:"logout"},
];