import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../Api'
import { Box, Stack } from '@mui/material';
import Navigate from '../Navigate';
import Sidebar from './Sidebar';
import Homemain from './Homemain';
import InviteBox from '../InviteBox';


const Home = () => {
  const [rootUser, setrootUser] = useState()
  const [add, setadd] = useState(false)
  const [addproject, setaddproject] = useState(false)
  const [addcustomer, setaddcustomer] = useState(false)
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
          <Navigate/>
          <Box flex={16}>
            <Stack direction={'row'} justifyContent='space-between'>
              <Sidebar setadd={setadd} />
              <Homemain setadd={setadd} setaddcustomer={setaddcustomer} setaddproject={setaddproject} add={add} addcustomer={addcustomer} addproject={addproject} />
            </Stack>
          </Box>
        </Stack>
      </Box>
    )
  }
}

export default Home
