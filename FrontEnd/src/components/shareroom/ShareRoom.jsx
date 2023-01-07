import "./shareroom.css"
import { useEffect, useState } from 'react';
import { PermMedia } from "@mui/icons-material";
import { ShareRoomHeader } from "./../shareroom/shareRoomHeader/shareRoomHeader";
import { useRef } from "react";
import io from 'socket.io-client';

var socket = io.connect("http://127.0.0.1:5001/");


export default function ShareRoom({ userI, roomId }) {
    const [pageContent, setPageContent] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [isPublic, setPublic] = useState(false);
    const [fileName, setFileName] = useState("Upload Image/Video");
    const reference = useRef(null);
    const handleSubmit = (e) => {
        e.preventDefault();
        const http = new XMLHttpRequest();
        http.open("post", "http://127.0.0.1:5000/user_diary", true);
        var form = new FormData();
        if (pageContent != "") {
            form.append("pageContent", pageContent);
            form.append("isPublic", isPublic);
            var file = reference.current.files[0];
            if (file === undefined) {
                form.append("file", "NULL");
                form.append("isFile", false);
            }
            else {
                var fileext = file.type.split("/")[1];
                if (validateFileExtension(fileext)) {
                    form.append("file", file);
                    form.append("isFile", true);
                    if (fileext == "mp4") {
                        form.append("isvideo", true);
                    }
                    else {
                        form.append("isvideo", false);
                    }
                }
                else {
                    form.append("file", "NULL");
                    form.append("isFile", false);
                }
            }
            form.append("email", userI["email"]);
            http.send(form);
            http.onreadystatechange = function () {
                if (http.readyState == 4 && http.status == 200) {
                    var res = JSON.parse(http.responseText);
                    setPageContent("");
                }
            }
        }
    }
    function validateFileExtension(extension) {
        const allowedExt = ["jpg", "jpeg", "png", "mp4"];
        return allowedExt.includes(extension)
    }
    const hFileChange = () => {
        var file = reference.current.files[0].name;
        var ext = reference.current.files[0].type.split("/");
        console.log(ext[1]);
        if (validateFileExtension(ext[1]))
            setFileName(file);
        else
            setFileName("Invalid Format");
    }
    const handlePageContent = (e) => {
        var text = e.target.value;
        setCharCount(text.length);
        var limit = 700;
        if (pageContent.length < limit) {
            setPageContent(text);
            socket.emit("updateText", { inputText: text, room: roomId });
        }
        else {
            if (text.length <= limit)
                setPageContent(text);
            else {
                console.log("page limit");
            }
        }
    }
    useEffect(() => {
        socket.emit("joinRoom", { roomID: roomId, inputText: pageContent });
        socket.emit("getPreviousPage", { roomID: roomId, inputText: pageContent });
        socket.on("message", function (data) {
            setPageContent(data["inputText"]);
        })
        return () => {
            socket.emit("leaveRoom", { roomID: roomId, inputText: pageContent })
        }
    }, [])
    return (

        <form onSubmit={handleSubmit}>
            <div className="shareRoom">
                <div className="shareRoomWrapper">
                    <ShareRoomHeader userI={userI} roomId={roomId} />
                    <hr className="shareHr" />
                    <div className="shareTop">
                        <textarea name="pageContent" value={pageContent} onChange={handlePageContent} className="shareInput" placeholder="Combine Your Thoughts...!"></textarea>
                    </div>
                    <hr className="shareHr" />
                    <div className="shareBottom">
                        <div className="shareOptions">
                            <div className="shareOption">
                                <label htmlFor="fileInput">
                                    <PermMedia htmlColor="tomato" className="shareIcon" />
                                    <span className="shareOptionText">{fileName}</span>
                                </label>
                                <input type="file" id="fileInput" className="shareOptionText" hidden ref={reference} onChange={hFileChange} />
                            </div>
                        </div>
                        <div>
                            <input type="checkbox" id="check" name="ispublic" value="true" onChange={() => { setPublic(!isPublic) }} />
                            <label htmlFor="check">Make Public</label>
                        </div>
                        <p className="pageCount count">{charCount}/700</p>
                        <button type="submit" className="btn shareButton">Share</button>
                    </div>
                </div>
            </div>
        </form>
    )
}
