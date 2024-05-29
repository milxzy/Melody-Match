import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { ChakraProvider } from '@chakra-ui/react'
import * as ReactDOM from 'react-dom/client'
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import Home from "./components/Home";
import ProfileQuestion from "./components/ProfileQuestion.jsx";
import Profile from "./components/Profile";
import SpotifyWebApi from "spotify-web-api-js";
import Standby from "./components/Standby.jsx";
import Matches from "./components/Matches.jsx";
import UserCard from "./components/UserCard.jsx";
import Auth from "./components/Auth.jsx"
import BeLogin from "./components/BeLogin.jsx";
import BeRegister from "./components/BeRegister.jsx";
import MatchesList from "./components/MatchesList.jsx";
import Header from "./components/Header.jsx";

const spotify = new SpotifyWebApi();

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { setClientToken } from "./spotify";
import SignUp from "./components/SignUp.jsx";


function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    window.location.hash = "";
    if (!token && hash) {
      const _token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", _token);
      console.log(_token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return  (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Auth />}></Route>
          
          <Route path="/belogin" element={<BeLogin />}></Route>

          <Route path="/beregister" element={<BeRegister />}></Route>
          <Route path ="/matcheslist" element={<MatchesList />}></Route>
          <Route path="/spotify" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/welcome" element={<Welcome />}></Route>
          <Route path="/profilequestion" element={<ProfileQuestion />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/standby" element={<Standby />}></Route>
          <Route path="/matches" element={<Matches />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </div>
    </Router>
  );
}


//suggested flow
//user sees home page
//user logs in with spotify
//app searches for spotify name in database     MAKE THIS HAPPEN
//if user is found return the user homepage
//if user is not found finish sign up
// return page with matches

export default App;
