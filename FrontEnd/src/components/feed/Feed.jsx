import reactDom from "react-dom";
import {DiaryPages} from "../diarypages/DiaryPages"
import Share from "../share/Share"
import "./feed.css";
import {useEffect, useState} from 'react';

export default function Feed({userI, setPages, toDisplay}) {
    return (
        <div className="feed">
            <div className="feedWrapper">
                {toDisplay.displayShare && <Share userI={userI} setPages={setPages}/>}
                {toDisplay.displayPage && <DiaryPages userI={userI} content={toDisplay.content}/>}
            </div>
        </div>
    )
}