import { Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Navigate from '../Navigate'
import Sidebarteams from './Sidebarteams'
import Teamsmain from './Teamsmain'
import AppContext from '../AppContext'
import { useContext } from 'react'
import ApprovePage from './ApprovePage'
import AllUsers from './AllUsers'
import api from '../../Api'
const Teams = () => {
  const myContext = useContext(AppContext)



  const [wsId, setwsId] = useState()
  const [users, setusers] = useState()
  const [tempteam, settempteam] = useState()
  const [rootUser, setrootUser] = useState()
  const [myTeams, setmyTeams] = useState()
  const [allTeams, setallTeams] = useState()
  const [isAdmin, setisAdmin] = useState(false)

  useEffect(() => {
    let wsId = localStorage.getItem('ws')
    if (wsId) {
      setwsId(wsId)
      api.post('/currentworkspace', { _id: wsId })
        .then(res => {
          myContext.setWorkspace(res.data)
          api.get("/profile", { withCredentials: true })
            .then(res => {
              setrootUser(res.data.rootUser)
              // console.log(res.data.rootUser._id)
              // console.log(myContext.workspace.admin)


            }).catch((err) => {

            })
        })
    }


  }, [])

  // console.log(isAdmin)
  useEffect(() => {
    if (rootUser && wsId) {
      api.post('/users', { _id: rootUser._id, wsId: wsId })
        .then(res => {
          setusers(res.data)
        })
        .catch(err => { })
      api.post('/myteams', { rootUser: rootUser, wsId: myContext.workspace._id })
        .then(res => {
          setmyTeams(res.data)
        })
        .catch(err => { })
      api.post('/allteams', { wsId: myContext.workspace._id })
        .then(res => { setallTeams(res.data); })
      if (rootUser._id === myContext.workspace.admin) {
        setisAdmin(true)
      }

    }

  }, [rootUser])


  const [page, setpage] = useState(0)


  if (!myContext.teamValue && myContext.workspace && myTeams && allTeams) {
    // console.log(myContext.workspace)
    return (
      <Box>
        <Stack direction={'row'} justifyContent='space-between'>
          <Navigate />
          <Box flex={16}>
            <Stack direction={'row'} justifyContent='space-between'>
              <Sidebarteams isAdmin={isAdmin} settempteam={settempteam} myTeams={myTeams} allTeams={allTeams} rootUser={rootUser} setpage={setpage} />
              {page === 1 && <ApprovePage />
                ||
                page === 0 && <Teamsmain isAdmin={isAdmin} users={users} rootUser={rootUser} tempteam={tempteam} />
                ||
                page === 2 && <AllUsers users={users} />
              }
            </Stack>
          </Box>
        </Stack>
      </Box>
    )
  }
  else {
    return (
      <Box>
        <Stack direction={'row'} justifyContent='space-between'>
          <Navigate />
          <Box flex={16} alignItems='center' height='100vh' display='flex' justifyContent={'center'} flexDirection='column'>
            <Typography sx={{ fontFamily: 'Alkatra', opacity: '.4' }} fontSize={'45px'} >Error!!!</Typography>
            <Typography sx={{ fontFamily: 'Alkatra', opacity: '.4' }} fontSize={'45px'}>No workspace selected</Typography>
          </Box>
        </Stack>
      </Box>
    )
  }

}

export default Teams
