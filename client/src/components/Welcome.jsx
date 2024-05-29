import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// import { getTokenFromUrl } from '../spotify.js'
import SpotifyWebApi from "spotify-web-api-js";
import axios from "axios";
import apiClient from "../spotify";
const spotify = new SpotifyWebApi();

import { Box, VStack, Heading, Image, Badge, Text, Flex, Button, Center, Stack } from '@chakra-ui/react';

const Welcome = () => {

  const [artistState, setArtistState] = useState([])
  const [profileState, setProfileState] = useState([])
  const [genreState, setGenreState] = useState([])
  const [beState, setBeState] = useState([])

  const [userData, setUserData] = useState({
    userSpotifyData: {},
    userSpotifyArtists:{},
    userSpotifyGenres:{}
  })
  const [data, setData] = useState([])

  useEffect(() => {

    async function fetchData() {

      
    const myProfileResponse = await apiClient.get('me');
    const myProfileData = myProfileResponse.data;
    const country = myProfileData.country;
    const email = myProfileData.email;
    const spotifyId = myProfileData.id;
    const displayName = myProfileData.display_name;
    const profilePic = myProfileData.images[0].url;
    console.log(profilePic)
    const profileInfo = [country, email, spotifyId, displayName, profilePic];
    setProfileState(profileInfo);

    const followedArtistsResponse = await apiClient.get('me/following?type=artist');
    const artistData = followedArtistsResponse.data;
    const allGenres = [];
    const followedArtists = [];
    artistData.artists.items.forEach((artist) => {
      if (artist.genres && artist.genres.length > 0) {
        allGenres.push(...artist.genres);
      }
    });
    artistData.artists.items.forEach((artist) => {
      followedArtists.push(artist.name);
    });
    setArtistState(followedArtists);
    setGenreState(allGenres);

  }
  fetchData()

  },[])



 

  const navigate = useNavigate();
  const [text, setText] = useState({
    contactInfo: "",
  });
  const [form, setForm] = useState({
    contactInfo: "",
    preferredName: "",
    age: "",
    gender: "",
    beEmail: "",
    bePass: "",
  });

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const newPerson = {form, artistState, genreState, profileState}
    await fetch("http://localhost:4000/addUserInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPerson),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => {
        window.alert(error);
        return;
      });

    setForm({ contactInfo: "", preferredName: "", age: "", gender: "" });
    navigate("/Profile");
    console.log(newPerson);
  }
  async function onDecline() {

    const response = await fetch("https://api.spotify.com/v1/me", {
      method: "get",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    console.log(data);
  }


  console.log(genreState)
  console.log(artistState)
  console.log(profileState)



  return (
    <>
      <h1>Thank you for joining MelodyMatch</h1>
      <h3>A couple more steps to finalize registration</h3>
      <p>
        This service uses your phone number so that when you match with someone
        you can message them back and forth. If you don't want to give out your
        phone number, that is perfectly fine! Please leave a way for matches to
        contact you, whether it be a phone number, Instagram, or Snapchat! You
        can decline this, but your matches will have no way of reaching you.
      </p>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="contactInfo">Contact Info</label>
          <input
            type="text"
            className="form-control"
            id="contactInfo"
            value={form.contactInfo}
            placeholder="Snapchat / Phone Number / Etc..."
            onChange={(e) => updateForm({ contactInfo: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="preferredName">Preferred Name</label>
          <input
            type="text"
            className="form-control"
            id="preferredName"
            value={form.preferredName}
            placeholder="Preferred Name"
            onChange={(e) => updateForm({ preferredName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age</label>
          <input
            type="text"
            name="age"
            id="age"
            className="form-control"
            value={form.age}
            placeholder="18+"
            onChange={(e) => updateForm({ age: e.target.value })}
          />
        </div>

        <div className="form-group">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="male"
              value="male"
              checked={form.gender === "Male"}
              onChange={(e) => updateForm({ gender: e.target.value })}
            />
            <label className="form-check-label" htmlFor="male">
              Male
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="female"
              value="female"
              checked={form.gender === "Female"}
              onChange={(e) => updateForm({ gender: e.target.value })}
            />
            <label className="form-check-label" htmlFor="female">
              Female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="beyondBinary"
              value="beyondBinary"
              checked={form.gender === "BeyondBinary"}
              onChange={(e) => updateForm({ gender: e.target.value })}
            />
            <label className="form-check-label" htmlFor="beyondBinary">
              Beyond Binary
            </label>
          </div>

        <div className="form-group">
          <label htmlFor="beEmail">Email</label>
          <input
            type="text"
            name="beEmail"
            id="beEmail"
            className="form-control"
            value={form.beEmail}
            placeholder="Email"
            onChange={(e) => updateForm({ beEmail: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="bePass">Pass</label>
          <input
            type="password"
            name="bePass"
            id="bePass"
            className="form-control"
            value={form.bePass}
            placeholder="Password"
            onChange={(e) => updateForm({ bePass: e.target.value })}
          />
        </div>
        </div>

        <input type="submit" value="Submit" className="btn btn-primary" />
        <input
          type="button"
          value="Decline"
          onClick={onDecline}
          className="btn btn-primary"
        />
      </form>
    </>
  );
};

export default Welcome;
