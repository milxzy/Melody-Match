import React from "react";
import { useState, useEffect } from "react";
import apiClient from "../spotify";
import { useNavigate } from "react-router";

const Standby = () => {
   const [searchTerm, setSearchTerm] = useState('')
   const [ageState, setAgeState] = useState('')
   const [artistState, setArtistState] = useState('')
   const [contactInfoState, setContactInfoState] = useState('')
   const [countryState, setCountryState] = useState('')
   const [emailState, setEmailState] = useState('')
   const [genderState, setGenderState] = useState('')
   const [genreState, setGenreState] = useState([])
   const [preferredNameState, setPreferredNameState] = useState('')
   const [spotifyDisplayNameState, setSpotifyDisplayNameState] = useState('')
   const [spotifyIdState, setSpotifyIdState] = useState('')
   const [profielePicState, setProfilePicState] = useState('')
   const [ultimateState, setUltimateState] = useState([])
   

const navigate = useNavigate()

   useEffect(() => {

    async function getUsername() {
      try {
        const myProfileResponse = await apiClient.get('me');
        const username = myProfileResponse.data.id;
        setSearchTerm(username);
        return username; // Add this line
      } catch (error) {
        console.error('Error getting username:', error);
      }
    }
    getUsername()
  
  }, []);
  useEffect(() => {
    async function checkDB() {
      console.log(searchTerm)
      console.log(`checking on ${searchTerm}`);
      const sharedVariable = searchTerm
      if(searchTerm !==''){
        await fetch(
         ` http://localhost:4000/databaseLookup?keyword=${searchTerm}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
           }
         )
         .then((res) => res.json())
         .then(console.log('front'))
         .then((data) => {
          console.log(data)
          if(data == 'found'){
            console.log('user found')
            navigate('/profile', {state: {sharedVariable}})
          } else {
            console.log('user not found')
            navigate('/welcome')
            
          }
         })
          //  .then((res) => res.json())
          //  .then((data) => {
          //    console.log(data)
          //    const age = data.age
          //    const artists = data.artists
          //    const contact_info = data.contact_info
          //    const country = data.country
          //    const email = data.email
          //    const gender = data.gender
          //    const genres = data.genres
          //    const preferred_name = data.preferred_name
          //    const spotify_display_name = data.spotify_display_name
          //    const spotify_id = data.spotify_id

          //    console.log(email)
          //    setAgeState(age)
          //    setArtistState(artists)
          //    setContactInfoState(contact_info)
          //    setCountryState(country)
          //    setEmailState(email)
          //    setGenderState(gender)
          //    setGenreState(genres)
          //    setPreferredNameState(preferred_name)
          //    setSpotifyDisplayNameState(spotify_display_name)
          //    setSpotifyIdState(spotify_id)

          //  })
          //  .catch((error) => {
          //    window.alert(error);
          //    return;
          // });
      }
    }
     checkDB()
   }, [searchTerm])

   useEffect(() => {
    const sharedVariable = 'hello'
     console.log(ageState, artistState, contactInfoState, countryState, contactInfoState, countryState,
       emailState, genderState, genreState, preferredNameState, spotifyDisplayNameState, spotifyIdState )
       console.log('Ultimate state' + ultimateState)
    //    if(ultimateState == []){
    //    navigate('/welcome')
    //  } else {
    //   //  navigate('/profile', {state: {sharedVariable}} )
    //    navigate('/profile')
    //  }

   }, [spotifyIdState])


  return (
    <>
      <h1>Loading</h1>
    </>
  );
};

//idea here
//make spotify fetch request to get spotify username
//search db for the username :::::: DONE
//if match, go to home. if no match, go to welcome :::::: DO NOW

export default Standby;
