import "./leftbar.css";
import {PageList} from "./../pagelist/Pagelist";

export function Leftbar({clickHandler, pages}) {
    return (
        <div className="left">
            {pages.length !=0 ? (<div className="style">
                <ul className="shape">
                    <button className="btn-danger" onClick={()=>{clickHandler("SHARE", pages.page)}}>New+</button>
                    {pages.map((page)=>{
                        <hr className="hr1"></hr>
                        return <li key={page.page_id}><PageList number={pages.findIndex(p=>p==page)+1} clickHandler={clickHandler} page={page}/></li>
                    })}
                </ul>
            </div>): <></>}
        </div>
    )
}