import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, IconButton, InputLabel, Menu, MenuItem, Radio, RadioGroup, Select, Stack, TextField, Typography } from '@mui/material';
import { Edit, Message, People, Profile, TaskSquare, Trash } from 'iconsax-react';
import React, { useContext, useEffect, useState } from 'react'
import api from '../../Api';
import AppContext from '../AppContext';
import ChatBox from './ChatBox';
import io from 'socket.io-client'
var socket

const Task = (props) => {
    const [showchat, setshowchat] = useState(false)
    const [req, setreq] = useState({name :'old'})
    const [anchorEl, setAnchorEl] = useState(null)
    const [color, setcolor] = useState()
    const [chat, setchat] = useState()
    const [status, setstatus] = useState(props.task.status)
    const [taskData, settaskData] = useState({
        name: props.task.name,
        due: props.task.due
    })
    const [addTaskBox, setaddTaskBox] = useState(false)
    const [owner, setowner] = useState({ name: props.task.owner.name })
    const [requirement, setrequirement] = useState(props.task.linkedTo)
    const [socketConnected, setSocketConnected] = useState(false);
    const [hasNewMessage, sethasNewMessage] = useState(false)
    const myContext = useContext(AppContext)
    const [ownerType, setownerType] = useState(props.task.ownerType)
    const [users, setusers] = useState([])
    const [teams, setteams] = useState([])
    
    let tempcolor = ''
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
    // useEffect(() => {
    //     console.log(props.project.requirements)
    //     if(props.project && props.task){
    //         props.project.requirements.forEach(obj => {
    //             if(obj._id.toString()===props.task.linkedTo._id.toString()){
    //                 console.log(obj.name)
    //                 setreq(obj)
    //             }
    //         })
    //     }
      
    // }, [props.task])
    
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
    const setcolorFun = () => {
        if (props.task.status === 'error') {
            tempcolor = 'red.main'
        } else if (props.task.status === 'on hold') {
            tempcolor = 'grey.main'
        } else if (props.task.status === 'working') {
            tempcolor = 'orange.main'
        } else if (props.task.status === 'complete') {
            tempcolor = 'green.main'
        }
    }
    useEffect(() => {
        socket = io(process.env.REACT_APP_API_ENDPOINT)
        socket.emit("setup", props.rootUser);
        socket.on("connected", () => setSocketConnected(true));
    }, [])
    useEffect(() => {
        socket.on("ping", (taskId) => {
            if (taskId === props.task._id) {
                sethasNewMessage(true)
            }
        });
    });
    const changeStatus = (changedColor, status) => {
        let flag = false
        if (props.task.ownerType === 'solo') {
            if (props.task.owner._id === props.rootUser._id) {
                props.task.status = status
                api.post('/taskstatechange', { task: props.task, project: props.project, gid: props.group._id, tid: props.task._id })
                    .then(res => {
                        setcolor(changedColor)
                    })
            } else {
                alert('you are not authorized to change the state of this task')
            }
        } else if (props.task.ownerType === 'team') {
            props.task.owner.members.forEach(member => {
                if (member._id.toString() === props.rootUser._id.toString()) {
                    flag = true
                }
            });
            if (flag) {
                props.task.status = status
                api.post('/taskstatechange', { task: props.task, project: props.project, gid: props.group._id, tid: props.task._id })
                    .then(res => {
                        setcolor(changedColor)
                    })
            } else {
                alert('you are not authorized to change the state of this task')
            }

        }

    }
    useEffect(() => {
        setcolor(tempcolor)
    }, [tempcolor])
    const teams1 = teams.filter(team => {
        return team.name.includes(owner)
    })
    const users1 = users.filter(user => {
        return user.name.includes(owner)
    })
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
    if (props) {

        setcolorFun()
        const handleClick = (event) => {
            console.log(event.currentTarget)
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const Open = Boolean(anchorEl);
        if (props.Mywork) {
            return (
                <Stack
                    sx={{ boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 12px , rgba(0, 0, 0, 0.3) 0px 3px 12px" }}
                    bgcolor={color} paddingX='.2rem' padding='1rem' margin={'2rem'} height='15rem' width={'12rem'} direction={'column'} justifyContent='space-between'>
                    <Box flex={6} marginBottom='1rem' borderBottom='1px solid black'><Typography fontWeight={'bold'}>Project : {props.task.projectName}</Typography></Box>
                    <Box flex={3}><Typography><b>Task : </b>{props.task.name}</Typography></Box>
                    <Box
                        flex={3}
                    >
                        <Typography><b>Status :</b> {props.task.status}</Typography>
                    </Box>
                    <Box flex={3}><Typography><b>Due Date :</b><br></br> {props.task.due.split('T')[0]}</Typography></Box>
                </Stack>
            )
        } else {
            return (
                <Stack alignItems={'center'} paddingX='.2rem' paddingY='.1rem' margin={'auto'} width={'99%'} direction={'row'} justifyContent='space-between'>
                    <Dialog fullWidth disableEscapeKeyDown onClose={() => { setshowchat(false); sethasNewMessage(false) }} open={showchat}>
                        <ChatBox taskId={props.task._id} chatId={props.task.chatId} rootUser={props.rootUser} wsId={myContext.workspace._id} />
                    </Dialog>
                    <Dialog fullWidth disableEscapeKeyDown open={addTaskBox} onClose={handleClose2}>
                        <DialogTitle>Update Task</DialogTitle>
                        <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', justifyContent: "space-evenly", flexWrap: 'wrap' }}>
                                <TextField defaultValue="value" value={taskData.name} sx={{ marginBottom: '1rem' }}
                                    onChange={(e) => {
                                        const { value, name } = e.target
                                        settaskData((prevState) => ({
                                            ...prevState,
                                            [name]: value
                                        }))
                                    }
                                    }
                                    placeholder='item name' name='name' size='small'></TextField>
                                    {taskData.due && 
                                    <Typography marginLeft={'.2rem'}>{taskData.due.split('T')[0]}</Typography>||
                                    <Typography marginLeft={'.2rem'}>{props.task.due.split('T')[0]}</Typography>}
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
                                        defaultValue={props.task.linkedTo}
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
                                        defaultValue={props.task.status}
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
                                    // console.log(owner)
                                    // console.log(requirement)
                                    // console.log(status)
                                    // console.log(taskData.name)
                                    // console.log(taskData.due)
                                    // console.log(ownerType)
                                    if (requirement && status && ownerType && taskData.name && taskData.due) {

                                        api.post('/updatetask',
                                            {
                                                task:props.task,
                                                manager: props.project.manager,
                                                projectId: props.project._id,
                                                projectName: props.project.name,
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
                                }}>Update</Button>
                        </DialogActions>
                    </Dialog>
                    {props.rootUser._id.toString() === props.project.manager._id.toString()

                        && <Box display={'flex'} flexDirection='row' textAlign={'center'} flex={2}>
                            <IconButton><Trash/></IconButton>
                            <IconButton onClick={()=>setaddTaskBox(true)}><Edit /></IconButton>
                            </Box>}
                    <Box textAlign={'center'} alignSelf='center' flex={5}><Typography>{props.task.name}</Typography></Box>
                    {hasNewMessage &&
                        <Box display={'flex'} flexDirection='row' textAlign={'center'} alignSelf='center' flex={2}>
                            <Box
                                sx={{ translate: '32px -8px' }}
                                bgcolor={'red.main'} marginY='auto' borderRadius={'50%'} height='9px' width='9px' ></Box>
                            <IconButton sx={{ color: '#223554' }}
                                onClick={() => {
                                    if (props.task.chatId) {

                                        api.post('/readchat', { _id: props.task.chatId })
                                            .then(res => {
                                                setchat(res.data);
                                                res.data.members.forEach(member => {
                                                    if (member._id.toString() === props.rootUser._id.toString()) {
                                                        setshowchat(true)
                                                    }
                                                });
                                            })
                                    }

                                }}>
                                <Message />
                            </IconButton>
                        </Box>
                        ||
                        <Box display={'flex'} flexDirection='row' textAlign={'center'} alignSelf='center' flex={2}>

                            <IconButton sx={{ color: '#223554' }}
                                onClick={() => {
                                    if (props.task.chatId) {

                                        api.post('/readchat', { _id: props.task.chatId })
                                            .then(res => {
                                                setchat(res.data);
                                                res.data.members.forEach(member => {
                                                    if (member._id.toString() === props.rootUser._id.toString()) {
                                                        setshowchat(true)
                                                    }
                                                });
                                            })
                                    }

                                }}>
                                <Message />
                            </IconButton>
                        </Box>
                    }
                    <Box textAlign={'center'} alignSelf='center' flex={2}>
                        <IconButton
                            sx={{ color: '#223554' }}
                            onClick={() => {
                                if (props.task.ownerType === 'solo') {
                                    localStorage.setItem('viewedProfile', props.task.owner._id)
                                    window.open("/profileview", "_blank")
                                } else {
                                    localStorage.setItem('ViewedTeam', props.task.owner._id)
                                    window.open("/teamview", "_blank")
                                }
                            }}
                        >{props.task.ownerType === 'solo' ? <Profile /> : <People />}</IconButton>
                    </Box>
                    <Box sx={{ ":hover": { cursor: 'pointer' } }}
                        onClick={handleClick}
                        display='flex' flexDirection={'row'}
                        flex={3}
                        justifyContent={'space-around'}
                        aria-controls={Open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Open ? 'true' : undefined}
                    >
                        <Box bgcolor={color} marginY='auto' marginLeft={'10px'} borderRadius={'50%'} height='18px' width='18px' border='1px solid black'></Box>
                        <Typography m='auto' width='50%' >{props.task.status}</Typography>
                    </Box>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={Open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                        sx={{ width: '10rem' }}
                    >
                        <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'green.main' }} onClick={() => { setAnchorEl(null); changeStatus('green.main', 'complete') }}></MenuItem>
                        <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'orange.main' }} onClick={() => { setAnchorEl(null); changeStatus('orange.main', 'working') }}></MenuItem>
                        <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'grey.main' }} onClick={() => { setAnchorEl(null); changeStatus('grey.main', 'on hold') }}></MenuItem>
                        <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'red.main' }} onClick={() => { setAnchorEl(null); changeStatus('red.main', 'error') }} ></MenuItem>
                    </Menu>
                    <Box textAlign={'center'} alignSelf='center' flex={3}><Typography>{props.task.due.split('T')[0]}</Typography></Box>
                    <Box textAlign={'center'} alignSelf='center' flex={3}><Typography>{req.name}</Typography></Box>
                </Stack>
            )
        }
    }
}

export default Task
