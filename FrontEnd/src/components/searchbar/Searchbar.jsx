import "./searchbar.css"
import { useState } from "react";
import {Search} from "@mui/icons-material"

export default function Searchbar({setPeople}) {
    const [search, setSearch] = useState(""); 
    function handleChange(e){
        var toSearch = e.target.value;
        setSearch(toSearch);
        fetchPeople();
    }
    function formSubmitted(e){
        e.preventDefault();
        setSearch("");
        fetchPeople();
    }
    function fetchPeople(){
        var http = new XMLHttpRequest();
        http.open("post", "http://127.0.0.1:5000/search", true);
        var form = new FormData();
        form.append("name", search);
        form.append("email", JSON.parse(window.localStorage.getItem("user"))[0]["email"]);
        http.send(form);
        http.onreadystatechange = function(){
            if(http.readyState == 4 && http.status == 200){
                var data = JSON.parse(http.responseText);
                setPeople(data);
            }
        }
    }
    return (
        <>
        <form className="formm" onSubmit={formSubmitted}>
            <div className="Smain">
                    <input placeholder="Search..." className="sbar" value={search} onChange={(e)=>{handleChange(e)}}/>        
                <div className="searchDesign">
                    <Search className="icon-s-c" onClick={formSubmitted}/>
                </div>
            </div>
        </form>
        </>
    )
}