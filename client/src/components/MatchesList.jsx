import React, { useEffect, useState } from 'react';
import { Box, VStack, Heading, Image, Badge, Text, Flex, Button, Center, Stack, IconButton } from '@chakra-ui/react';
import { FaHeart, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Header from './Header';
import MatchesCard from './MatchesCard'

const MatchesList = ({  }) => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate()

  const goBack = () => {
    navigate('/profile')
  }

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex - 5);
  };

  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 5);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("userInfo")
    const userInfo = JSON.parse(storedData)
    const userId = userInfo._id
    console.log(userId)

    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:4000/getMatches/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        const data = await response.json()
        console.log(data)
        setMatches(data.matches);
      } catch (error) {
        console.log('error fetching matches')
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  return (
    <>
      <Header />
      <Box bg='#232136' minHeight="100vh">
        <Heading as="h3" textAlign="center" color="#eb6f92">Matches</Heading>
        <VStack spacing={4} p="4">
          {matches && Array.isArray(matches) && matches.map((match, index) => (
            <Box key={index}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
              position="relative"
              width="400px"
              maxW="sm"
              bg="#908caa"
              borderColor="#908caa"
            >
              <Flex justifyContent="center" alignItems="center" p="2">
                <Image src={match.profile_pic} alt={`${match.preferred_name}'s picture`} boxSize="50px" borderRadius="full"></Image>
              </Flex>

              <Flex mt="2" justifyContent="space-between" alignItems="center">
                <Box fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
                  {match.preferred_name}, {match.age}
                </Box>
              </Flex>

              <Text mt="2" color="gray.500">
                {match.country}
              </Text>

              <Stack mt="2" spacing={1}>
                {Array.isArray(match.genres) ? match.genres.slice(currentIndex, currentIndex + 5).map((genre, index) => (
                  <Badge key={index} borderRadius="full" px="2" colorScheme="blue">
                    {genre}
                  </Badge>
                )) : null}
              </Stack>

              {match.genres.length > 5 && (
                <Flex mt="2" justifyContent="space-between">
                  <IconButton
                    aria-label="Previous"
                    icon={<FaChevronLeft />}
                    onClick={handlePrevClick}
                    isDisabled={currentIndex === 0}
                  />
                  <IconButton
                    aria-label="Next"
                    icon={<FaChevronRight />}
                    onClick={handleNextClick}
                    isDisabled={currentIndex + 5 >= match.genres.length}
                  />
                </Flex>
              )}

              <Text>Contact Info: {match.contact_info}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </>
  );
};

export default MatchesList;