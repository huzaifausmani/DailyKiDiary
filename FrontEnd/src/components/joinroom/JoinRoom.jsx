import React, { useRef } from 'react';
import "./joinroom.css"
import "./../../css/bootstrap.min.css"

export function JoinRoom({ setState, setRoomID }) {
    const references = useRef(null);
    function createPage() {
        setState(false);
        var roomId = Math.floor(Math.random() * 100);
        setRoomID(roomId);

    }
    function joinPage() {
        let roomID = references.current.value;
        roomID = parseInt(roomID);
        setRoomID(roomID);
        setState(false);
    }
    return <>
        <div className="room">
            <div className="roomWrapper">
                <div className="div1">
                    <input placeholder="Page ID" className="roomtextfield" type="number" ref={references} />
                    <button className="btn btn-outline-danger upr" onClick={joinPage}>Join Page</button>
                </div>
                <button className="createroom btn btn-outline-danger" onClick={createPage}>Create New Page</button>
            </div>
        </div>
    </>;
}
