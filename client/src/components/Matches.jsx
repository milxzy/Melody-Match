import React, { useEffect, useState } from "react";
import UserCard from './UserCard'
import Header from "./Header";
import ProfileCard from "./ProfileCard";
import { Center, Square, Circle } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Stack, HStack, VStack, Flex, Text, Spinner, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton } from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { userInfo } from "os";




const Matches = () => {

    const [matches, setMatches] = useState([])
    const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    const [allMatchesViewed, setAllMatchesViewed] = useState(false)

    const handleNextMatch = async () => {
      
      //1. get the current user being displayed
      //2 get current user
      //3. send current user to database as a potential match
      //4. Increment the current match index to display the next match
      try {
        const activeUser = JSON.parse(localStorage.getItem("userInfo"))
        console.log(activeUser._id)

        console.log(`i am ${activeUser._id} `  + 'and this is who i like ' + matches[currentMatchIndex]._id)

        fetch(
          'http://localhost:4000/like', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
             body: JSON.stringify({ 
              likedUserId: matches[currentMatchIndex]._id,
              liker: activeUser._id
             }),
          }
        )
      } catch (error){
        console.error(error)
      }
      if (currentMatchIndex === matches.length - 1) {
        setAllMatchesViewed(true);
    } else {
        setCurrentMatchIndex((prevIndex) => prevIndex + 1);
    }
      // setCurrentMatchIndex(currentMatchIndex => (currentMatchIndex + 1) % matches.length);
    };



  
    const handlePreviousMatch = () => {
      // Decrement the current match index to display the previous match
      setCurrentMatchIndex(currentMatchIndex => (currentMatchIndex - 1 + matches.length) % matches.length);
      setAllMatchesViewed(false);
    };
  
    const handleViewMatchesAgain = () => {
      setCurrentMatchIndex(0); // Reset current match index to 0
      setAllMatchesViewed(false); // Reset the state to false
  };




  useEffect(() => {
    // Fetch all users penis boi from your Express API
    const fetchUserProfiles = async () => {
      const activeUser = JSON.parse(localStorage.getItem("userInfo"))
      try {
        const response = await fetch('http://localhost:4000/GetUsers');
        const data = await response.json();
        setMatches(data.users); // Set matches after data is fetched
        setLoading(false); // Set loading to false after data is fetched
    } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false); // Set loading to false in case of error
    }

      // try {
      //   fetch(
      //     'http://localhost:4000/GetUsers', {
      //       method: "GET",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },


         
      //     },
      //     )
      //   .then((response) => response.json())
      //   .then((data) => setMatches(data.users))
      //   .then((data) => console.log(data))
      //   .catch((error) => console.error('Error fetching users:', error));
      // } catch (error) {
      //   console.error('error fetching user profiles', error)
      // }
    }

    fetchUserProfiles()
    console.log(matches)
    
  }, [matches.length]);


    console.log('Matches component is being rendered');

  return (
    <>

    <Header></Header>
    <Center  bg='#232136'>

<Flex direction="column" justifyContent="center" alignItems="center" minHeight="100vh">
            {loading ? (
                <p>Loading...</p>
            ) : matches.length > 0 ? (
                <>
                    <ProfileCard
                        profilePic={matches[currentMatchIndex].profile_pic}
                        name={matches[currentMatchIndex].preferred_name}
                        age={matches[currentMatchIndex].age}
                        handleNextMatch={handleNextMatch}
                        handlePreviousMatch={handlePreviousMatch}
                        genres={matches[currentMatchIndex].genres}
                        id={matches[currentMatchIndex]._id}
                    />
          {allMatchesViewed && (
            <Flex direction="column" alignItems="center" mt={4}>
              <Text fontSize="xl" mb={2}>
                No more matches
              </Text>
              <Button
                onClick={handleViewMatchesAgain}
                colorScheme="teal"
                variant="solid"
              >
                View Matches Again
              </Button>
            </Flex>
          )}
                </>
            ) : (
                <p>No matches found</p>
            )}
        </Flex>
    </Center>
</>
  )
}

export default Matches
