import '../../Main_profiles.css';
import ToolBar from "../../components/ToolBar";
import { useState } from "react";
import React from "react";
import Person2Icon from '@mui/icons-material/Person2';
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';

export default function User() {

  return(
     <main className="wrap">
            
            <section className="info">
              <section className="info_name">
              <div className="Main_profile">
              <Person2Icon style={{ fontSize: '60px', color: '#2a4d3d' }}/>
              </div>
              <div className="content">
                <h4>Norah alghamdi</h4>
                <p>Student ID: 202269</p>
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
                 <h4>Degree:</h4>
                <p>BS of Science</p>
              </div>
              <div className="info_box">
                 <h4>Program:</h4>
                <p>BS in Computer Science</p>
              </div>
              </section>
              <div className="home">
              <button className="homeBtn"><Link to="/main"><HomeIcon  style={{ fontSize: '30px', color: 'white' }}/></Link></button>
              </div>
    </main>    
  );
}
