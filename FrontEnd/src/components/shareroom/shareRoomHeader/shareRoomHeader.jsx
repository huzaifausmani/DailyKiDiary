import "./../shareroom.css";
import "./shareRoomHeader.css"


export const ShareRoomHeader = ({ userI, roomId }) => {
    return <>
        <div className="roomHead">
            <div className="nameAndPicWrapperRoom">
                <img src={userI["profile_picture"]} alt="..." className="shareProfileImage" />
                <div className="nameAndEmailWrapperRoom">
                    <h4><b>{userI["username"]}</b></h4>
                    <p style={{ color: "black" }}>{userI["email"]}</p>
                </div>
            </div>

            <div className="roomId">
                <span style={{ color: "wheat" }}>Room ID: <span style={{ color: "brown", fontSize: "20px" }}>{roomId}</span> </span>
            </div>
        </div>
    </>
}