import Topbar from "../../components/topbar/Topbar";
import Feed from "../../components/feed/Feed";
import "./home.css"
import {Leftbar} from "../../components/leftbar/Leftbar";
import {useState, useReducer, useEffect, useContext} from 'react';
import { UserData } from "../../app";

const initState = {
    displayPage: false,
    displayShare: true,
    content:{},
};

const reducer = (state, action)=>{
    if(action.type == "SHARE"){
        state = {displayPage: false, displayShare: true, displayExplore: false,content:action.payload};
    }
    else if(action.type == "PAGE"){
        state = {displayPage: true, displayShare: false, displayExplore: false,content:action.payload};
    }
    return state;
}

export function Home() {
    const [pages, setPages] = useState([]);
    const [state, setState] = useReducer(reducer, initState);
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem("user")));
    const PageSet = (data)=>{
        setPages(data);
    }
    const handleClick = (htype, page)=>{
        setState({type:htype, payload:page});
    }
    const fetchPages = ()=>{
        var http = new XMLHttpRequest();
        http.open('POST', "http://127.0.0.1:5000/user_pages", true);
        var formdata = new FormData();
        formdata.append("email", currentUser[0].email);
        http.send(formdata);
        http.onreadystatechange = () => {
            if (http.readyState == 4 && http.status == 200) {
              var userPages = JSON.parse(http.responseText);
              if (userPages.length > 0) {
                  setPages(userPages);
            }
        }};
    }
    useEffect(() => {
        fetchPages();
    }, [])
    
    return (
        <>
        <div className="homeContainer">
            <Feed userI={currentUser[0]} setPages={PageSet} toDisplay={state}/>
            <Leftbar clickHandler={handleClick} pages={pages}/>
        </div>
        </>
    )
}
