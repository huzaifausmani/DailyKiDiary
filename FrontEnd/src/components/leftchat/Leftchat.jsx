import {Friendlist} from "./../freindlist/Friendlist"
import Searchbar from "../searchbar/Searchbar";
import {useState} from 'react';
import "./leftchat.css"

export default function Leftchat() {
    var [content, setContent] = useState(JSON.parse(window.localStorage.getItem("user"))[0]);
    console.log(content);
    return (
        <div className="friendlist">
            <div className="c-class">
                <Searchbar/>
            </div>
            <div className="freindlistWrapper">
                <Friendlist content={content}/>
                <Friendlist content={content}/>
                <Friendlist content={content}/>
                <Friendlist content={content}/>
                <Friendlist content={content}/>
                <Friendlist content={content}/>
                <Friendlist content={content}/>
                <Friendlist content={content}/>
                <Friendlist content={content}/>
                <Friendlist content={content}/>
                <Friendlist content={content}/>
                <Friendlist content={content}/>
            </div>
        </div>
    )
}