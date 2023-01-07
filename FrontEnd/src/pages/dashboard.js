import { Topbar } from "./../components/topbar/Topbar";
import { Explore } from "./../pages/explore/Explore";
import { Home } from "./../pages/home/Home";
import {Followers} from "./../pages/followers/Followers"
import Chat from "./chat/Chat";
import People from "./people/People";
import Profile from "./profile/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Room from "./room/Room";

export function DashBoard() {
  return (
    <>
      <Topbar />
      <Routes>
        <Route exact path="/" element={<Explore />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/explore" element={<Explore />} />
        <Route exact path="/followers" element={<Followers/>} />
        <Route exact path="/chat" element={<Chat />} />
        <Route exact path="/room" element={<Room />} />
        <Route exact path="/people" element={<People />} />
        <Route exact path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
