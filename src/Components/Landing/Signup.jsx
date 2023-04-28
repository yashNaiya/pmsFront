import { Button, IconButton, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import keyImage from '../../Assets/Key.gif'
import { useState } from 'react'
import api from '../../Api';
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Signup = () => {



    const navigate = useNavigate()
    const { id, email } = useParams()
    const [otp, setotp] = useState()
    const [enteredOtp, setenteredOtp] = useState()
    // console.log(id)
    useEffect(() => {
        if (email && id) {
            api.post('/isregistered', { wsId: id, userMail: email })
                .then(res => {
                    if (res.data.registered) {
                        alert('You Have Been Added To New Workspace')
                        navigate('/login')
                    }
                }).catch()
        }
    }, [email, id])
    let defaultemail = ""
    if (email) {
        defaultemail = email
    }
    const [inputs, setinputs] = useState({
        name: "",
        number: "",
        role: "",
        location: "",
        email: defaultemail,
        password: "",
        confirmpassword: ""
    })
    const [otpClick, setotpClick] = useState(false)
    const handleChange = (e) => {
        setinputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSendOtp = () => {
        if (inputs.email) {
            let otp = Math.floor(1000 + Math.random() * 9000);
            console.log(otp)
            setotp(otp)
            setotpClick(true)
            api.post('/sendotp', { otp: otp, to: inputs.email })
                .then()
                .catch()
        } else {
            alert('enter email to get an otp')
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(inputs)

        const { name, email, location, role, password, number, confirmpassword } = inputs
        console.log(inputs)
        if (validator.isStrongPassword(password, {
            minLength: 8, minLowercase: 1,
            minUppercase: 1, minNumbers: 1, minSymbols: 1
        })) {
            if (name && email && password && number && location && role && confirmpassword && enteredOtp) {
                console.log(otp, enteredOtp)
                if (!(password[0] === confirmpassword[0])) {
                    alert("password do not match")
                } else {
                    if (parseInt(enteredOtp) === otp) {
                        api.post("/register", { inputs: inputs, _id: id }, { withCredentials: true })
                            .then(res => {
                                if (res.status === 200) {
                                    alert(res.data.message)
                                    navigate('/login')
                                }
                            }).catch(err => {
                                console.log(err)
                            })
                    } else {
                        alert("Incorrect Otp")
                    }
                }
            } else {
                alert("Invalid Input")
            }
        } else {
            alert('Not A Strong Password')
        }

    }

    return (
        <Box flexWrap={'wrap'} width={'100%'} display={'flex'} sx={{ flexDirection: { xs: 'column', sm: 'row' } }} alignItems={'center'} justifyContent={'space-around'}>
            <Box alignItems={'center'}>
                <img src={keyImage} alt={'...'}></img>
            </Box>
            <Box display={'flex'} justifyContent={'space-around'} alignItems={'center'} width={'50%'} height={'100vh'}>
                <Box width={'60%'} borderLeft={'5px solid #314d78'} borderBottom={'5px solid #314d78'} display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'} minHeight={'90vh'} bgcolor={'grey.main'} borderRadius={5}>
                    <Typography variant='h6'>Sign Up</Typography>
                    <Box minHeight={'80vh'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} alignItems={'center'}>
                        <TextField autoComplete='off' onChange={handleChange} name='name' value={inputs.name} label='name' type={'text'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} name='number' value={inputs.number} label='number' type={'tel'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} name='role' value={inputs.role} label='role' type={'text'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} name='location' value={inputs.location} label='location' type={'text'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        {email ?
                            <TextField label='email' type={'email'} size='small' name='email' sx={{ backgroundColor: 'grey.main', border: 'none' }} disabled value={email}></TextField> :
                            <TextField autoComplete='off' onChange={handleChange} name='email' value={inputs.email} label='email' type={'email'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>}
                        <TextField autoComplete='off' onChange={handleChange} name='password' value={inputs.password} label='password' type={'password'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        <TextField autoComplete='off' onChange={handleChange} name='confirmpassword' value={inputs.confirmpassword} label='confirm password' type={'password'} size='small' sx={{ backgroundColor: 'grey.main', border: 'none' }} ></TextField>
                        {!otpClick && <Button onClick={handleSendOtp}>Send Otp</Button>
                            || <Box marginTop={'1rem'} display='flex' flexDirection={'column'}>
                                <TextField value={enteredOtp} onChange={(e) => { setenteredOtp(e.target.value) }} size='small' label='enter otp'></TextField>
                                <Typography marginY='.2rem' sx={{ ":hover": { cursor: 'pointer' } }} onClick={handleSendOtp} variant='caption'>resend otp</Typography>
                                <Button onClick={handleSubmit} variant='contained'>sign up</Button>
                            </Box>
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Signup
