import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import keyImage from '../../Assets/Key.gif'
import { useState } from 'react'
import api from '../../Api';
import validator from 'validator'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
    const navigate = useNavigate()
    const [inputs, setinputs] = useState({
        name: "",
        number: "",
        role:"",
        location:"",
        email: "",
        password: "",
        confirmpassword:""
    })
    const handleChange = (e)=>{
        setinputs((prevState) => ({
            ...prevState,
            [e.target.name]: [e.target.value]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs)
        const { name, email,location,role, password, number,confirmpassword } = inputs
        if (validator.isStrongPassword(password[0], {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
          })) {
            if (name && email && password && number&& location && role && confirmpassword) {
                console.log(password, confirmpassword)
                if(!(password[0]===confirmpassword[0])){
                    alert("password do not match")
                }else{
                    api.post("/register",inputs, {withCredentials:true})
                        .then(res => {
                            if(res.status===200){
                                alert(res.data.message)
                                navigate('/home')
                            }
                        })
                }
            } else {
                alert("Invalid Input")
            }
          } else {
            alert('Is Not Strong Password')
          }

    }

    return (
        <Box flexWrap={'wrap'} width={'100%'} display={'flex'} sx={{ flexDirection: { xs: 'column', sm: 'row' } }} alignItems={'center'} justifyContent={'space-around'}>
            <Box alignItems={'center'}>
                <img src={keyImage} alt={'...'}></img>
            </Box>
            <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} width={'50%'} height={'100vh'}>
                <Box width={'60%'} borderLeft={'5px solid #314d78'} borderBottom={'5px solid #314d78'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'} height={'80%'} bgcolor={'grey.main'} borderRadius={5}>
                    <Typography variant='h6'>Sign Up</Typography>
                    <Box height={'80%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'}>
                        <TextField autoComplete='off' onChange={handleChange} name='name' value={inputs.name} label='name' type={'text'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} name='number' value={inputs.number} label='number' type={'tel'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} name='email' value={inputs.email} label='email' type={'email'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} name='role' value={inputs.role} label='role' type={'text'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} name='location' value={inputs.location} label='location' type={'text'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} name='password' value={inputs.password} label='password' type={'password'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} name='confirmpassword' value={inputs.confirmpassword} label='confirm password' type={'password'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <Button onClick={handleSubmit} variant='contained'>sign up</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Signup
