import "./message.css"

export default function Message({ own, content, user }) {
    const name = user["username"].split(" ");
    return (
        <div className={own ? "msg own" : "msg"}>
            <div className="msg-top">
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span className="user">{name[0]}</span>
                    <img src={user["profile_picture"]} alt="" className="msgimage" /></div>
                <p className="para">{content}</p>
            </div>
        </div>
    )
}