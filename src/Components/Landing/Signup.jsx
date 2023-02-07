import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import keyImage from '../../Assets/Key.gif'

const Signup = () => {
    return (
        <Box flexWrap={'wrap'} width={'100%'} display={'flex'} sx={{ flexDirection: { xs: 'column', sm: 'row' } }} alignItems={'center'} justifyContent={'space-around'}>
            <Box alignItems={'center'}>
                <img src={keyImage} alt={'...'}></img>
            </Box>
            <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} width={'50%'} height={'100vh'}>
                <Box width={'60%'} borderLeft={'5px solid #314d78'} borderBottom={'5px solid #314d78'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'} height={'70%'} bgcolor={'grey.main'} borderRadius={5}>
                    <Typography variant='h6'>Sign Up</Typography>
                    <Box height={'70%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'}>
                        <TextField label='name' type={'text'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField label='number' type={'number'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField label='email' type={'email'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField label='password' type={'password'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField label='confirm password' type={'password'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <Button variant='contained'>sign up</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Signup
