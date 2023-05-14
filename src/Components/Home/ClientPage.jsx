import { Box, Button, IconButton, TextField, Typography } from '@mui/material'
import { Add, CloseCircle, Edit, Folder, Profile } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import api from '../../Api'
import image from '../../Assets/project.png'
import AppContext from './../AppContext'
import { useContext } from 'react'

const ClientPage = (props) => {
    const myContext = useContext(AppContext);
    // console.log(props.selectedclient)
    const [editdetais, seteditdetais] = useState(false)
    const [editcontacts, seteditcontacts] = useState(false)
    const [customer, setcustomer] = useState()
    const [projects, setprojects] = useState()
    const [requirementList, setrequirementList] = useState([])
    const [users, setusers] = useState([])
    const [manager, setmanager] = useState({ name: "" })
    const [contacts, setcontacts] = useState()
    const [projectadd, setprojectadd] = useState(false)
    const [projectData, setprojectData] = useState({
        name: "",
        due: ""
    })
    useEffect(() => {
        if (props.selectedclient) {
            setcustomer(props.selectedclient)
            setcontacts(props.selectedclient.contacts)
            api.post('/getclientprojects', { projects: props.selectedclient.projects })
                .then(res => { setprojects(res.data) })
                .catch(err => { })
            // setprojects(props.selectedclient.projects)
        }
    }, [])
    useEffect(() => {
        if (props.selectedclient) {
            setcustomer(props.selectedclient)
            setcontacts(props.selectedclient.contacts)
            api.post('/getclientprojects', { projects: props.selectedclient.projects })
                .then(res => { setprojects(res.data) })
                .catch(err => { })
            // setprojects(props.selectedclient.projects)
        }
    }, [props.selectedclient])
    const handleCustomerChanage = (e) => {
        setcustomer((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }
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
    const handleRequirementRemove = (index) => {
        const list = [...requirementList]
        list.splice(index, 1)
        setrequirementList(list)
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
    const handleRequiremetChange = (e, index) => {
        const { name, value } = e.target
        const list = [...requirementList]
        list[index][name] = value
        setrequirementList(list)
    }
    const handleContactChange1 = (e, index) => {
        const { name, value } = e.target
        const list = [...contacts]
        list[index][name] = value
        setcontacts(list)
    }
    const handleContactUpdate = () => {
        // console.log(contacts)
        api.post('/updatecontactsofclient', { contacts: contacts, _id: customer._id })
            .then(res => {
                alert(res.data.message)
                api.post('/readclient', customer)
                    .then(res => {
                        setcustomer(res.data)
                        seteditcontacts(false)
                    })
            })
            .catch(err => { })
    }
    const handledetailChange = () => {
        api.post('/updateclientdetail', customer)
            .then(res => {
                alert(res.data.message)
                api.post('/readclient', customer)
                    .then(res => {
                        setcustomer(res.data)
                        seteditdetais(false)
                    })
            })
            .catch(err => { })
    }
    const handleContactAdd = () => {
        setcontacts([...contacts,
        {
            name: '',
            email: '',
            number: '',
            designation: ''
        }])
    }
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

            } else {
                api.post('/addprojectforclient', { projectData: data, _id: myContext.workspace._id, clientId: customer._id })
                    .then(res => {
                        alert(res.data.message)
                        api.post('/readclient', customer)
                            .then(res => {
                                setcustomer(res.data)
                                api.post('/getclientprojects', { projects: res.data.projects })
                                    .then(res => { setprojects(res.data) })
                                    .catch(err => { })
                            })
                        setprojectadd(false)
                    })
                    .catch(err => { console.log(err) })
            }
        }
    }
    if (projectadd) {
        return (
            <Box>
                <Box textAlign={'right'}>
                    <IconButton onClick={() => {
                        setprojectadd(false)
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
                            sx={{
                                marginBottom: '1rem',
                            }}
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
                                setprojectadd(false)
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
    }
    else {
        if (customer && contacts && projects) {
            return (
                <Box marginY={'4rem'}>
                    <Box display='flex' flexDirection={'row'} justifyContent='space-between'>
                        {editdetais && <TextField variant='standard' onChange={handleCustomerChanage} name='name' value={customer.name} sx={{ marginLeft: '3rem' }}></TextField>
                            || <Typography marginLeft={'3rem'} fontWeight='bold' variant='h4' color={'primary.main'}>{customer.name}</Typography>}
                        <Button onClick={() => { seteditdetais(true) }} variant='outlined' sx={{ color: 'black' }}>edit details<Edit /></Button>
                    </Box>
                    {editdetais &&
                        <Box display='flex' marginTop={'1rem'} flexDirection='column' marginLeft={'3rem'}>
                            <Box>
                                <Typography paddingY={1} marginRight={'5rem'}>Location</Typography>
                                <TextField variant='standard' borderRadius={'.5rem'} width='40%' onChange={handleCustomerChanage} name='location' paddingLeft={3} paddingY={1} value={customer.location} size='small' sx={{ marginBottom: '1rem' }} label='location'></TextField>
                            </Box>
                            <Box>
                                <Typography paddingY={1} marginRight={'5rem'}>Email</Typography>
                                <TextField variant='standard' borderRadius={'.5rem'} width='40%' onChange={handleCustomerChanage} name='email' paddingLeft={3} paddingY={1} value={customer.email} size='small' sx={{ marginBottom: '1rem' }} label='email'></TextField>
                            </Box>
                            <Box>
                                <Typography paddingY={1} marginRight={'5rem'}>Number</Typography>
                                <TextField variant='standard' borderRadius={'.5rem'} width='40%' onChange={handleCustomerChanage} name='number' paddingLeft={3} paddingY={1} value={customer.number} size='small' sx={{ marginBottom: '1rem' }} label='number'></TextField>
                            </Box>
                            <Box>
                                <Typography paddingY={1} marginRight={'5rem'}>Website</Typography>
                                <TextField variant='standard' borderRadius={'.5rem'} width='40%' onChange={handleCustomerChanage} name='website' paddingLeft={3} paddingY={1} value={customer.website} size='small' sx={{ marginBottom: '1rem' }} label='website'></TextField>
                            </Box>
                            <Box width='20%' display='flex' flexDirection={'row'} justifyContent='space-between'>
                                <Button onClick={handledetailChange} variant='contained'>save</Button>
                                <Button onClick={() => { seteditdetais(false); setcustomer(props.selectedclient) }} variant='outlined'>cancel</Button>
                            </Box>
                        </Box>
                        ||
                        <Box display='flex' marginTop={'1rem'} flexDirection='column' marginLeft={'3rem'}>
                            <Box>
                                <Typography paddingY={1} marginRight={'5rem'}>Location</Typography>
                                <Typography borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1} bgcolor={'grey.main'} sx={{ marginBottom: '1rem' }} label='location'>{customer.location} </Typography>
                            </Box>
                            <Box>
                                <Typography paddingY={1} marginRight={'5rem'}>Email</Typography>
                                <Typography borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1} bgcolor={'grey.main'} sx={{ marginBottom: '1rem' }} label='email'>{customer.email}</Typography>
                            </Box>
                            <Box>
                                <Typography paddingY={1} marginRight={'5rem'}>Number</Typography>
                                <Typography borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1} bgcolor={'grey.main'} sx={{ marginBottom: '1rem' }} label='number'>{customer.number}</Typography>
                            </Box>
                            <Box>
                                <Typography paddingY={1} marginRight={'5rem'}>Website</Typography>
                                <Typography borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1} bgcolor={'grey.main'} sx={{ marginBottom: '1rem' }} label='website'>{customer.website}</Typography>
                            </Box>

                        </Box>}
                    <Box marginLeft={'3rem'}>
                        <Box alignItems={'center'} borderBottom={'1px solid black'} sx={{ marginBottom: '1rem' }} display='flex' flexDirection={'row'} justifyContent='space-between'>
                            < Typography fontWeight={'bold'} fontSize='22px' marginTop={'2rem'}> Contacts</Typography >
                            <IconButton onClick={() => { seteditcontacts(true) }}><Edit /></IconButton>
                        </Box>
                        {editcontacts &&
                            <Box>
                                <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
                                    {contacts.map((contact, index) => (
                                        <Box>
                                            <IconButton onClick={() => {
                                                contacts.splice(index, 1)
                                                handleContactUpdate()
                                            }}><CloseCircle /></IconButton>

                                            <Box key={index} bgcolor={'primary.shadow'} borderRadius='.5rem' marginRight={'3rem'} paddingBottom={'1rem'} display='flex' padding='1rem' flexDirection='column'>
                                                <TextField variant='standard' size='small' onChange={(e) => { handleContactChange1(e, index) }} value={contact.name} sx={{ marginY: '1rem' }} label='name' name='name'></TextField>
                                                <TextField variant='standard' size='small' onChange={(e) => { handleContactChange1(e, index) }} value={contact.email} sx={{ marginBottom: '1rem' }} label='email' name='email'></TextField>
                                                <TextField variant='standard' size='small' onChange={(e) => { handleContactChange1(e, index) }} value={contact.number} sx={{ marginBottom: '1rem' }} label='number' name='number'></TextField>
                                                <TextField variant='standard' size='small' onChange={(e) => { handleContactChange1(e, index) }} value={contact.designation} sx={{ marginBottom: '1rem' }} label='designation' name='designation'></TextField>
                                            </Box>
                                        </Box>

                                    ))
                                    }
                                </Box>
                                <Button
                                    onClick={handleContactAdd}
                                    sx={{ textTransform: 'none', justifyContent: 'left' }}><Add />Add</Button>
                                <Box width='20%' m='2rem' display='flex' flexDirection={'row'} justifyContent='space-between'>
                                    <Button onClick={handleContactUpdate} variant='contained'>save</Button>
                                    <Button onClick={() => { seteditcontacts(false); setcontacts(props.selectedclient.contacts) }} variant='outlined'>cancel</Button>
                                </Box>
                            </Box>
                            || <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
                                {contacts.map((contact, index) => (
                                    <Box key={index}  boxShadow= " rgba(50, 50, 93, 0.25) 0px 6px 6px , rgba(0, 0, 0, 0.3) 0px 3px 3px" borderRadius='.5rem' marginRight={'3rem'} paddingBottom={'1rem'} display='flex' marginTop={'1rem'} padding='1rem' flexDirection='column'>
                                        <Typography sx={{ marginY: '1rem' }} label='name' name='name'>Name : {contact.name}</Typography>
                                        <Typography sx={{ marginBottom: '1rem' }} label='email' name='email'>Email : {contact.email}</Typography>
                                        <Typography sx={{ marginBottom: '1rem' }} label='number' name='number'>Number : {contact.number}</Typography>
                                        <Typography sx={{ marginBottom: '1rem' }} label='designation' name='designation'>designation : {contact.designation}</Typography>
                                    </Box>
                                ))

                                }

                            </Box>}
                    </Box>
                    <Box marginLeft={'3rem'}>
                        <Box display='flex' flexDirection={'row'} justifyContent='space-between' borderBottom={'1px solid black'} sx={{ marginBottom: '1rem' }}>
                            < Typography fontWeight={'bold'} fontSize='22px' marginTop={'2rem'} > Projects</Typography >

                        </Box>
                        <Box>
                            <Box display='flex' flexDirection={'row'} flexWrap='wrap'>

                                {projects.map((project, index) => (

                                    <Box key={index} width={'17rem'} sx={{ ":hover": { cursor: 'pointer', boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" } }}
                                        onClick={() => { props.setselectedproject(project); myContext.sethomepage(5)}}  boxShadow=" rgba(50, 50, 93, 0.25) 0px 6px 6px , rgba(0, 0, 0, 0.3) 0px 3px 3px" borderRadius='.5rem' marginRight={'3rem'} display='flex' marginTop={'1rem'} padding='1rem' flexDirection='column'>
                                        <Box m='auto' >
                                            <img src={image} width='150px'></img>
                                        </Box>
                                        <Box borderTop={'1px solid black'}>
                                            <Typography sx={{ marginY: '1rem' }} label='name' name='name'><b>{project.name}</b></Typography>
                                            <Typography sx={{ marginBottom: '1rem' }} label='email' name='email'><b>Manager : </b>{project.manager.name}</Typography>
                                            <Typography sx={{ marginBottom: '1rem' }} label='number' name='number'><b>Members :</b>{project.members.length}</Typography>
                                            <Typography sx={{ marginBottom: '1rem' }} label='designation' name='designation'><b>Due :</b>{project.due.split('T')[0]}</Typography>
                                        </Box>
                                    </Box>
                                ))
                                }
                            </Box>
                            <Box marginTop={'1rem'} display='flex' flexDirection={'row'} justifyContent='flex-end'>
                                <Button
                                    onClick={() => { setprojectadd(true) }}
                                    variant='contained'
                                    sx={{ textTransform: 'none' }}><Add />Add New Project</Button>
                            </Box>
                            <Box marginTop={'1rem'} display='flex' flexDirection={'row'} justifyContent='flex-end'>
                                <Button
                                    onClick={() => { }}
                                    variant='contained'
                                    sx={{backgroundColor:'#ff0000', textTransform: 'none',width:'12rem'}}>Delete Client</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )

        }
    }
}

export default ClientPage
