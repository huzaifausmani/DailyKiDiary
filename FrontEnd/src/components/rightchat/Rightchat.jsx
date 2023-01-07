import Message from "../message/Message";
import "./rightchat.css";
import {ClearAll} from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';
import { useState, useRef, useEffect } from "react";

var socket = io.connect("http://127.0.0.1:5001/");

export default function Rightchat() {
    const references = useRef(null);
    const chatBox = useRef(null);
    var user = JSON.parse(window.localStorage.getItem("user"))[0];
    user = {...user, user_pass:"******"};

    var [messageList, setMessageList] = useState([]);
    useEffect(() => {
        socket.on('connect', function(){
            socket.emit('enterWorldChat', {currentUser:user});
        });
        socket.on('userEnteredChat', function(data){
            console.log(`${data["username"]} enterred Chat`);
        });
        socket.emit('getPrevoiusText');
        socket.on("sendPrevious", (data)=>{
            setMessageList([...data]);
        })
    },[])
    function sendText(e){
        e.preventDefault();
        var text = references.current.value;
        references.current.value = "";
        socket.emit("sendText", {currentUser:user, message:text});
        socket.on("message", function(data){
            setMessageList([...data]);
        })
    }
    useEffect(()=>{
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
    })
    return (
        <>
        <div className="outerwrapper">  
        <div className="chatwindow">
            <div className="chatwindowWrapper">
                <div className="ch">
                {/* <h5 className="chatheader">{user["username"]}</h5> */}
                <h5 className="chatheader">WorldChat</h5>
                <ClearAll className="clearAll"></ClearAll>
                </div>
                <div className="chatwindowtop" ref={chatBox}>
                    {messageList.map((message, index)=>{
                        return <Message key={index} own={true?message["currentUser"]["email"]==user["email"]:false} content={message["message"]} user={message["currentUser"]}/>
                    })}
                </div>
                <form onSubmit={sendText}>
                    <div className="chatwindowbottom">
                            <input className="msgInput" placeholder="Write Something ..." ref={references}></input>
                            <SendIcon className="btnn" onClick={sendText}/>
                    </div>
                </form>
            </div>
        </div>
        </div>
        </>
    )
}