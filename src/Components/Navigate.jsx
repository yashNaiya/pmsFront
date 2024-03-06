import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Category, Notification, TaskSquare, ProfileAdd, Profile, People } from 'iconsax-react'
import { useNavigate } from 'react-router-dom'
import AppContext from './AppContext'
import { useContext } from 'react'
import api from '../Api'

const Navigate = () => {
    const [rootUser, setrootUser] = useState()
    useEffect(() => {
        api.get("/home", { withCredentials: true })
        .then(res => {
          setrootUser(res.data.rootUser)})
    }, [])
    
    const navigate = useNavigate()
    const myContext = useContext(AppContext);
    if(rootUser && myContext.workspace){
        return (
            <Box sx={{ zIndex: '1000' }} m={0} flex={.8} >
                <Box
                    position={'fixed'} height={'100vh'}
                    sx={{
                        backgroundColor: 'primary.main',
                       
                    }}
                    display='flex' justifyContent={'space-around'} flexDirection={'column'}
                >
    
                    <Box height={'40%'} alignItems={'center'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'} >
                        <Button>
                            <Category onClick={() => { navigate('/home') }} color='#fff' size={'2rem'} />
                        </Button>
                        <Button onClick={() => { navigate('/notification') }}>
                            <Notification color='#fff' size={'2rem'} />
                        </Button>
                        <Button onClick={() => { navigate('/mywork') }}>
                            <TaskSquare color='#fff' size={'2rem'} />
                        </Button>
                    </Box>
                    <Box height={'40%'} alignItems={'center'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'}>
                        <Button>
                            <People onClick={() => { navigate('/teams') }} color='#fff' size={'2rem'} />
                        </Button>
                        {rootUser._id === myContext.workspace.admin &&
                            <Button onClick={myContext.toggleInvite}>
                                <ProfileAdd color='#fff' size={'2rem'} />
                            </Button>}
                        <Button onClick={() => { navigate('/profile') }}>
                            <Profile variant='Bold' color='#fff' size={'2rem'} />
                        </Button>
    
                    </Box>
                </Box>
    
            </Box>
        )
    }else{
        return (
            <Box sx={{ zIndex: '1000' }} m={0} flex={.8} >
                <Box
                    position={'fixed'} height={'100vh'}
                    sx={{
                        backgroundColor: 'primary.main',
                    }}
                    display='flex' justifyContent={'space-around'} flexDirection={'column'}
                >
    
                    <Box height={'40%'} alignItems={'center'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'} >
                        <Button>
                            <Category onClick={() => { navigate('/home') }} color='#fff' size={'2rem'} />
                        </Button>
                        <Button disabled onClick={() => { navigate('/notification') }}>
                            <Notification color='#fff' size={'2rem'} />
                        </Button>
                        <Button disabled onClick={() => { navigate('/mywork') }}>
                            <TaskSquare color='#fff' size={'2rem'} />
                        </Button>
                    </Box>
                    <Box height={'40%'} alignItems={'center'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'}>
                        <Button disabled>
                            <People onClick={() => { navigate('/teams') }} color='#fff' size={'2rem'} />
                        </Button>
                        {
                            <Button disabled onClick={myContext.toggleInvite}>
                                <ProfileAdd color='#fff' size={'2rem'} />
                            </Button>}
                        <Button onClick={() => { navigate('/profile') }}>
                            <Profile variant='Bold' color='#fff' size={'2rem'} />
                        </Button>
    
                    </Box>
                </Box>
            </Box>
        )

    }
}

export default Navigate
