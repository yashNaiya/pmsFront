import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, Menu, MenuItem, Radio, RadioGroup, Select, TextField, Typography } from '@mui/material'
import { height, Stack } from '@mui/system'
import { AddCircle, ArrowDown2, ArrowRight2, Edit, Message, People, Profile } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import api from '../../Api'
import Task from './Task'
import AppContext from '../AppContext'
import { useContext } from 'react'

const Group = (props) => {
    const myContext = useContext(AppContext)
    useEffect(() => {
        let ws = localStorage.getItem('ws')
        setwsId(ws)
    }, [])

    const [wsId, setwsId] = useState()
    const [open, setopen] = useState(true)
    const [status, setstatus] = useState()
    const [taskData, settaskData] = useState({
        name: '',
        due: ''
    })
    const [owner, setowner] = useState({ name: "" })
    const [requirement, setrequirement] = useState()
    const [addTaskBox, setaddTaskBox] = useState(false)
    const [ownerType, setownerType] = useState("")
    const [users, setusers] = useState([])
    const [teams, setteams] = useState([])
    // console.log()
    const handleSearchChange = (e) => {
        setowner(e.target.value)

        if (e.target.value === '') {
            setusers([])
        } else {
            api.post('/projectmembers', { _id:props.project._id})
                .then(res => {
                    setusers(res.data.users)
                })
                .catch(err => { })
        }

    }
    const handleSearchChange2 = (e) => {
        setowner(e.target.value)

        if (e.target.value === '') {
            setteams([])
        } else {
            api.post('/projectmembers', {_id:props.project._id})
                .then(res => {
                    setteams(res.data.teams)
                })
                .catch(err => { })
        }

    }
    const teams1 = teams.filter(team => {
        return team.name.includes(owner)
    })
    const users1 = users.filter(user => {
        return user.name.includes(owner)
    })

    const handleClickOpen2 = () => {
        setaddTaskBox(true);
    };


    const handleClose2 = (event, reason) => {
        if (reason !== 'backdropClick') {
            setaddTaskBox(false);
        }
        setrequirement()
        setstatus()
        settaskData({
            name: '',
            due: ''
        })
    };

    if (props.group && props.project) {
        console.log(props.group.tasks)
        return (
            <Box marginY='1.5rem'>
                <Button onClick={() => setopen(!open)} sx={{ textTransform: 'none', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{open ? <ArrowDown2 /> : <ArrowRight2 />}{props.group.name}</Button>
                <Dialog fullWidth disableEscapeKeyDown open={addTaskBox} onClose={handleClose2}>
                    <DialogTitle>Add Task</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-evenly", flexWrap: 'wrap' }}>
                            <TextField value={taskData.name} sx={{ marginBottom: '1rem' }}
                                onChange={(e) => {
                                    const { value, name } = e.target
                                    settaskData((prevState) => ({
                                        ...prevState,
                                        [name]: value
                                    }))
                                }
                                }
                                placeholder='item name' name='name' size='small'></TextField>
                            <TextField value={taskData.due} name='due'
                                type={'date'}
                                sx={{ marginBottom: '1rem' }}
                                onChange={(e) => {
                                    const { value, name } = e.target
                                    settaskData((prevState) => ({
                                        ...prevState,
                                        [name]: value
                                    }))
                                }
                                }
                                inputProps={{
                                    min: new Date().toISOString().split('T')[0]
                                }}
                                placeholder='due' size='small'></TextField>
                            <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
                                <InputLabel id="demo-simple-select-label">Linked To</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={requirement}
                                    label="Linked To"
                                    onChange={(e) => setrequirement(e.target.value)}
                                >
                                    {
                                        props.project.requirements.map((req, index) => (
                                            <MenuItem key={index} value={req.name}>{req.name}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                            <FormControl sx={{ marginBottom: '1rem' }} fullWidth>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={status}
                                    label="Status"
                                    onChange={(e) => setstatus(e.target.value)}
                                >
                                    <MenuItem value={"error"}>Error</MenuItem>
                                    <MenuItem value={"on hold"}>On Hold</MenuItem>
                                    <MenuItem value={"working"}>Working</MenuItem>
                                </Select>
                            </FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={ownerType}
                                onChange={(e) => { setownerType(e.target.value) }}
                            >
                                <FormControlLabel value="team" control={<Radio />} label="team" />
                                <FormControlLabel value="solo" control={<Radio />} label="solo" />
                            </RadioGroup>
                            {!(ownerType === "") && <TextField variant='standard' name='owner'
                                onChange={(e) => {
                                    if (ownerType === 'solo') {
                                        handleSearchChange(e)
                                    } else {
                                        handleSearchChange2(e)
                                    }
                                }}
                                sx={{ marginBottom: '1rem' }} label='owner' value={owner.name}></TextField>}
                            {ownerType === 'solo' && users1.map(user => <div key={user._id}><Box display={'flex'} flexDirection='row' justifyContent={'left'} paddingX='.5rem' marginY='.1rem' sx={{ cursor: "pointer", borderRadius: '0.5rem' }}>
                                <Button fullWidth onClick={() => { setowner(user) }} sx={{ backgroundColor: 'grey.main', color: "black", textTransform: 'none', justifyContent: 'left' }}>
                                    {user.name}
                                </Button>
                                <IconButton onClick={() => {
                                    localStorage.setItem("viewedProfile", user._id)
                                    window.open("/ProfileView", "_blank")

                                }} sx={{ backgroundColor: '#fff' }}><Profile /></IconButton>
                            </Box></div>)
                                ||
                                teams1.map(team => <div key={team._id}><Box display={'flex'} flexDirection='row' justifyContent={'left'} paddingX='.5rem' marginY='.1rem' sx={{ cursor: "pointer", borderRadius: '0.5rem' }}>
                                    <Button fullWidth onClick={() => { setowner(team) }} sx={{ backgroundColor: 'grey.main', color: "black", textTransform: 'none', justifyContent: 'left' }}>
                                        {team.name}
                                    </Button>
                                    <IconButton onClick={() => {
                                        localStorage.setItem("viewedTeam", team._id)
                                        window.open("/TeamView", "_blank")
                                    }} sx={{ backgroundColor: '#fff' }}><Profile /></IconButton>
                                </Box></div>)
                            }
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose2}>Cancel</Button>
                        <Button variant='contained'
                            onClick={() => {
                                console.log(owner)
                                if (requirement && status && ownerType && taskData.name && taskData.due) {

                                    api.post('/addtask',
                                        {
                                            manager:props.project.manager,
                                            projectId: props.project._id,
                                            groupId: props.group._id,
                                            requirement: requirement,
                                            status: status,
                                            ownerType: ownerType,
                                            owner: owner,
                                            name: taskData.name,
                                            due: taskData.due
                                        }).then(res => {
                                            handleClose2()
                                            props.reloadProject()
                                        }).catch()
                                } else {
                                    alert("insufficient data provided")
                                    handleClose2()
                                }
                            }}>Add</Button>
                    </DialogActions>
                </Dialog>
                
                {open && <Box paddingBottom={'.6rem'} border={'2px solid #223554'} borderRadius='1rem' margin='auto' width='80%'  >
                    <Stack sx={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }} bgcolor={'grey.main'} p='.2rem' margin={'auto'} width={'100%'} direction={'row'} justifyContent='space-between'>
                        {props.rootUser._id.toString()===props.project.manager._id.toString()
                        
                        && <Box textAlign={'center'} flex={1}></Box>}
                        <Box textAlign={'center'} flex={5}><Typography>Item</Typography></Box>
                        <Box textAlign={'center'} flex={2}></Box>
                        <Box textAlign={'center'} flex={2}><Typography>Owner</Typography></Box>
                        <Box textAlign={'center'} flex={2}><Typography>Status</Typography></Box>
                        <Box textAlign={'center'} flex={3}><Typography>Due</Typography></Box>
                        <Box textAlign={'center'} flex={3}><Typography>Linked To</Typography></Box>
                    </Stack>
                    {props.group.tasks.map((task, index) => (
                        <Task group={props.group} project={props.project} rootUser={props.rootUser} key={index} task={task} />
                    ))}
                    {props.project.manager._id.toString() === props.rootUser._id.toString() && <IconButton onClick={() => { handleClickOpen2() }} sx={{ marginLeft: '1.2%',color:'primary.main' }}><AddCircle /></IconButton>}
                </Box>
                    ||
                    <Box>
                    </Box>
                }
            </Box>
        )
    }
}

export default Group
