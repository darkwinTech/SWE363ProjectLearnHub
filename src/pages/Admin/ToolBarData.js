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
    link:"h"
  },
  {
    title: "Make Announcements",
    icon:<AssignmentAddIcon/>,
    link:"/make-announcement"
  },
    {
   title: "Analytics",
    icon:<AssessmentIcon/>,
    link:"h"
 
  },
  {
   title: "Support",
    icon:<ContactSupportIcon/>,
    link:"/support"
 
  },
   {
   title: "Calendar",
    icon:<CalendarTodayIcon/>,
    link:"h"
 
  },
  {
   title: "View applacations",
    icon:<AssignmentIcon/>,
    link:"/view-applications"
 
  },
  {
   title: "log out",
    icon:<LogoutIcon/>,
    link:"h"
 
  },
];