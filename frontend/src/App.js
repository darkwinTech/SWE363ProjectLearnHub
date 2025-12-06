import './Main_profiles.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Admin imports
import AdminProfile from './pages/Admin/Profile.jsx';
import AdminAnalytics from './pages/Admin/Analytics.jsx';
import AdminHome from './pages/Admin/Home.jsx';
import AdminApplySession from './pages/Admin/ApplySession.jsx';
import MakeAnnouncement from './pages/Admin/MakeAnnouncement.jsx';
import AdminSupport from './pages/Admin/Support.jsx';
import SupportReply from './pages/Admin/SupportReply.jsx';
import ViewApplications from './pages/Admin/ViewApplications.jsx';

// Tutor imports
import TutorProfile from './pages/Tutor/Profile.jsx';
import TutorAnalytics from './pages/Tutor/Analytics.jsx';
import TutorHome from './pages/Tutor/Home.jsx';
import TutorApplySession from './pages/Tutor/ApplySession.jsx';
import TutorFavorites from './pages/Tutor/Favorites.jsx';
import TutorProfileView from './pages/Tutor/TutorProfileView.jsx';

// Student imports
import StudentProfile from './pages/Student/Profile.jsx';
import StudentHome from './pages/Student/Home.jsx';
import StudentJoinSession from './pages/Student/JoinSession.jsx';
import StudentRatingSession from './pages/Student/RatingSession.jsx';
import StudentSupport from './pages/Student/Support.jsx';

// Common pages
import Login from './pages/Login/Login.jsx';
import Notification from "./pages/Notifications/Notification.jsx";
import Courses from './pages/Courses/Courses.jsx';
import SubjectCourses from './pages/Courses/SubjectCourses.jsx';
import TutorsList from './pages/Tutors/TutorsList.jsx';
import GeneralCalendar from './pages/Calendar/GeneralCalendar.jsx';
import Favorites from './pages/Favorites/Favorites.jsx';
 
 
 
function App() {
  return (
    <BrowserRouter>
      <Routes>
       {/* Login */}
       <Route path="/" element={<Login />} />
       
       {/* Admin Routes */}
       <Route path="/admin" element={<AdminHome />} />
       <Route path="/admin/profile" element={<AdminProfile />} />
       <Route path="/admin/tutorProfile" element={<TutorProfileView />} />
       <Route path="/admin/analytics" element={<AdminAnalytics />} />
       <Route path="/admin-apply-session" element={<AdminApplySession />} />
       <Route path="/admin/make-announcement" element={<MakeAnnouncement />} />
       <Route path="/admin/support" element={<AdminSupport />} />
       <Route path="/admin/support/reply" element={<SupportReply />} />
       <Route path="/admin/view-applications" element={<ViewApplications />} />
       
       {/* Tutor Routes */}
       <Route path="/tutor" element={<TutorHome />} />
       <Route path="/tutor/profile" element={<TutorProfile />} />
       <Route path="/tutor/tutorProfile" element={<TutorProfileView />} />
       <Route path="/tutor/analytics" element={<TutorAnalytics />} />
       <Route path="/tutor/favorite" element={<TutorFavorites />} />
       <Route path="/tutor/favorites" element={<Favorites />} />
       <Route path="/apply-session" element={<TutorApplySession />} />
       
       {/* Student Routes */}
       <Route path="/student" element={<StudentHome />} />
       <Route path="/student/profile" element={<StudentProfile />} />
       <Route path="/student/tutorProfile" element={<TutorProfileView />} />
       <Route path="/student/favorites" element={<Favorites />} />
       <Route path="/join-session" element={<StudentJoinSession />} />
       <Route path="/student/rating-session" element={<StudentRatingSession />} />
       <Route path="/support" element={<StudentSupport />} />
       
       {/* Common Routes */}
       <Route path="/notifications" element={<Notification />} />
       <Route path="/courses" element={<Courses />} />
       <Route path="/courses/:subject" element={<SubjectCourses />} />
       <Route path="/tutors-list" element={<TutorsList />} />
       <Route path="/general-calendar" element={<GeneralCalendar />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;