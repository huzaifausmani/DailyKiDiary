import "./friendlist.css"

export function Friendlist({online, content}) {
    return (
        <div className="frndz">
            <div className="chatfrnd">
                <div className="frndImageCon">
                  {online == "f"?  <img src={content["profile_picture"]} alt="..." className="frndimage" />
                  : <img src={content["profile_picture"]} alt="..." className="frndimagee" />}
                </div>
                <span className="frndname">{content["username"]}</span>
            </div>
        </div>
    )
}