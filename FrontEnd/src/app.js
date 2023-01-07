import React from 'react';
import {BrowserRouter  as Router, Route, Routes} from 'react-router-dom';
import { useState } from 'react';
import {Login} from "./pages/login";
import {Signup} from "./pages/signup";
import { DashBoard } from './pages/dashboard';

export var UserData = React.createContext(null);

export function App(){
  // const [currentUser, setCurrentUser] = useState({});
  return (
    // <UserData.Provider value={{currentUser, setCurrentUser}}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route path="/dashboard/*" element={<DashBoard/>}/>
        <Route path=" * "/>
      </Routes>
    </Router>
    // </UserData.Provider>
  );
}