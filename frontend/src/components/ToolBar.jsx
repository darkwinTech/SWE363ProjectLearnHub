import React from "react";
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import NotificationsIcon from '@mui/icons-material/Notifications';


export default function ToolBar({openSideBar,sideBarState,toolBarData}) {
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
                 // Check if this is a logout item (case-insensitive)
                 const isLogout = (val.title && val.title.toLowerCase() === "log out") || 
                                  (val.link && val.link.toLowerCase() === "logout");
                 
                 if (isLogout) {
                    return <li key={key} className="toolRow">
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Clear localStorage
                                localStorage.removeItem('userType');
                                const origin = window.location.origin;
                                window.location.replace(origin + '/');
                            }}
                            className="toolLink" 
                            style={{
                                cursor: 'pointer', 
                                display: 'flex', 
                                alignItems: 'center',
                                background: 'none',
                                border: 'none',
                                padding: 0,
                                width: '100%',
                                textAlign: 'left'
                            }}
                            type="button"
                        >
                            <span className="icon">{val.icon}</span>
                            <span className="title">{val.title}</span>
                        </button>
                    </li>
                 }
                 return <li key={key} className="toolRow">
                    <Link to={val.link && val.link.startsWith('/') ? val.link : `/${val.link}`} className="toolLink">
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