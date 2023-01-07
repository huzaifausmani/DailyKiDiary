// import Friendlist from "../../components/friendlist/Friendlist"
import "./explore.css"
import { useState, useContext, useEffect } from 'react';
import { ExplorePost } from "./../../components/Exploreposts/ExplorePost";
import exploreEnd from "./../../images/exploreEnd.gif"

export function Explore() {
  const [pages, setPages] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem("user")));
  const fetchPages = () => {
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:5000/public_pages", true);
    var formdata = new FormData();
    formdata.append("email", currentUser[0].email);
    http.send(formdata);
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        var userPages = JSON.parse(http.responseText);
        if (userPages.length > 0) {
          setPages(userPages);
        }
      }
    };
  }
  useEffect(() => {
    fetchPages();
  }, [])

  return (
    <>
      <div className="expost ">
        <div className="aline ">

          {pages.length != 0 ? pages.map((page) => {
            return <ExplorePost key={page.page_id} content={page} />
          })
            : <></>}
          <div className="followerEnd" >
            <img src={exploreEnd} alt="..." style={{ borderRadius: "300px", width: "400px", height: "400px" }} />
          </div>
        </div>
      </div>
    </>
  )
}
