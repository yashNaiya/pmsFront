import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../Api'
import { Box, Stack } from '@mui/material';
import Navigate from '../Navigate';
import Sidebar from './Sidebar';
import Homemain from './Homemain';
import InviteBox from '../InviteBox';
import AppContext from './../AppContext'
import { useContext } from 'react'

const Home = () => {
  const myContext = useContext(AppContext);
  const [rootUser, setrootUser] = useState()
  const [add, setadd] = useState(false)
  const [users, setusers] = useState()
  const [teams, setteams] = useState()
  const [isAdmin, setisAdmin] = useState(false)
  const [invitetoproject, setinvitetoproject] = useState(false)
  const [manageProject, setmanageProject] = useState(false)
  const [selectedworkspacedata, setselectedworkspacedata] = useState()
  const [selectedproject, setselectedproject] = useState()
  const [selectedclient, setselectedclient] = useState()
  const [selectedworkspace, setselectedworkspace] = useState()
  const [addworkspace, setaddworkspace] = useState(false)
  const [addproject, setaddproject] = useState(false)
  const [addcustomer, setaddcustomer] = useState(false)
  const [renamews, setrenamews] = useState(false)
  const [deletews, setdeletews] = useState(false)
  const [viewpage, setviewpage] = useState(0)
 


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
    if (myContext.workspace) {
      setselectedworkspacedata(myContext.workspace)
    }
  }, [])

  useEffect(() => {
    if (rootUser && myContext.workspace) {
      api.post('/users', { _id: rootUser._id, wsId: myContext.workspace._id })
        .then(res => {
          setusers(res.data)
        })
        .catch(err => { })
      api.post('/allteams', { wsId: myContext.workspace._id })
        .then(res => {
          setteams(res.data)
        })
        .catch(err => { })

    }
  }, [rootUser, myContext.workspace])

  useEffect(() => {
    if (rootUser && myContext.workspace) {
      // console.log(selectedworkspace)
      if (rootUser._id === myContext.workspace.admin) {
        setisAdmin(true)
        // console.log(isAdmin)
      } else {
        setisAdmin(false)
      }
    }
  }, [myContext.workspace])



  useEffect(() => {
    if (selectedworkspace) {
      api.post('/currentworkspace', selectedworkspace)
        .then(res => {
          setselectedworkspacedata(res.data)
        })
        .catch(err => { })
    }
  }, [selectedworkspace])
  if (rootUser) {

    return (
      <Box>
        <Stack direction={'row'} justifyContent='space-between'>
          <Navigate />
          <Box flex={16}>
            <Stack direction={'row'} justifyContent='space-between'>
              <Sidebar
                setadd={setadd}
                isAdmin={isAdmin}
                setisAdmin={setisAdmin}
                setselectedworkspace={setselectedworkspace}
                setaddworkspace={setaddworkspace}
                addworkspace={addworkspace}
                rootUser={rootUser}
                setviewpage={setviewpage}
                setselectedproject={setselectedproject}
                setselectedclient={setselectedclient}
                selectedworkspacedata={selectedworkspacedata}
                setrenamews={setrenamews}
                setdeletews={setdeletews}
                setmanageProject={setmanageProject}
                setinvitetoproject={setinvitetoproject} />
              <Homemain
                users={users}
                teams={teams}
                isAdmin={isAdmin}
                setdeletews={setdeletews}
                setrenamews={setrenamews}
                renamews={renamews}
                deletews={deletews}
                setadd={setadd}
                manageProject={manageProject}
                invitetoproject={invitetoproject}
                setmanageProject={setmanageProject}
                setinvitetoproject= {setinvitetoproject}
                setviewpage={setviewpage}
                viewpage={viewpage}
                setaddcustomer={setaddcustomer}
                setaddproject={setaddproject}
                setselectedproject={setselectedproject}
                add={add}
                rootUser={rootUser}
                addcustomer={addcustomer}
                addproject={addproject}
                setselectedworkspacedata={setselectedworkspacedata}
                selectedworkspacedata={selectedworkspacedata}
                selectedproject={selectedproject}
                selectedclient={selectedclient} />
            </Stack>
          </Box>
        </Stack>
      </Box>
    )
  }
}

export default Home
