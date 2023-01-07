import Rightchat from "../../components/rightchat/Rightchat.jsx"
import "./chat.css"

export default function Chat() {
    // const socket = io.connect("http://127.0.0.1:5001/")
    // socket.on('connect', function() {
    //     socket.emit('join_room', {data: 'React is now Connected!'});
    // });
    // socket.on("connected", (data)=>{console.log(data);});
    return (
        <div className="chat">
            <Rightchat/>
        </div>
    )
}