import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { Add, More, ProfileAdd, SearchNormal } from 'iconsax-react'
import React from 'react'

const Teamsmain = () => {

    return (
        <Box flex={5}>
            <Stack minHeight={'100vh'} direction={'column'} justifyContent='space-between'>
                <Box display={'flex'} justifyContent={'space-between'} flexDirection={'column'} flex={.5} paddingBottom={'1rem'} paddingX={'1rem'} borderBottom={'1px solid black'}>
                    <Box marginTop={'4rem'} display={'flex'} justifyContent={'space-between'} flexDirection={'row'}>
                        <Typography variant='h5'>Development Team</Typography>
                        <Box>
                            <Button variant='outlined' sx={{ color: 'black' }}><ProfileAdd />invite</Button>
                            <Button sx={{ color: 'black' }}><More /></Button>
                        </Box>
                    </Box>
                    <Box>
                        <TextField
                            variant='standard'
                            size='small'
                            sx={{backgroundColor:'grey.main',borderRadius:'.5rem' ,paddingX:'.5rem',paddingY:'.2rem'}}
                            placeholder='search'
                            InputProps={{
                                disableUnderline: true,
                                startAdornment: <InputAdornment position="start"><SearchNormal /></InputAdornment>,
                            }}
                        />
                    </Box>
                </Box>
                <Box flex={9} paddingY='3rem'>
                    <Box display={'flex'} alignItems='center' flexDirection={'column'} >
                       <Stack direction={'row'} marginBottom='1rem' backgroundColor='grey.main' justifyContent='space-between' width='80%'>
                            <Typography flex={1}>Name</Typography>
                            <Typography flex={1}>Email</Typography>
                            <Typography flex={1}>Number</Typography>
                       </Stack>
                       <Stack direction={'row'} marginBottom='1rem' justifyContent='space-between' width='80%'>
                            <Typography flex={1}>shyam</Typography>
                            <Typography flex={1}>shyam30@gmail.com</Typography>
                            <Typography flex={1}>9081819007</Typography>
                       </Stack>
                    </Box>
                </Box>
            </Stack>
        </Box>
    )
}

export default Teamsmain
