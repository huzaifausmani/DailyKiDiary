import { useState, useReducer, useContext, useEffect } from "react";
import "./../css/login-css.css";
import logo from "./../images/dkd.png";
import { MyError } from "./error";
import "./home/home.css";
import { Link, Navigate } from "react-router-dom";
import { Spin } from "../components/spin/Spin";


const reducer = (state, action) => {
  if (action.type == "DISPLAY") {
    state = { ...state, display: true, content: action.payload };
  }
  if (action.type == "OFF") {
    state = { ...state, display: false };
  }
  return state;
};

export const Login = () => {
  var [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedin] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [state, setState] = useReducer(reducer, {
    display: false,
    content: "",
  });
  const fetch = () => {
    var http = new XMLHttpRequest();
    http.open("post", "http://127.0.0.1:5000/login", true);
    var formdata = new FormData();
    formdata.append("email", email);
    formdata.append("pass", pass);
    http.send(formdata);
    setLoading(true);
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        var user = JSON.parse(http.responseText);
        setLoading(false);

        if (user.length > 0) {
          window.localStorage.setItem("user", JSON.stringify(user));
          setLoggedin(true);
        } else {
          setState({ type: "DISPLAY", payload: "INVALID CREDENTIALS" });
        }
      }
    };
  };
  const turnOffError = () => {
    setState({ type: "OFF" });
  };
  const submitForm = (e) => {
    e.preventDefault();
    fetch();
  };
  useEffect(()=>{
    var user = JSON.parse(window.localStorage.getItem("user"));
    if(user !== null){
      setLoggedin(true);
    }
  },[])
  return (
    <>
      {state.display && (
        <MyError content={state.content} turnOff={turnOffError} />
      )}
      <div className="bra-dabba">
        <div className="login-dabba">
          <div className="card-body">
            <div className="text-center">
              <img src={logo} height="15%" width="35%" />
            </div>
            <div className="card-text">
              <form onSubmit={submitForm}>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    className="rang form-control form-control-sm"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="rang form-control form-control-sm"
                    minLength={8}
                    required
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </div>
                <center>
                  {loading ? (
                    <Spin className="goola"/>
                  ) : (
                    <button type="submit" className="btn btn-outline-danger">
                    Login
                    </button>
                  )}
                  
                </center>
                <div className="signup">
                  Don't have an account?
                  <br></br>
                  <Link to="/signup" className="link linkonhover">
                    Create New
                  </Link>
                  {loggedIn && <Navigate to="/dashboard"></Navigate>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
