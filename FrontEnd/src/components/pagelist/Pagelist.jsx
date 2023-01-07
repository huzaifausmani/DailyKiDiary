import "./pagelist.css"
import {AutoStories} from "@mui/icons-material"

export function PageList(props) {
    return (
        <ul className="pagelist" onClick={()=>{props.clickHandler("PAGE", props.page)}}>
            <li className="pagenumber">
                <AutoStories className="icon"/>
                <span className="p">{props.number}</span>
            </li>
        </ul>
    )
}