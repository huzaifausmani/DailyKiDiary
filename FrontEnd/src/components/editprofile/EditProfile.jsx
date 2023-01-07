import "./editprofile.css";
import { useState, useRef } from "react";
import { Spin } from "../spin/Spin";

export default function EditProfile({ edituser }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(window.localStorage.getItem("user"))
  );
  var references = useRef(null);
  var flname = currentUser[0]['username'].split(" ");
  var [personData, setPersonData] = useState({
    firstName: flname[0],
    lastName: flname[1],
    pass: currentUser[0]["user_pass"],
  });
  function validateFileExtension(extension) {
    const allowedExt = ["jpg", "jpeg", "png", "mp4"];
    return allowedExt.includes(extension)
  }
  function updateUser(e) {
    e.preventDefault();
    var form = new FormData();
    if (personData.firstName == "") {
      personData.firstName = flname[0];
    }
    if (personData.pass == "") {
      personData.pass = currentUser[0]["user_pass"];
    }
    form.append("fname", personData.firstName);
    form.append('lname', personData.lastName);
    form.append('pass', personData.pass);
    form.append('email', currentUser[0]["email"]);
    var file = references.current.files[0];
    if (file === undefined) {
      form.append("img", "NO-PIC");
    }
    else {
      var ext = references.current.files[0].type.split("/");
      if (validateFileExtension(ext[1]))
        form.append("img", file);
      else
        form.append("img", "NO-PIC");
    }
    var http = new XMLHttpRequest();
    http.open("post", "http://127.0.0.1:5000/edit_profile", true);
    http.send(form);
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        var user = JSON.parse(http.responseText);
        if (user.length > 0) {
          edituser(user);
        }
      }
    }
  }
  function handleChange(e) {
    var name = e.target.name;
    setPersonData({ ...personData, [name]: e.target.value });
  };
  return (
    <>
      <div className="chota-dabba edit">
        <div className="card-body text-black">
          <form onSubmit={updateUser}>
            <div>
              <div className="dir">
                <div className=" form-group editInputs">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="rang form-control form-control-sm"
                    name="firstName"
                    maxLength={15}
                    required
                    value={personData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className=" form-group editInputs">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="rang form-control form-control-sm"
                    name="lastName"
                    maxLength={15}
                    required
                    value={personData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group editInputs">
                  <label>Password</label>
                  <input
                    type="password"
                    className="rang form-control form-control-sm"
                    name="pass"
                    required
                    value={personData.pass}
                    onChange={handleChange}
                    minLength={8}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <div className="col form-group editInputs pr">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    className="rang form-control form-control-sm"
                    ref={references}
                  />
                </div>
              </div>
              <div className="col">
                <center>
                  <button
                    type="submit"
                    className="btn btn-outline-dark editBtn" onClick={updateUser}>
                    Save
                  </button>
                </center>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
