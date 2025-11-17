import React from "react";
import {toolBarData} from "../toolBarData"
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';


export default function ToolBar({openSideBar,sideBarState}) {
    const [toolBar, settoolBars] = useState(toolBarData);
    return (
        <div>
            <div className="menu_icon">
            <button className="menu" onClick={openSideBar}><MenuIcon/></button>
            <button className="menu" ><Link to="/notifications" className="toolLink"><NotificationsIcon/></Link></button>
            </div>
            <div className={sideBarState?"toolBar toolBar--open":"toolBar"}>   
                <ul>    
                {toolBar.map((val,key)=>{
                 return <li key={key} className="toolRow">
                    <Link to={val.link} className="toolLink">
                     <span className="icon">{val.icon}</span>
                     <span className="title">{val.title}</span>
                     </Link>
                  </li>
                 })}
                </ul>
             </div>
             <div className={sideBarState?"pageShadow pageShadow--open":"pageShadow"}></div>
             <div
        className={sideBarState ? "pageShadow pageShadow--open" : "pageShadow"}
        onClick={openSideBar}></div>
        </div>
    )

}