import { Box, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import api from '../Api'
import Localimage from '../Assets/man.png'


const ProfileView = () => {
    const [user, setuser] = useState()
    useEffect(() => {
        const _id = localStorage.getItem("viewedProfile")
        if (_id) {
            api.post('/readuser', { _id: _id })
                .then(res => { setuser(res.data) })
                .catch(err => { })
        }
    }, [])

    const SERVER_HOST = process.env.REACT_APP_API_ENDPOINT + '/images/'

    window.addEventListener("beforeunload", (ev) => {
        ev.preventDefault();
        localStorage.removeItem("viewedProfile")
        return ev.returnValue = 'Are you sure you want to close?';
    });
    if (user) {
        return (
            <Stack direction={'column'} spacing={2} justifyContent='space-between'>
                <Box paddingTop={'3rem'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'end'}
                    flex={4} bgcolor={'grey.main'}>
                    <Box overflow={'hidden'} borderRadius={'50%'} marginLeft={'5rem'} sx={{ translate: '0px 60px' }} border={'4px solid #314d78'}>
                        {user.image === '' && <img src={Localimage} position='center' alt='profile' width={'150'} height={'auto'} />
                            ||
                            <img src={SERVER_HOST + user.image} position='center' alt='profile1' width={'150'} height={'auto'} />
                        }
                    </Box>
                </Box>

                <Box paddingTop={'4rem'} paddingX={'8rem'} flex={6}>
                    <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                        <Typography paddingY={1} marginRight={'5rem'}>Name</Typography>
                        <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{user.name}</Typography>
                    </Box>
                    <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                        <Typography paddingY={1} marginRight={'5rem'}>Role</Typography>
                        <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{user.role}</Typography>
                    </Box>
                    <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                        <Typography paddingY={1} marginRight={'5rem'}>Email</Typography>
                        <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{user.email}</Typography>
                    </Box>
                    <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                        <Typography paddingY={1} marginRight={'5rem'}>Location</Typography>
                        <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{user.location}</Typography>
                    </Box>
                    <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                        <Typography paddingY={1} marginRight={'5rem'}>Number</Typography>
                        <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{user.number}</Typography>
                    </Box>
                </Box>

            </Stack>
        )
    } else {
        return (
            <Typography>loadind...</Typography>
        )
    }
}

export default ProfileView
