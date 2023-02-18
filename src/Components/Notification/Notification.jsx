import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { Add, More, ProfileAdd, SearchNormal, Trash } from 'iconsax-react'
import React from 'react'
import Navigate from '../Navigate'
import Message from './Message'

const Notification = () => {
    return (
        <Box>
            <Stack direction={'row'} justifyContent='space-between'>
                <Navigate />
                <Box flex={16} paddingY='2rem'>
                    <Stack minHeight={'100vh'} direction={'column'} justifyContent='space-between'>
                        <Box display={'flex'} justifyContent={'flex-end'} flexDirection={'column'} flex={1} paddingY='1rem' paddingX={'3rem'} marginX={'2rem'} borderBottom={'1px solid black'}>
                            <Box display={'flex'} flexDirection={'row'} justifyContent='space-between'>
                                <TextField
                                    variant='standard'
                                    size='small'
                                    sx={{ backgroundColor: 'grey.main',paddingX:'.5rem',paddingY:'.2rem', borderRadius:'.5rem' }}
                                    placeholder='search'
                                    InputProps={{
                                        disableUnderline: true,
                                        startAdornment: <InputAdornment position="start"><SearchNormal /></InputAdornment>,
                                    }}
                                />
                            <Button variant='outlined' sx={{ color: 'black' }}><Trash/>Clear All</Button>
                            </Box>
                        </Box>
                        <Box flex={9}>
                            <Box display={'flex'} justifyContent={'flex-end'} flexDirection={'column'} paddingY='1rem' paddingX={'3rem'} marginX={'2rem'}>
                                <Message/>
                                <Message/>
                                <Message/>
                                <Message/>
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    )
}

export default Notification
