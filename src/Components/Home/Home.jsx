import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../Api'
import { Box, Stack } from '@mui/material';
import Navigate from '../Navigate';

const Home = () => {
  const [rootUser, setrootUser] = useState()
  const navigate = useNavigate()
  const callHomePage = () => {

    api.get("/home", { withCredentials: true })
      .then(res => {
        setrootUser(res.data.rootUser)
      }).catch((err) => {
        navigate('/login')
      })

  }
  useEffect(() => {
    callHomePage();
  }, [])
  if (rootUser) {
    return (
      <Box>
        <Stack direction={'row'} justifyContent='space-between'>
          <Navigate />
          <Box bgcolor={'grey.main'} flex={16}>
            home page
          </Box>
        </Stack>
      </Box>
    )
  }
}

export default Home
