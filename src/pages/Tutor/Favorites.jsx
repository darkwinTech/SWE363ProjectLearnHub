import '../../Main_profiles.css';
import "../Favorites/Favorites.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useFavorites } from "../../data/state/useFavorites"; 
import {totarData} from "../../data/tutors.js"; 
import ToolBar from "../../components/ToolBar";
import { useState } from "react";
import React from "react";
import Person2Icon from '@mui/icons-material/Person2';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import FunctionsIcon from '@mui/icons-material/Functions';
import { Link, useLocation } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import { getHomeRoute } from "../../utils/getHomeRoute";
import { toolBarData } from "../../data/toolBarData_Tutor";

export default function TutorFavorites() {
  const location = useLocation();
  const [totarDataState, setTotarDataState] = useState(totarData);
  const [sideBar, setSideBar] = useState(false);

  const click_sideBar = () => {
    setSideBar((prevState) => !prevState);
  };

  // Get tutor data from navigation state, or use default
  const tutorData = location.state?.tutor || null;
  const tutorName = tutorData?.name || "Mohamed alzhrane";
  
  // Find the tutor in the data array
  const tutorIndex = totarDataState.findIndex(toter => 
    toter.name.toLowerCase() === tutorName.toLowerCase()
  );
  const currentTutor = tutorIndex !== -1 ? totarDataState[tutorIndex] : null;

  const toggleFavorite = () => {
    if (tutorIndex !== -1) {
      setTotarDataState((prev) =>
        prev.map((toter, i) =>
          i === tutorIndex
            ? { ...toter, Fav: !toter.Fav }
            : toter
        )
      );
    }
  };
  
  return(
     <main className="wrap">
      <ToolBar
        openSideBar={click_sideBar}
        sideBarState={sideBar}
        toolBarData={toolBarData}
      />
            <section className="info">
              <section className="info_name" style={{ justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                <div className="Main_profile">
                  <Person2Icon style={{ fontSize: '60px', color: '#2a4d3d' }}/>
                </div>
                <div className="content">
                  <h4>{tutorName}</h4>
                  <p>Student ID: 202045</p>
                </div>
              </div>
              {currentTutor && (
                <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
                  <button onClick={toggleFavorite} className={`heartBtn_toter ${currentTutor.Fav  ? "heart--active" : ""}`}>
                    {currentTutor.Fav ? <FavoriteIcon style={{ fontSize: '40px'}} /> : <FavoriteBorderIcon style={{ fontSize: '40px'}}/>}
                  </button>
                </div>
              )}
              </section>
            </section>
             <section className="info">
              <div className="info_box">
                 <h4>Major:</h4>
                <p>Computer Science</p>
              </div>
              </section>
              <section className="info">
              <div className="content">
                 <span className="rating"><p>4.5/5</p><StarIcon/></span>
                 <p>FeedBacks</p>
                 <div className="info_box">
                  <span className="by"><PersonIcon/><p>Sarah</p></span>
                 <h6>The seesion was varey helpful for me Thank you</h6>
              </div>
              <div className="info_box">
                  <span className="by"><PersonIcon/><p>Noor</p></span>
                 <h6>The seesion was good, but the voise is not clear</h6>
              </div>
                
              </div>
              </section>
               <section className="info">
                <p>Available Session</p>
              <div className="info_box">
                <div className="flex_content">
                 <span className="by_sesion"><p>Math208</p></span>
                 <h7>1 Oct at 5:00PM Revision for ch3</h7>
                 </div>
              </div>
              <div className="info_box">
                <div className="flex_content">
                 <span className="by_sesion"><p>SWE363</p></span>
                 <h7>3 Oct at 8:00PM starting for ch1</h7>
                 </div>
              </div>
              </section>
              <div className="home">
              <button className="homeBtn"><Link to={getHomeRoute()}><HomeIcon  style={{ fontSize: '30px', color: 'white' }}/></Link></button>
              </div>
              
    </main>    
  );
}

