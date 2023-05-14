import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { Add, More, ProfileAdd, SearchNormal, Trash } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import Navigate from '../Navigate'
import Message from './Message'
import api from '../../Api'

const Notification = () => {
    const [rootUser, setrootUser] = useState()
    const [search, setsearch] = useState('')
    useEffect(() => {
        api.get("/profile", { withCredentials: true })
            .then(res => {
                setrootUser(res.data.rootUser)
                // console.log(res.data.rootUser)
            })
    }, [])
    if (rootUser) {

        return (
            <Box>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Navigate />
                    <Box flex={16} paddingY='2rem'>
                        <Stack minHeight={'100vh'} direction={'column'} justifyContent='space-between'>
                            <Box display={'flex'} justifyContent={'flex-end'} flexDirection={'column'} flex={1} paddingY='1rem' paddingX={'3rem'} marginX={'2rem'} borderBottom={'1px solid black'}>
                                <Box display={'flex'} flexDirection={'row'} justifyContent='space-between'>
                                    <TextField
                                        value={search}
                                        onChange={(e) => {
                                            setsearch(e.target.value)
                                        }}
                                        variant='standard'
                                        size='small'
                                        sx={{ backgroundColor: 'grey.main', paddingX: '.5rem', paddingY: '.2rem', borderRadius: '.5rem' }}
                                        placeholder='search'
                                        InputProps={{
                                            disableUnderline: true,
                                            startAdornment: <InputAdornment position="start"><SearchNormal /></InputAdornment>,
                                        }}
                                    />
                                    <Button onClick={() => {
                                        api.post('/clearnotifications', { userId: rootUser._id })
                                            .then(res => {
                                                window.location.reload();
                                            })
                                    }} variant='outlined' sx={{ color: 'black' }}><Trash />Clear All</Button>
                                </Box>
                            </Box>
                            <Box flex={9}>
                                <Box display={'flex'} justifyContent={'flex-end'} flexDirection={'column'} paddingY='1rem' paddingX={'3rem'} marginX={'2rem'}>
                                    {search === '' ? rootUser.notification.map((message, index) =>

                                        <Message rootUser={rootUser} message={message} bg={index % 2 === 0 ? 'primary.main' : 'grey.main'} color={index % 2 === 0 ? '#fff' : '#000'} />

                                        // console.log(message)
                                    ) : rootUser.notification.map((message, index) =>
                                        message.message.includes(search)?
                                        <Message rootUser={rootUser} message={message} bg={index % 2 === 0 ? 'primary.main' : 'grey.main'} color={index % 2 === 0 ? '#fff' : '#000'} />:<></>
                                    )}

                                    {/* <Message />
                                    <Message />
                                    <Message /> */}
                                </Box>
                            </Box>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        )
    }
}

export default Notification
