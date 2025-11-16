import './App.css';
import Main from './pages/Main/main.jsx';
import Admin from './pages/Profiles/Admin_Profile.jsx';
import User from './pages/Profiles/User_Profile.jsx';
import Totor from './pages/Profiles/Totar_Profile.jsx';
import TotorFav from './pages/Profiles/Totor_favarite.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import ToolBar from './components/ToolBar';
import Login from './pages/Login/Login.jsx';
import Notification from "./pages/Notifications/Notification.jsx";

function App() {
  const [sideBar,setsideBar]=useState(false)
   const clike_sideBr=()=>{
    setsideBar((prevState)=>!prevState)
  }
  return (
    <BrowserRouter>
      <ToolBar 
        openSideBar={clike_sideBr}
        sideBarState={sideBar}
        />
      <Routes>
       <Route path="/" element={<Login />} />
       <Route path="/notifications" element={<Notification />} />
       <Route path="/profile" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
