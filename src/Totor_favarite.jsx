import "./App.css"
import ToolBar from "./components/ToolBar";
import { useState } from "react";
import React from "react";
import Person2Icon from '@mui/icons-material/Person2';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import FunctionsIcon from '@mui/icons-material/Functions';

export default function TotorFav() {
    const [sideBar,setsideBar]=useState(false)

    const clike_sideBr=()=>{
    setsideBar((prevState)=>!prevState)
  }
  return(
     <main className="wrap">
            <ToolBar 
            openSideBar={clike_sideBr}
            sideBarState={sideBar}
            />
            <section className="info">
              <section className="info_name">
              <div className="Main_profile">
              <Person2Icon style={{ fontSize: '60px', color: '#2a4d3d' }}/>
              </div>
              <div className="content">
                <h4>Ahamad alghamdi</h4>
                <p>Student ID: 202045</p>
              </div>
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
                 <h6>The seesion was varey helpful</h6>
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
              
    </main>    
  );
}
