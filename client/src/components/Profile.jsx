import React, { useEffect, useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import apiClient from "../spotify";
const spotify = new SpotifyWebApi();
import ProfileCard from "./ProfileCard";
import { Center, Square, Circle, Heading } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack, Flex, Box } from '@chakra-ui/react'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import UserProfileCard from "./UserProfileCard";

const Profile = () => {
  const location = useLocation();
  const sharedVariable = location.state?.sharedVariable;
  const userData = JSON.parse(localStorage.getItem("userInfo")) 
  const [ageState, setAgeState] = useState("");
  const [artistState, setArtistState] = useState([]);
  const [contactInfoState, setContactInfoState] = useState("");
  const [countryState, setCountryState] = useState("");
  const [emailState, setEmailState] = useState("");
  const [genderState, setGenderState] = useState("");
  const [genreState, setGenreState] = useState([]);
  const [preferredNameState, setPreferredNameState] = useState("");
  const [spotifyDisplayNameState, setSpotifyDisplayNameState] = useState("");
  const [spotifyIdState, setSpotifyIdState] = useState("");
  const [profilePicState, setProfilePicState] = useState("");

  const navigate = useNavigate()

  async function getMainUser() {
    console.log(userData.email);
    const api = await fetch(
      `http://localhost:4000/getSingleUser?keyword=${userData.email}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
    const data = await api.json()
    console.log(data)
    console.log(data.searchedUser.age)
      // .then((res) => res.json())
      // .then(data => console.log(data))
      // .then((data) => {
      //   console.log(data)
        setAgeState(data.searchedUser.age || "");
        setArtistState(data.searchedUser.artists || []);
        setContactInfoState(data.searchedUser.contact_info || "");
        setCountryState(data.searchedUser.country || "");
        setEmailState(data.searchedUser.email || "");
        setGenderState(data.searchedUser.gender || "");
        setGenreState(data.searchedUser.genres || []);
        setPreferredNameState(data.searchedUser.preferred_name || "");
        setSpotifyDisplayNameState(data.searchedUser.spotify_display_name || "");
        setSpotifyIdState(data.searchedUser.spotify_id || "");
        setProfilePicState(data.searchedUser.profile_pic || "");
      // });
  }

  useEffect(() => {
    getMainUser();
  }, []);

  const goToMatches = () => {
    navigate('/matches')
  }

  return (
    <>

    <Header></Header>
    <Center bg='#232136' height="100vh" >

    <VStack  >
<Heading as='h3' color="#eb6f92">My Profile</Heading>
    

    

<UserProfileCard
        name={preferredNameState}
        genres={genreState}

        // subGenres={genreState[(2, 3, 4)]}
        age={ageState}
        country={countryState}
        profilePic={profilePicState}
      />
    </VStack>
    </Center>
      
      {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      onClick={goToMatches}>
        See Matches
      </button> */}

      {/* <h1>{sharedVariable}</h1> */}
    </>
  );
};

export default Profile;
