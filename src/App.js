import './App.css';
import main from './pages/Main/main.jsx';
import Admin from './pages/Profiles/Admin_Profile.jsx';
import User from './pages/Profiles/User_Profile.jsx';
import Totar_Profile from './pages/Profiles/Totar_Profile.jsx';
import Totor_favarite from './pages/Profiles/Totor_favarite.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ToolBar from './components/ToolBar';
import Login from './pages/Login/Login.jsx';
import Notification from "./pages/Notifications/Notification.jsx";
import AdminAnalyticsPage from "./pages/Analytics/AdminAnalyticsPage.jsx";
import TutorAnalyticsPage from "./pages/Analytics/TutorAnalyticsPage.jsx";
import Main from './pages/Main/main.jsx';
import Courses from './pages/Courses/Courses.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';




function App() {
  const [sideBar,setsideBar]=useState(false)
   const clike_sideBr=()=>{
    setsideBar((prevState)=>!prevState)
  }
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main />} />
       <Route path="/notifications" element={<Notification />} />
       <Route path="/profile" element={<Admin />} />
       <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
       <Route path="/tutor/analytics" element={<TutorAnalyticsPage />} />
       <Route path="/courses" element={<Courses />} />
       <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
