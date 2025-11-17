import './App.css';
import Main from "./main.jsx";
import Admin from "./Admin_Profile.jsx"
import User from './User_Profile.jsx';
import Totor from './Totar_Profile.jsx';
import TotorFav from './Totor_favarite.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ToolBar from "./components/ToolBar";
import Notification from './components/Notification.jsx';

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
       <Route path="/" element={<Main />} />
       <Route path="/profile" element={<Totor />} />
       <Route path="/notifications" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
