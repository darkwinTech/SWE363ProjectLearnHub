import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentAddIcon from '@mui/icons-material/AssignmentAdd';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LogoutIcon from '@mui/icons-material/Logout';

export const toolBarData = [
  {
    title: "My profile",
    icon:<AccountCircleIcon/>,
    link:"/profile"
  },
  {
    title: "Make Announcements",
    icon:<AssignmentAddIcon/>,
    link:"/"
  },
    {
   title: "Analytics",
    icon:<AssessmentIcon/>,
    link:"/profile"
 
  },
  {
   title: "Support",
    icon:<ContactSupportIcon/>,
    link:"/profile"
 
  },
   {
   title: "Calendar",
    icon:<CalendarTodayIcon/>,
    link:"/profile"
 
  },
  {
   title: "View applacations",
    icon:<AssignmentIcon/>,
    link:"/profile"
 
  },
  {
   title: "log out",
    icon:<LogoutIcon/>,
    link:"/profile"
 
  },
];