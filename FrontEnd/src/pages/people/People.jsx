import Findfollows from "../../components/findfollowers/Findfollows";
import Searchbar from "../../components/searchbar/Searchbar";
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
import "./people.css";
import {useState} from 'react';
import {MyAlert} from './../alert';

export default function People() {
    var [peopleArry, setPeople] = useState([]);
    var [followed, setFollowed] = useState({content:"", turnOff:true});
    function setTurnOFF(){
        setFollowed({content:"", turnOff:true});
    }
    return (
        <>
        {!followed["turnOff"] && <MyAlert content={followed["content"]} turnOff={setTurnOFF}/>}
        <div className="peopleWrapper">
            <div className="centerlize">
                <Searchbar setPeople={setPeople}/>
                <div className="expost">
                    <div className="alineNew">
                    {peopleArry.map((people)=>{
                        return <Findfollows key={people["email"]} people={people} setFollowed={setFollowed}/> 
                    })}
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}