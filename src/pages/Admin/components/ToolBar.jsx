import React from "react";
import {toolBarData} from "../ToolBarData"
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";


export default function ToolBar({openSideBar,sideBarState}) {
    const [toolBar, settoolBars] = useState(toolBarData);
    const navigate = useNavigate();

    return (
        <div>
            <div className="menu_icon">
            <button className="menu" onClick={openSideBar}><MenuIcon/></button>
            </div>

            <div className={sideBarState?"toolBar toolBar--open":"toolBar"}>   
                
                <ul>    
                {toolBar.map((val,key)=>{
                 return (
                            <li 
                                key={key} 
                                className="toolRow"
                                onClick={() => navigate(val.link)}   // ←← هنا السحر
                            >
                                <span className="icon">{val.icon}</span>
                                <span className="title">{val.title}</span>
                            </li>
                        );
                 })}
                </ul>
                
             </div>
             <div className={sideBarState?"pageShadow pageShadow--open":"pageShadow"}></div>
        </div>
    )

}