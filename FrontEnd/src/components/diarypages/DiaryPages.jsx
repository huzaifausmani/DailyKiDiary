import "./diarypages.css"
import { MoreVert } from "@mui/icons-material";

export function DiaryPages({ userI, content }) {
    return (
        <div className="diarypages">
            <div className="diarypagesWrapper">
                <div className="diaryTop">
                    <div className="dpTLeft">
                        <img src={userI["profile_picture"]} alt="..." className="dpTLImage" />
                        <span className="username">{userI["username"]}</span>
                    </div>
                    {/* <div className="dpTRight">
                        <MoreVert/>
                    </div> */}
                </div>
                <div className="row diaryCenter">
                    <span className="dpText col">{content["content_text"]}</span>
                    <div className="col dpcontent">
                        {(content["content_video_pic"] != "NO-PIC") && (!content["is_content_video"] && <img className="sizer hv" src={content["content_video_pic"]} />)}
                        {(content["content_video_pic"] != "NO-PIC") && (content["is_content_video"] && <video className="video videohv" src={content["content_video_pic"]} controls width="340" height="260" />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
