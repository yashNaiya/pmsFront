import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import keyImage from '../../Assets/Key.gif'
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import api from '../../Api';

const Login = () => {
    const navigate = useNavigate()
    const [inputs, setinputs] = useState({
        email: "",
        password: "",
    })

    const handleChange = (e) => {
        setinputs((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = inputs
        if (email && password) {
            api.post("/login", inputs,
            {withCredentials:true})
                .then(res => {
                    console.log(res.data)
                    if (res.status === 200) {
                        navigate('/home')
                    }
                })
        } else {
            alert("Invalid Credientials")
        }

    }

    return (
        <Box flexWrap={'wrap'} width={'100%'} display={'flex'} sx={{ flexDirection: { xs: 'column', sm: 'row' } }} alignItems={'center'} justifyContent={'space-around'}>
            <Box alignItems={'center'}>
                <img src={keyImage} alt={'...'}></img>
            </Box>
            <Box display={'flex'}  justifyContent={'space-around'} alignItems={'center'} width={'50%'} height={'100vh'}>
                <Box width={'60%'} borderLeft={'5px solid #314d78'} borderBottom={'5px solid #314d78'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'} height={'70%'} bgcolor={'grey.main'}  borderRadius={5}>
                    <Typography variant='h6'>Sign In</Typography>
                    <Box height={'40%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'}>
                        <TextField autoComplete='off' onChange={handleChange} label='email' name='email' value={inputs.email} type={'email'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} label='password' name='password' value={inputs.password} type={'password'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <Button onClick={handleSubmit} variant='contained'>login</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Login
