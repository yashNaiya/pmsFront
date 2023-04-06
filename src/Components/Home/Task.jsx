import { Box, Dialog, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { Edit, Message, People, Profile } from 'iconsax-react';
import React, { useContext, useEffect, useState } from 'react'
import api from '../../Api';
import AppContext from '../AppContext';
import ChatBox from './ChatBox';
import io from 'socket.io-client'
var socket

const Task = (props) => {
    console.log('hii')
    const [showchat, setshowchat] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [color, setcolor] = useState()
    const [chat, setchat] = useState()
    const [socketConnected, setSocketConnected] = useState(false);
    const [hasNewMessage, sethasNewMessage] = useState(false)
    const myContext = useContext(AppContext)
    let tempcolor = ''
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
            if(taskId === props.task._id){
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

        return (
            <Stack alignItems={'center'} paddingX='.2rem' paddingY='.1rem' margin={'auto'} width={'99%'} direction={'row'} justifyContent='space-between'>
                <Dialog fullWidth disableEscapeKeyDown onClose={() => { setshowchat(false); sethasNewMessage(false) }} open={showchat}>
                    <ChatBox taskId={props.task._id} chatId={props.task.chatId} rootUser={props.rootUser} wsId={myContext.workspace._id} />
                </Dialog>
                {props.rootUser._id.toString() === props.project.manager._id.toString()

                    && <Box textAlign={'center'} flex={1}><IconButton><Edit /></IconButton></Box>}
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
                    flex={2}
                    justifyContent='space-around'
                    aria-controls={Open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Open ? 'true' : undefined}
                >
                    <Box bgcolor={color} marginY='auto' marginLeft={'10px'} borderRadius={'50%'} height='18px' width='18px' border='1px solid black'></Box>
                    <Typography m='auto'>{props.task.status}</Typography>
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
                <Box textAlign={'center'} alignSelf='center' flex={3}><Typography>{props.task.linkedTo}</Typography></Box>
            </Stack>
        )
    }
}

export default Task
