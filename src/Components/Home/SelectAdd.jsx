import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, listItemButtonClasses, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { Add, CloseCircle, Folder, Profile } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import api from '../../Api';
import AppContext from '../AppContext'
import { useContext } from 'react'

const SelectAdd = (props) => {
    const myContext = useContext(AppContext)
    const [value, setValue] = useState('customer');
    const [manager, setmanager] = useState({ name: "" })
    const [contactList, setcontactList] = useState([])
    const [requirementList, setrequirementList] = useState([])
    const [users, setusers] = useState([])
    
    const handleSearchChange = (e) => {
        setmanager(e.target.value)

        if (e.target.value === '') {
            setusers([])
        } else {
            api.post('/users', { _id: props.rootUser._id, wsId: myContext.workspace._id })
                .then(res => {
                    setusers(res.data)
                })
                .catch(err => { })
        }

    }
    const users1 = users.filter(user => {
        return user.name.includes(manager) || user.email.includes(manager)
    })
    const handleRequiremnetAdd = () => {
        setrequirementList([...requirementList,
        {
            name: '',
            desc: '',
        }])
    }
    const handleContactAdd = () => {
        setcontactList([...contactList,
        {
            name: '',
            number: '',
            email: '',
            designation: ''
        }])
    }
    const handleRequirementRemove = (index) => {
        const list = [...requirementList]
        list.splice(index, 1)
        setrequirementList(list)
    }
    const handleContactRemove = (index) => {
        const list = [...contactList]
        list.splice(index, 1)
        setcontactList(list)
    }
    const [customerData, setcustomerData] = useState({
        name: "",
        location: "",
        email: "",
        number: "",
        website: ""
    })
    const [projectData, setprojectData] = useState({
        name: "",
        due: ""
    })
    const [add, setadd] = useState(false)
    //select add page
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    //customer add page

    const handleChange1 = (e) => {
        const { name, value } = e.target
        setcustomerData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }
    const handleContactChange1 = (e, index) => {
        const { name, value } = e.target
        const list = [...contactList]
        list[index][name] = value
        setcontactList(list)
    }
    const handleRequiremetChange = (e, index) => {
        const { name, value } = e.target
        const list = [...requirementList]
        list[index][name] = value
        setrequirementList(list)
    }
    const handleCustomerAdd = () => {
        if (customerData.name == '' || customerData.number == '' || customerData.email == '' || customerData.location == '' || customerData.website == '') {
            alert("Insufficient Information Provided")
            setadd(false)
        } else {
            api.post('/addcustomer', { customerData: customerData, _id: props.selectedworkspacedata._id, contactList:contactList })
                .then(res => {
                    alert(res.data.message)
                    setcustomerData({
                        name: "",
                        location: "",
                        email: "",
                        number: "",
                        website: ""
                    })
                })
                setadd(false)
                .catch(err => { console.log(err) })
        }

    }
    //project add page
    const handleChange2 = (e) => {
        const { name, value } = e.target
        setprojectData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };
    const handleProjectAdd = () => {
        console.log(requirementList)
        console.log(projectData)
        console.log(manager)
        const data = {
            manager: manager,
            info: projectData,
            requirements: requirementList
        }
        if (typeof manager === 'string') {
            alert('select manager for this project')
        } else {
            if (projectData.name == '' || projectData.due == '') {
                alert("Insufficient Information Provided")
                setadd(false)
            } else {
                api.post('/addproject', { projectData: data, _id: props.selectedworkspacedata._id })
                    .then(res => { alert(res.data.message)
                        setadd(false) })
                    .catch(err => { console.log(err) })
            }
        }
    }
    if (add && value === 'customer') {
        return (
            <Box>
                <Box textAlign={'right'}>
                    <IconButton onClick={() => {
                        setadd(false)
                        setcustomerData({
                            name: "",
                            location: "",
                            email: "",
                            number: "",
                            website: ""
                        })
                        setcontactList([
                            {
                                name: '',
                                number: '',
                                email: '',
                                designation: ''
                            }
                        ])

                    }}>
                        <CloseCircle />
                    </IconButton>
                </Box>
                <Typography marginLeft={'3rem'} fontWeight='bold' variant='h4' color={'primary.main'}>Add New Client</Typography>
                <Box display='flex' marginTop={'1rem'} flexDirection='column' width='30%' marginLeft={'3rem'}>
                    <TextField variant='standard' name='name' value={customerData.name} onChange={handleChange1} sx={{ marginBottom: '1rem' }} label='name'></TextField>
                    <TextField variant='standard' name='location' value={customerData.location} onChange={handleChange1} sx={{ marginBottom: '1rem' }} label='location'></TextField>
                    <TextField variant='standard' name='email' value={customerData.email} onChange={handleChange1} sx={{ marginBottom: '1rem' }} label='email'></TextField>
                    <TextField variant='standard' name='number' value={customerData.number} onChange={handleChange1} sx={{ marginBottom: '1rem' }} label='number'></TextField>
                    <TextField variant='standard' name='website' value={customerData.website} onChange={handleChange1} sx={{ marginBottom: '1rem' }} label='website'></TextField>
                </Box>
                <Box marginLeft={'3rem'}>
                    < Typography marginTop={'2rem'} sx={{ marginBottom: '1rem' }}> Contacts</Typography >
                    <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
                        {contactList.map((contact, index) => (
                            <Box key={index} bgcolor={'grey.main'} borderRadius='.5rem' marginRight={'3rem'} paddingBottom={'1rem'} display='flex' marginTop={'1rem'} paddingX='1rem' flexDirection='column'>
                                <Box textAlign={'right'} onClick={() => handleContactRemove(index)}><IconButton><CloseCircle /></IconButton></Box>
                                <TextField variant='standard' onChange={(e) => { handleContactChange1(e, index) }} value={contact.name} sx={{ marginBottom: '1rem' }} label='name' name='name'></TextField>
                                <TextField variant='standard' onChange={(e) => { handleContactChange1(e, index) }} value={contact.email} sx={{ marginBottom: '1rem' }} label='email' name='email'></TextField>
                                <TextField variant='standard' onChange={(e) => { handleContactChange1(e, index) }} value={contact.number} sx={{ marginBottom: '1rem' }} label='number' name='number'></TextField>
                                <TextField variant='standard' onChange={(e) => { handleContactChange1(e, index) }} value={contact.designation} sx={{ marginBottom: '1rem' }} label='designation' name='designation'></TextField>
                            </Box>
                        ))
                        }
                    </Box>
                    <Button
                        onClick={handleContactAdd}
                        sx={{ textTransform: 'none', justifyContent: 'left' }}><Add />Add</Button>

                    <Box marginY={'3rem'} display='flex' flexDirection={'row'} width='30%' justifyContent={'space-between'}>
                        <Button sx={{ textTransform: 'none' }} onClick={handleCustomerAdd} variant='contained'>Add</Button>
                        <Button sx={{ textTransform: 'none' }} variant='outlined'
                            onClick={() => {
                                setadd(false)
                                setcustomerData({
                                    name: "",
                                    location: "",
                                    email: "",
                                    number: "",
                                    website: ""
                                })
                                setcontactList([])
                            }}>Cancel</Button>
                    </Box>
                </Box>

            </Box>
        )


    } else if (add && value === 'project') {
        return (
            <Box>
                <Box textAlign={'right'}>
                    <IconButton onClick={() => {
                        setadd(false)
                        setprojectData({
                            name: "",
                            due: ""
                        })
                        setrequirementList([])
                    }}>
                        <CloseCircle />
                    </IconButton>
                </Box>
                <Box marginLeft={'3rem'}>
                    <Typography fontWeight='bold' variant='h4' color={'primary.main'}>Add New Project</Typography>
                    <Box display='flex' flexDirection='column' width='30%' marginTop={'1rem'}>
                        <TextField variant='standard' name='name' value={projectData.name} onChange={handleChange2} sx={{ marginBottom: '1rem' }} label='name'></TextField>
                        <TextField variant='standard' type={'date'}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                min: new Date().toISOString().split('T')[0]
                            }}
                            name='due'
                            value={projectData.due}
                            onChange={handleChange2}
                            sx={{ marginBottom: '1rem' }}
                            label='due date'>
                        </TextField>
                        <TextField variant='standard' name='manager' onChange={handleSearchChange} sx={{ marginBottom: '1rem' }} label='project manager' value={manager.name}></TextField>
                        {users1.map(user => <div key={user._id}><Box display={'flex'} flexDirection='row' justifyContent={'left'} paddingX='.5rem' marginY='.1rem' sx={{ cursor: "pointer", borderRadius: '0.5rem' }}>
                            <Button fullWidth onClick={() => { setmanager(user) }} sx={{ backgroundColor: 'grey.main', color: "black", textTransform: 'none', justifyContent: 'left' }}>
                                {user.name}
                            </Button>
                            <IconButton onClick={() => {
                                localStorage.setItem("viewedProfile", user._id)
                                window.open("/ProfileView", "_blank")
                            }} sx={{ backgroundColor: '#fff' }}><Profile /></IconButton>
                        </Box></div>)}
                    </Box>
                    <Typography marginTop={'2rem'} sx={{ marginBottom: '1rem' }}>Requiremnets</Typography>
                    <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
                        {
                            requirementList.map((requirement, index) => (
                                <Box key={index} marginRight={'1rem'} marginBottom={'1rem'} display='flex' bgcolor={'grey.main'} paddingX='1rem' paddingBottom={'1rem'} borderRadius={'.5rem'} flexDirection='column'>
                                    <Box onClick={() => handleRequirementRemove(index)} textAlign={'right'}><IconButton><CloseCircle /></IconButton></Box>
                                    <TextField variant='standard' onChange={(e) => { handleRequiremetChange(e, index) }} value={requirement.name} sx={{ marginBottom: '1rem' }} label='name' name='name'></TextField>
                                    <TextField variant='standard' onChange={(e) => { handleRequiremetChange(e, index) }} value={requirement.desc} sx={{ marginBottom: '1rem' }} label='desc' name='desc'></TextField>
                                </Box>
                            ))
                        }
                    </Box>
                    <Button onClick={handleRequiremnetAdd} sx={{ justifyContent: 'left', marginBottom: '1rem' }}><Add />Add</Button>
                    <Box>
                        <Button variant='contained' component="label" sx={{ justifyContent: 'left', marginBottom: '1rem' }}>
                            <Folder />
                            Additional Documnet
                            <input hidden type='file' name='document' accept='.doc, .docx,.ppt, .pptx,.txt,.pdf' />
                        </Button>
                    </Box>
                    <Box marginY={'3rem'} display='flex' flexDirection={'row'} width='30%' justifyContent={'space-between'}>
                        <Button sx={{ textTransform: 'none' }} onClick={handleProjectAdd} variant='contained'>Add</Button>
                        <Button sx={{ textTransform: 'none' }} variant='outlined'
                            onClick={() => {
                                setadd(false)
                                setprojectData({
                                    name: "",
                                    due: ""
                                })
                                setrequirementList([])
                            }}>Cancel</Button>
                    </Box>
                </Box>
            </Box>
        )
    } else {

        return (
            <Box>
                <Box textAlign={'right'}>
                    <IconButton onClick={() => {
                        props.setadd(false)
                    }}>
                        <CloseCircle />
                    </IconButton>
                </Box>
                <Box margin={'4rem'}>
                    <Box display='flex' flexDirection={'column'} height='30vh' justifyContent={'space-between'}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={value}
                                onChange={handleChange}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="customer" control={<Radio />} label="client" />
                                <FormControlLabel value="project" control={<Radio />} label="Project" />
                            </RadioGroup>
                        </FormControl>
                        <Box display='flex' flexDirection={'row'} width='20%' justifyContent={'space-between'}>
                            <Button sx={{ textTransform: 'none' }} onClick={() => { console.log(value); setadd(true) }} variant='contained'>Add</Button>
                            <Button sx={{ textTransform: 'none' }} variant='outlined'
                                onClick={() => {
                                    props.setadd(false)
                                }}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default SelectAdd
