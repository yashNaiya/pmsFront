import { Routes, Route } from "react-router-dom";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Landing/Login";
import Signup from "./Components/Landing/Signup";
import Home from './Components/Home/Home'
import Profile from "./Components/Profile/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/register" element={<Signup/>}></Route>
      <Route path="/home" element={<Home/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
    </Routes>
  );
}

export default App;
