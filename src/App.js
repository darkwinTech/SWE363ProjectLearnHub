import './Main_profiles.css';
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
import Main_student from './pages/Main/main_student.jsx';
import Main_totre from './pages/Main/main_totre.jsx';
import Courses from './pages/Courses/Courses.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
import ApplySession from './pages/ApplySession/ApplySession.jsx';
import JoinSession from './pages/ApplySession/JoinSession.jsx';
import RatingSession from './pages/ApplySession/RatingSession.jsx';
import AdminApplySession from './pages/ApplySession/AdminApplySession.jsx';
 
 
 
function App() {
  const [sideBar,setsideBar]=useState(false)
   const clike_sideBr=()=>{
    setsideBar((prevState)=>!prevState)
  }
  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Login />} />
        <Route path="/main" element={<Main_student />} />
       <Route path="/notifications" element={<Notification />} />
       <Route path="/profile" element={<User />} />
       <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
       <Route path="/tutor/analytics" element={<TutorAnalyticsPage />} />
       <Route path="/courses" element={<Courses />} />
       <Route path="/favorites" element={<Favorites />} />
       <Route path="/apply-session" element={<ApplySession />} />
       <Route path="/join-session" element={<JoinSession />} />
       <Route path="/rating-session" element={<RatingSession />} />
       <Route path="/admin-apply-session" element={<AdminApplySession />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;
 
 