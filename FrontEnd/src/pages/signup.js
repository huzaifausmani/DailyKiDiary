import "./../css/login-css.css";
import { useState, useRef, useReducer } from "react";
import { MyError } from "./error";
import { Link, Navigate } from "react-router-dom";
import { Spin } from "../components/spin/Spin";
import { fontSize } from "@mui/system";

const reducer = (state, action) => {
  if (action.type == "DISPLAY") {
    state = { ...state, display: true, content: action.payload };
  }
  if (action.type == "OFF") {
    state = { ...state, display: false };
  }
  return state;
};

export const Signup = () => {
  var references = useRef(null);
  var [loading, setLoading] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [state, setState] = useReducer(reducer, {
    display: false,
    content: "",
  });
  var [personData, setPersonData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    gender: "",
    dob: "",
    pass: "",
  });
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setPersonData({ ...personData, [name]: value });
  };
  const submitUser = (e) => {
    e.preventDefault();
    var http = new XMLHttpRequest();
    http.open("post", "http://127.0.0.1:5000/register", true);
    var form = new FormData();
    form.append("fname", personData.firstName);
    form.append("lname", personData.lastName);
    form.append("email", personData.email);
    form.append("pass", personData.pass);
    form.append("dob", personData.dob);
    form.append("gender", personData.gender);
    form.append("loc", personData.location);
    form.append("add", personData.location);
    var file = references.current.files[0];
    form.append("img", file);
    http.send(form);
    setLoading(true);
    http.onreadystatechange = function () {
      if (http.readyState == 4 && http.status == 200) {
        var user = JSON.parse(http.responseText);
        setLoading(false);
        if (user.length > 0) {
          setSignedUp(true);
        } else {
          setState({ type: "DISPLAY", payload: "ALREADY REGISTERED !" });
        }
      }
    };
  };
  const turnOffError = () => {
    setState({ type: "OFF" });
  };
  return (
    <>
      {state.display && (
        <MyError content={state.content} turnOff={turnOffError} />
      )}
      <div className="bra-dabba">
        <div className="chota-dabba">
          <div className="card-body" >
            <h4 className="text-danger text-center">Welcome <span style={{fontSize:"medium"}}>to</span></h4>
            <h3 className="text-danger text-center">Daily کی Diary</h3>
            <div className="card-text">
              <form onSubmit={submitUser}>
                <div className="row">
                  <div className="col form-group">
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
                  <div className="col form-group">
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
                  <div className="row"></div>
                  <div className="col form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      className="rang form-control form-control-sm"
                      name="email"
                      required
                      value={personData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      className="rang form-control form-control-sm"
                      name="location"
                      required
                      value={personData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col form-group">
                    <label>Gender</label>
                    <br />
                    <input
                      type="radio"
                      defaultValue="Male"
                      name="gender"
                      onChange={handleChange}
                    />
                    <label style={{ fontSize: "smaller" }}>Male</label>
                    <input
                      type="radio"
                      defaultValue="Female"
                      name="gender"
                      onChange={handleChange}
                    />
                    <label style={{ fontSize: "smaller" }}>Female</label>
                    <input
                      type="radio"
                      defaultValue="Other"
                      name="gender"
                      onChange={handleChange}
                    />
                    <label style={{ fontSize: "smaller" }}>Other</label>
                    <br />
                  </div>
                  <div className="col form-group">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      className="rang form-control form-control-sm"
                      name="dob"
                      required
                      value={personData.dob}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="rang form-control form-control-sm"
                    name="pass"
                    minLength={8}
                    required
                    value={personData.pass}
                    onChange={handleChange}
                  />
                </div>
                <div className="col form-group">
                  <label>Profile Picture</label>
                  <input
                    type="file"
                    className="rang form-control form-control-sm"
                    ref={references}
                  />
                </div>
                <center>
                  {loading ? (
                    <Spin className="goola"/>
                  ) : (
                    <button type="submit" className="btn btn-outline-danger" style={{marginTop:"30px"}}>
                      Sign Up
                    </button>
                  )}
                </center>
              </form>
                <div className="verify">
                <span>⚠️ You will be able to use your account after <b>Email Verification</b></span>
                </div>
              {signedUp && <Navigate to="/" />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
