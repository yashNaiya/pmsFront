import { Stack } from '@mui/material'
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
  useEffect(() => {
    let ws = localStorage.getItem('ws')
    setwsId(ws)
  }, [])
  
  const [wsId, setwsId] = useState()
  const [users, setusers] = useState()
  const [tempteam, settempteam] = useState()
  const [rootUser, setrootUser] = useState()
  const [myTeams, setmyTeams] = useState()
  const [allTeams, setallTeams] = useState()
  useEffect(() => {
    api.get("/profile", { withCredentials: true })
            .then(res => {
                setrootUser(res.data.rootUser)
                api.post('/myteams',{rootUser:res.data.rootUser})
                .then(res=>{
                  setmyTeams(res.data)
                })
                .catch(err=>{})
            }).catch((err) => {
                
            })
    api.get('/allteams')
    .then(res=>{setallTeams(res.data)})

  }, [])

  useEffect(() => {
    if(rootUser && wsId){
      api.post('/users',{_id:rootUser._id,wsId:wsId})
      .then(res=>{
        setusers(res.data)
      })
      .catch(err=>{})
    }
  }, [rootUser])
  
  
  const [page, setpage] = useState(0)
  const myContext = useContext(AppContext)
  if(!myContext.teamValue){
    return (
      <Box>
          <Stack direction={'row'} justifyContent='space-between'>
            <Navigate/>
            <Box flex={16}>
            <Stack direction={'row'} justifyContent='space-between'>
              <Sidebarteams settempteam={settempteam} myTeams={myTeams} allTeams={allTeams} rootUser={rootUser} setpage={setpage}/>
              {page===1 && <ApprovePage/>
              ||
              page===0 && <Teamsmain users={users} rootUser={rootUser} tempteam={tempteam}/>
              ||
              page===2 && <AllUsers users={users}/>
              }
            </Stack>
            </Box>
          </Stack>
        </Box>
    )
  }
  else{
    return(
      <Box>
          <Stack direction={'row'} justifyContent='space-between'>
            <Navigate />
            <Box flex={16}>
            
            </Box>
          </Stack>
        </Box>
    )
  }
}

export default Teams
