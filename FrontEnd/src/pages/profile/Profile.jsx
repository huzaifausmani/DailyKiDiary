import "./profile.css";
import { useEffect, useState } from "react";
import {
  LocationOn,
  Mail,
  Male,
  Female,
  CalendarToday,
} from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import EditProfile from "../../components/editprofile/EditProfile";

export default function Profile() {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfile] = useState([]);
  const fetchPages = () => {
    var http = new XMLHttpRequest();
    http.open("POST", "http://127.0.0.1:5000/get_followers", true);
    var formdata = new FormData();
    formdata.append("email", currentUser[0].email);
    http.send(formdata);
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        var userData = JSON.parse(http.responseText);
        if (userData.length > 0) {
          setProfile(userData);
        }
      }
    };
  };
  useEffect(() => {
    fetchPages();
  }, []);
  function editUser(data){
    window.localStorage.setItem("user", JSON.stringify(data));
    setCurrentUser(JSON.parse(window.localStorage.getItem("user")));
    window.location.reload();
  }
  function enableEdit(){
    setEditProfile(!editProfile);
  }
  return (
    <>
      <div className="row">
        <div className="col">
          <div className="profile">
            <div className="profileWrapper">
              <div className="profileImg">
                <img
                  src={currentUser[0]["profile_picture"]}
                  alt=""
                  className="pImg"
                />
              </div>
              <div className="coloumss">
                <span className="profileName">
                  {currentUser[0]["username"]}
                </span>
                <div className="underNameWrapper">
                  {profileData.length != 0 ? (
                    <span style={{ fontWeight: "bold" }}>
                      <span className="pd post">
                        Pages{" "}
                        <span style={{ color: "brown" }}>
                          {profileData[2]["page_count"]}
                        </span>
                      </span>
                      <span className="pd follower">
                        Followers{" "}
                        <span style={{ color: "brown" }}>
                          {profileData[1]["user_followers"]}
                        </span>
                      </span>
                      <span className="pd following">
                        Following{" "}
                        <span style={{ color: "brown" }}>
                          {profileData[0]["user_following"]}
                        </span>
                      </span>
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <button className="btn btn-success editProfileBtn" onClick={enableEdit}>
                  <EditIcon/> Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col alignright">
          <div className="userinfoWrapper" style={{ fontWeight: "bold" }}>
            <span className="email i-m">
              <Mail className="infoIcon" /> {currentUser[0]["email"]}
            </span>
            <span className="location i-m">
              {currentUser[0]["gender"] == "Male" ? (
                <Male className="infoIcon" />
              ) : (
                <Female className="infoIcon" />
              )}{" "}
              {currentUser[0]["gender"]}
            </span>
            <span className="location i-m">
              <LocationOn className="infoIcon" /> {currentUser[0]["location"]}
            </span>
            <span className="location i-m">
              <CalendarToday className="infoIcon" /> {currentUser[0]["Dob"]}
            </span>
          </div>
          <div className="userinfoWrapper join">
            <span className="location text-black">
              Joined on{" "}
              <span style={{ color: "wheat" }}>
                {currentUser[0]["date_joined"]}
              </span>
            </span>
          </div>
        </div>
        <div className="centering">
          {editProfile && <EditProfile edituser={editUser}/>}
        </div>
      </div>
    </>
  );
}
