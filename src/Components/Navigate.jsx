import { Box, Button } from '@mui/material'
import React from 'react'
import { Category, Notification, TaskSquare, ProfileAdd, Profile, People } from 'iconsax-react'
import { useNavigate } from 'react-router-dom'

const Navigate = () => {
    const navigate = useNavigate()
    return (
        <Box flex={.8} >
            <Box
            position={'fixed'} height={'100vh'}
            sx={{
                backgroundColor: 'primary.main',
                borderTopRightRadius: '.5rem',
                borderBottomRightRadius: '.5rem'
            }}
            display='flex' justifyContent={'space-around'} flexDirection={'column'}
            >

            <Box height={'40%'} alignItems={'center'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'} >
                <Button>
                    <Category onClick={()=>{navigate('/home')}} color='#fff' size={'2rem'} />
                </Button>
                <Button>
                    <Notification color='#fff' size={'2rem'} />
                </Button>
                <Button>
                    <TaskSquare color='#fff' size={'2rem'} />
                </Button>
            </Box>
            <Box height={'40%'} alignItems={'center'} display={'flex'} justifyContent={'space-evenly'} flexDirection={'column'}>
                <Button>
                    <People color='#fff' size={'2rem'} />
                </Button>
                <Button>
                    <ProfileAdd color='#fff' size={'2rem'} />
                </Button>
                <Button onClick={()=>{navigate('/profile')}}>
                    <Profile variant='Bold' color='#fff' size={'2rem'} />
                </Button>

            </Box>
            </Box>

        </Box>
    )
}

export default Navigate
