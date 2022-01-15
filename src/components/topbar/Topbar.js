import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { NavLink } from 'react-router-dom';
import history from "../../history";
export default function Topbar() {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span onClick={()=>{
            history.push('/');
          }} className="logo bg-white text-black">زمرد</span>
        </div>
  
      </div>
    </div>
  );
}
