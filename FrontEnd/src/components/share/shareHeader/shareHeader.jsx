import "./../share.css";
import "./shareHeader.css"


export const ShareHeader = ({userI}) =>{
    return <>
        <div className="nameAndPicWrapper">
            <img src={userI["profile_picture"]} alt="..." className="shareProfileImage" />
            <div className="nameAndEmailWrapper">
                <h4><b>{userI["username"]}</b></h4>
                <p style={{color:"black"}}>{userI["email"]}</p>
            </div>
        </div>
    </>
}