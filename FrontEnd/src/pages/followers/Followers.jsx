import "./../explore/explore.css"
import { useState, useContext, useEffect } from 'react';
import { FollowerPosts } from "./../../components/Followerposts/FollowerPosts";
import logo from "./../../images/followerEnd.gif"

export function Followers() {
  const [pages, setPages] = useState([]);
  const [currentUser, setCurrentUser] = useState(JSON.parse(window.localStorage.getItem("user")));
  const fetchPages = () => {
    var http = new XMLHttpRequest();
    http.open('POST', "http://127.0.0.1:5000/follower_pages", true);
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
            return <FollowerPosts key={page.page_id} content={page} />
          })
            : <></>}
          <div className="followerEnd">
            <img src={logo} alt="..." style={{ borderRadius: "300px", width: "400px", height: "400px" }} />
          </div>
        </div>
      </div>
    </>
  )
}
