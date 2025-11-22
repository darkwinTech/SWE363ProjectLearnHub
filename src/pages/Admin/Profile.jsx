import '../../Main_profiles.css';
import ToolBar from "../../components/ToolBar";
import { useState } from "react";
import React from "react";
import Person2Icon from '@mui/icons-material/Person2';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import { getHomeRoute } from "../../utils/getHomeRoute";
import { getToolBarData } from "../../utils/getToolBarData";
import "../ApplySession/ApplySession.css";

export default function Admin() {
const clike_sideBr=()=>{
    setsideBar((prevState)=>!prevState)}
const [sideBar,setsideBar]=useState(false)

  return(
     <main className="wrap">
      <ToolBar
        openSideBar={clike_sideBr}
        sideBarState={sideBar}
        toolBarData={getToolBarData()}
        />
            <section className="info">
              <section className="info_name">
              <div className="Main_profile">
              <Person2Icon style={{ fontSize: '60px', color: '#2a4d3d' }}/>
              </div>
              <div className="content">
                <h4>Ahamad alghamdi</h4>
                <p>Employ ID: 302456</p>
              </div>
              </section>
            </section>
             <section className="info">
              <div className="info_box">
                <h4>Department:</h4>
                <p>Student Affires</p>
              </div>
              <div className="info_box">
                 <h4>Manger:</h4>
                <p>Ghada Alghamdi</p>
              </div>
              <div className="info_box">
                 <h4>email:</h4>
                <p>s20664@kfupm.edu.sa</p>
              </div>
              </section>
              <section className="apply-session-bottom-nav">
                <button className="apply-session-home-btn">
                  <Link to={getHomeRoute()}>
                    <HomeIcon />
                  </Link>
                </button>
              </section>
    </main>    
  );
}

