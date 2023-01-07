import {Friendlist} from "./../freindlist/Friendlist";
import {PersonAdd} from "@mui/icons-material";
import "./findfollowers.css";

export default function Findfollows({people, setFollowed}) {
    function addFollower(){
        var http = new XMLHttpRequest();
        http.open("post", "http://127.0.0.1:5000/follow", true);
        var form = new FormData();
        form.append("email", JSON.parse(window.localStorage.getItem("user"))[0]["email"]);
        form.append("femail", people["email"]);
        http.send(form);
        http.onreadystatechange = function(){
            if(http.readyState == 4 && http.status == 200){
                var data = JSON.parse(http.responseText);
                
                if(data[0] == 0){
                   setFollowed({content:`Following ${people['username']}`, turnOff:false});
                }
                else if(data[0] == 1){
                    setFollowed({content:`Un-Followed ${people['username']} !`, turnOff:false});
                }
                else{
                    setFollowed({content:`Something went Wrong :( `, turnOff:false});
                }
            }
        }
    }
    return (
        <>
        <div className="findWrapper">
            <div className="innerWrapperforfollows">
                <Friendlist content={people}/>
                <PersonAdd className="add" style={{margin: "10px"}} onClick={addFollower}/>
            </div>
        </div>
        </>
    )
}