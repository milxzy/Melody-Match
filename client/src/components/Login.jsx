import React from 'react'

import { loginUrl } from '../spotify'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Center, Square, Circle } from '@chakra-ui/react'
import Header from './Header';

const Login = () => {

  const removePriorKey = () => {
    localStorage.removeItem(token)
  }
  return (
<>
    <Center bg='#232136' h='100vh'>
    <div className='login'>
        <img src="" alt="" />
      {/* Spotify Logo */}

      {/* <a href={loginUrl}>LOGIN WITH SPOTIFY</a> */}
      <Button colorScheme='green' onClick={removePriorKey}><a href={loginUrl}>LOGIN WITH SPOTIFY</a></Button>
    </div>
</Center>
</>
  )
}

export default Login
