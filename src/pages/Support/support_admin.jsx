
import ToolBar from "../../components/ToolBar";
import { useState } from "react";
import React from "react";
import Person2Icon from '@mui/icons-material/Person2';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from "react-router-dom";
import "./support.css"


export default function Admin_suuport() {
const showAlert = () => {
  alert("Send successfully");
};

  return(
     <main className="wrap">
            <div className="content">
                <h4>Support Conversations</h4>
            </div>
             <section className="info_support">
                <h8>Subject:</h8>
              <div className="info_box_support">
                <h8><b>a Problem with adding courses</b></h8>
              </div>
               <h8>Message:</h8>
              <div className="info_box_support">
                <p>problem when trying to add courses to my account. Each time I attempt to do so, the course doesn’t appear in my list
                Could you please help me resolve this issue?</p>
              </div>
              </section>
               <section className="info_support">
                <h8>Your Answer:</h8>
                <textarea className="text_arrea" placeholder="Provide as much details as possible" rows="5" cols="40"></textarea>
                <button className="Btn" onClick={showAlert}><Link className="toolLink" to="/main">Send</Link></button>
               </section>
    </main>    
  );
}
