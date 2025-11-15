import "./App.css"
import ToolBar from "./components/ToolBar";
import { useState } from "react";
import React from "react";
import Person2Icon from '@mui/icons-material/Person2';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';

export default function Totor() {
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
                <h4>College:</h4>
                <p>Computing & Mathematics</p>
              </div>
              <div className="info_box">
                 <h4>Major:</h4>
                <p>Computer Science</p>
              </div>
              <div className="info_box">
                 <h4>Program:</h4>
                <p>BS in Computer Science</p>
              </div> 
              </section>
              <section className="info">
              <div className="content">
                <h4>Your feedback:</h4>
                 <span className="rating"><p>4.5/5</p><StarIcon/></span>
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
              
    </main>    
  );
}
