import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Landing/Login";
import Signup from "./Components/Landing/Signup";
import Home from './Components/Home/Home'
import Profile from "./Components/Profile/Profile";
import Teams from "./Components/Teams/Teams";
import Mywork from "./Components/Mywork/Mywork";
import Notification from "./Components/Notification/Notification";
import { Box } from "@mui/material";
import InviteBox from "./Components/InviteBox";
import React, { useState } from 'react';
import AppContext from './Components/AppContext';
import AddTeamBox from "./Components/AddTeamBox";

function App() {
  const [invite, setinvite] = useState(false)
  const [team, setteam] = useState(false)

  const toggleTeam = ()=>{
    team?setteam(false):setteam(true)
  }
  const toggleInvite = ()=>{
    invite?setinvite(false):setinvite(true)
  }
  const userSettings = {
    inviteValue : invite,
    teamValue : team,
    toggleTeam,
    toggleInvite
  }
  return (
    <AppContext.Provider value={userSettings}>
    <Box>
      <AddTeamBox/>
      <InviteBox/>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/teams" element={<Teams />}></Route>
        <Route path="/mywork" element={<Mywork />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </Box>
    </AppContext.Provider>
  );
}

export default App;
