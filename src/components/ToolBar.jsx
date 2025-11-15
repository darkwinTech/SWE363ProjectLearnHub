import React from "react";
import {toolBarData} from "../toolBarData"
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

export default function ToolBar({openSideBar,sideBarState}) {
    const [toolBar, settoolBars] = useState(toolBarData);
    return (
        <div>
            <div className="menu_icon">
            <button className="menu" onClick={openSideBar}><MenuIcon/></button>
            </div>
            <div className={sideBarState?"toolBar toolBar--open":"toolBar"}>   
                <ul>    
                {toolBar.map((val,key)=>{
                 return <li key={key} className="toolRow">
                     <span className="icon">{val.icon}</span>
                     <span className="title">{val.title}</span>
                  </li>
                 })}
                </ul>
             </div>
             <div className={sideBarState?"pageShadow pageShadow--open":"pageShadow"}></div>
        </div>
    )

}