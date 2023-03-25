import { Button, IconButton, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import image from '../Assets/Invite.gif'
import AppContext from './AppContext'
import { useContext } from 'react'
import { CloseCircle } from 'iconsax-react'
import { useState } from 'react'
import api from '../Api'
const InviteBox = () => {

    const [email, setemail] = useState()
    const myContext = useContext(AppContext);
    const id = localStorage.getItem('ws')
    if (myContext.inviteValue) {

        const handleInvite = () => {
            if (email === '') {
                alert("enter the email")
            } else {
                api.post('/sendinvite', { to: email, _id: id })
                    .then(res => {
                        console.log(res.data)
                        // alert(res.messagee)
                    })
                    .catch(err => { console.log(err) })
            }
        }
        return (
            <Box
                boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 20px'}
                position={'absolute'} borderRadius={'.5rem'} marginLeft={'4rem'} marginTop={'8rem'}
                sx={{ zIndex: '10000', transition: 'all 2s ease' }} width={'20rem'} height={'30rem'} bgcolor={'#fff'}
            >
                <Box textAlign={'right'}>
                    <IconButton onClick={myContext.toggleInvite}>
                        <CloseCircle />
                    </IconButton>
                </Box>
                <Box
                    display={'flex'} justifyContent={'space-evenly'}
                    flexDirection={'column'} alignItems={'center'}
                    height={'80%'}>

                    <img alt='' src={image} position='center' width={'50%'}></img>
                    <TextField value={email} onChange={(e) => {
                        setemail(e.target.value)
                    }} size='small' label='email'></TextField>
                    <Button variant='contained' onClick={handleInvite}>Send Invite</Button>
                </Box>
            </Box>
        )
    }
    else {
        return (
            <></>
        )
    }
}

export default InviteBox
