import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from '../../Api'
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Edit } from 'iconsax-react';
import Navigate from '../Navigate';
import Localimage from '../../Assets/man.png'
import { IconButton } from '@mui/material';

const Profile = () => {
    const SERVER_HOST = process.env.REACT_APP_API_ENDPOINT + '/images/'

    const [rootUser, setrootUser] = useState()
    const [tempImg, settempImg] = useState()
    const [image, setimage] = useState()
    const [imageuploaded, setimageuploaded] = useState(false)
    const navigate = useNavigate()
    const [edit, setedit] = useState(false)
    const callHomePage = () => {

        api.get("/profile", { withCredentials: true })
            .then(res => {
                setrootUser(res.data.rootUser)
            }).catch((err) => {
                navigate('/login')
            })

    }
    useEffect(() => {
        callHomePage();
    }, [])

    const handleChange = (e) => {
        setrootUser((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value]
        }))
    }
    const handleSave = () => {
        console.log(rootUser)
        setedit(false)
        setimageuploaded(false)
        const formdata = new FormData()
        formdata.append('_id',rootUser._id)
        formdata.append('name', rootUser.name)
        formdata.append('number', rootUser.number)
        formdata.append('role', rootUser.role)
        formdata.append('location', rootUser.location)
        formdata.append('email', rootUser.email)
        formdata.append('image', image)
        if(image){
            api.post('/updateprofile', formdata)
                .then(res => {
                    alert(res.data.message)
                })
                window.location.reload(false)
        }else{
            api.post('/updateprofile2', rootUser)
            .then(res => {
                alert(res.data.message)
            })

        }
    }
    const handleSignout = () => {
        localStorage.clear()
        api.post('/signout', { rootUserId: rootUser._id }, { withCredentials: true })
            .then(res => {
                alert(res.data)
            })
        navigate('/')
    }
    if (rootUser) {
        return (
            <Stack direction={'row'} justifyContent='space-between'>
                <Navigate />
                <Box flex={16}>
                    <Stack direction={'column'} spacing={2} justifyContent='space-between'>
                        <Box paddingTop={'3rem'} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'end'}
                            flex={4} bgcolor={'grey.main'}>
                            {!edit && <Box overflow={'hidden'} borderRadius={'50%'} marginLeft={'5rem'} sx={{ translate: '0px 60px' }} border={'4px solid #314d78'}>
                                {rootUser.image==='' && <img src={Localimage} position='center' alt='profile' width={'150'} height={'auto'} />
                                ||
                                <img src={SERVER_HOST+rootUser.image} position='center' alt='profile1' width={'150'} height={'auto'} />
                                }
                            </Box> ||
                                !imageuploaded && 
                                <Box overflow={'hidden'} borderRadius={'50%'} marginLeft={'5rem'} sx={{ translate: '0px 60px' }} border={'4px solid #314d78'}>
                                    <IconButton component="label">
                                        <input hidden name='editImage' accept='image/*' 
                                        onChange={(e) => {
                                            setimageuploaded(true)
                                            settempImg(URL.createObjectURL(e.target.files[0]))
                                            setimage(e.target.files[0])
                                         }} 
                                         value={tempImg} type="file" />
                                        <img src={Localimage} position='center' alt='profile2' width={'150'} height={'auto'} />
                                    </IconButton>
                                </Box>
                                ||
                                imageuploaded && tempImg &&
                                <Box overflow={'hidden'} borderRadius={'50%'} marginLeft={'5rem'} sx={{ translate: '0px 60px' }} border={'4px solid #314d78'}>
                                    <IconButton component="label">
                                        <input hidden name='editImage' accept='image/*' 
                                        onChange={(e) => {
                                            settempImg(URL.createObjectURL(e.target.files[0]))
                                            setimage(e.target.files[0])
                                         }} 

                                          type="file" />
                                        <img src={tempImg} position='center' alt='profile3' width={'150'} height={'auto'} />
                                    </IconButton>
                                </Box>
                            }
                            <Box height={'100%'} paddingX={'5rem'} justifyContent={'space-between'} display={'flex'} flexDirection={'column'}>
                                <Button onClick={handleSignout} sx={{ marginBottom: '2rem' }} variant='contained'>logout</Button>
                                <Button onClick={() => { setedit(true) }} sx={{ marginBottom: '2rem', color: '#000' }} variant='outlined'><Edit /> manage profile</Button>
                            </Box>
                        </Box>

                        {!edit && <Box paddingTop={'4rem'} paddingX={'8rem'} flex={6}>
                            <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                                <Typography paddingY={1} marginRight={'5rem'}>Name</Typography>
                                <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{rootUser.name}</Typography>
                            </Box>
                            <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                                <Typography paddingY={1} marginRight={'5rem'}>Role</Typography>
                                <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{rootUser.role}</Typography>
                            </Box>
                            <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                                <Typography paddingY={1} marginRight={'5rem'}>Email</Typography>
                                <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{rootUser.email}</Typography>
                            </Box>
                            <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                                <Typography paddingY={1} marginRight={'5rem'}>Location</Typography>
                                <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{rootUser.location}</Typography>
                            </Box>
                            <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                                <Typography paddingY={1} marginRight={'5rem'}>Number</Typography>
                                <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{rootUser.number}</Typography>
                            </Box>
                        </Box> ||
                            <Box width={'30%'} paddingY={'4rem'} paddingX={'8rem'} flex={6}>
                                <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                                    <Typography paddingY={1} marginRight={'5rem'}>Name</Typography>
                                    <TextField size='small' value={rootUser.name} name='name' onChange={handleChange} sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}></TextField>
                                </Box>
                                <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                                    <Typography paddingY={1} marginRight={'5rem'}>Role</Typography>
                                    <TextField size='small' value={rootUser.role} name='role' onChange={handleChange} sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}></TextField>
                                </Box>
                                <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                                    <Typography paddingY={1} marginRight={'5rem'}>Email</Typography>
                                    <TextField size='small' value={rootUser.email} name='email' onChange={handleChange} sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}></TextField>
                                </Box>
                                <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                                    <Typography paddingY={1} marginRight={'5rem'}>Location</Typography>
                                    <TextField size='small' value={rootUser.location} name='location' onChange={handleChange} sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}></TextField>
                                </Box>
                                <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                                    <Typography paddingY={1} marginRight={'5rem'}>Number</Typography>
                                    <TextField size='small' value={rootUser.number} name='number' onChange={handleChange} sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}></TextField>
                                </Box>
                                <Button variant='contained' sx={{width:'6rem'}} onClick={handleSave}>save</Button>
                                <Button variant='outlined' sx={{marginLeft:'3rem'}} onClick={()=>{setedit(false)}}>cancel</Button>
                            </Box>
                        }

                    </Stack>
                </Box>
            </Stack>
        )
    }
}

export default Profile
