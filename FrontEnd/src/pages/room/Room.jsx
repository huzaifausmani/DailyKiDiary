import React, { useState } from 'react';
import { JoinRoom } from '../../components/joinroom/JoinRoom';
import ShareRoom from '../../components/shareroom/ShareRoom';

export default function Room() {
    var [currentuser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem("user"))[0]);
    var [roomId, setRoomID] = useState(0);
    var [state, setState] = useState(true);
    return <>
        {state ? <JoinRoom setState={setState} setRoomID={setRoomID} /> : <ShareRoom userI={currentuser} roomId={roomId} />}
    </>;
}
