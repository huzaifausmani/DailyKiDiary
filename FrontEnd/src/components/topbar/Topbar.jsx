import "./topbar.css"
import {Explore, Wysiwyg, AddToPhotos, People, Chat, Notifications, TravelExplore} from "@mui/icons-material"
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

export function Topbar() {
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem("user")));
    const [loggedOut, setLogout] = useState(false);
    function logout(){
        window.localStorage.removeItem("user");
        setLogout(true);
    }
    return (
        <>
        <h2 className="logo p-1">
            Daily کی Diary
            {/* <span style={{color: "wheat"}}>D</span>
            <span style={{color: "tomato"}}>a</span>
            <span style={{color: "blue"}}>i</span>
            <span style={{color: "blue"}}>l</span>
            <span style={{color: "yellowgreen"}}>y</span>
            <span style={{color: "yellowgreen"}}>کی</span>
            <span style={{color: "wheat"}}>D</span>
            <span style={{color: "wheat"}}>i</span>
            <span style={{color: "tomato"}}>a</span>
            <span className="text-danger">r</span>
            <span className="text-danger">y</span> */}
        </h2>
        <div className="topbarContainer">
                    <div className="topbarIconItem">
                        <Link to="/dashboard/explore">
                            <TravelExplore className="c-t"/>
                        </Link>
                    </div>
                    <div className="topbarIconItem">
                        <Link to="/dashboard/followers">
                            <GroupsOutlinedIcon className="c-f"/>
                        </Link>
                    </div>
                    <div className="topbarIconItem">
                        <Link to="/dashboard/home">
                            <Wysiwyg className="c-b"/>
                        </Link>
                    </div>
                    <div className="topbarIconItem">
                        <Link to="/dashboard/people">
                        <People className="c-g"/>
                        </Link>
                    </div>
                    <div className="topbarIconItem">
                        <Link to="/dashboard/chat">
                        <Chat className="c-p"/>
                        </Link>
                    </div>
                    <div className="topbarIconItem">
                        <Link to="/dashboard/room">
                        <ConnectWithoutContactIcon className="c-ro"/>
                        </Link>
                    </div>
                    <div className="topbarIconItem" onClick={logout}>
                        <LogoutIcon className="c-br"/>
                    </div>
                    <Link to="/dashboard/profile">
                        <img src={currentUser[0]["profile_picture"]} alt="..." className="topbarImage" />
                    </Link>
                </div>
                {loggedOut && <Navigate to="/"/>}
        </>
    )
}
