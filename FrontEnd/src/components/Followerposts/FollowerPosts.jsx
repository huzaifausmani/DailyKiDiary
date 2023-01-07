import "./../Exploreposts/explorepost.css"
import { Friendlist } from "./../freindlist/Friendlist";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { useState, useRef, useEffect } from 'react';
import VisibilitySensor from 'react-visibility-sensor';

export function FollowerPosts({ content }) {
    const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem("user")));
    const [state, setState] = useState({ "liked": content["liked"], "count": content["count"] });
    const videoRef = useRef(content);
    const [isVisible, setIsVisible] = useState(false);
    function addFavourite() {
        if (!content["liked"]) {
            const http = new XMLHttpRequest();
            http.open("post", "http://127.0.0.1:5000/liked", true);
            var formdata = new FormData();
            formdata.append("email", currentUser[0]["email"]);
            formdata.append("page_id", content["page_id"]);
            http.send(formdata);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {

                }
            }
            setState({ "liked": true, "count": content["count"] + 1 });
        }
        else { console.log("already liked"); }
    }
    useEffect(() => {
        if (isVisible) {
            videoRef.current.play();
        } else {
            if (videoRef.current.play) {
                videoRef.current.pause();
            }
        }
    }, [isVisible]);
    return (
        <>
            <div className="exploreWrapper">
                <div className="other">
                    <div className="card mb-3 clf">
                        <div className="row g-0">
                            {(content["content_video_pic"] != "NO-PIC") ?
                                <div className="col-md-8">
                                    {content["is_content_video"] ?
                                        <VisibilitySensor onChange={(isVisible) => setIsVisible(isVisible)}>
                                            <video ref={videoRef} className="img-fluid roundf" src={content["content_video_pic"]} type='video/mp4' controls loop />
                                        </VisibilitySensor> : <img className="img-fluid roundf" src={content["content_video_pic"]} />}
                                </div>
                                : <></>}
                            <div className={(content["content_video_pic"] != "NO-PIC") ? "col-md-4" : "col-md-14"}>
                                <div className="card-body">
                                    <Friendlist online={"f"} content={content} />
                                    <p className="followerContent">{content["content_text"]}</p>
                                    <div className="likeWrapper" onClick={addFavourite}>
                                        {state.liked ? <Favorite className="liked" /> : <FavoriteBorder className="likelook" />}
                                        <span className="counter">{state.count}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}