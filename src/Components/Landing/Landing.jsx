import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import landingImage from '../../Assets/Business.gif'
import { useNavigate } from 'react-router-dom'

const Landing = () => {
    const navigate = useNavigate()
    return (
        <Box>
            <Box width={'100%'} height={'6rem'} display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-end'}
            alignItems={'center'} borderBottom={'5px solid #314d78'}>
                <Button onClick={()=>{navigate('/register')}} sx={{width:'6rem', marginRight:'2rem',backgroundColor:'#fff',color:'#000',":hover":{backgroundColor:'grey.main'}}} variant='contained'>register</Button>
                <Button onClick={()=>{navigate('/login')}} sx={{width:'6rem',marginRight:'3rem'}} variant='contained'>login</Button>
            </Box>
            <Box paddingX={'5rem'} display={'flex'} flexWrap={'wrap'} justifyContent={'space-evenly'} flexDirection={'row'} alignItems={'center'}>
                <Box width={'50%'} alignSelf={'center'}>
                    <Typography variant='h2' fontWeight={'bold'}>Project</Typography>
                    <Typography variant='h2' fontWeight={'bold'}>Management</Typography>
                    <Typography variant='h2' fontWeight={'bold'}>System</Typography>
                </Box>
                <Box alignItems={'center'}>
                    <img src={landingImage} alt={'...'}></img>
                </Box>
            </Box>
        </Box>
    )
}

export default Landing
