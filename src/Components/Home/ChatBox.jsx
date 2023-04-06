import { Box, Button, IconButton, InputAdornment, styled, TextField, Typography } from '@mui/material'
import { AddCircle, AddSquare, CloseSquare, SearchNormal, Send, TagCross } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import api from '../../Api'
import MessageBox from './MessageBox'
import Localimage from '../../Assets/man.png'
import io from "socket.io-client"
var socket, selectedChatCompare

const ChatBox = (props) => {
    useEffect(() => {
        socket = io(process.env.REACT_APP_API_ENDPOINT)
        socket.emit("setup", props.rootUser);
        socket.on("connected", () => setSocketConnected(true));
    }, [])

    const [chat, setchat] = useState()
    const [conversations, setconversations] = useState()
    const [socketConnected, setSocketConnected] = useState(false);
    const [chatmembers, setchatmembers] = useState()
    const [showadd, setshowadd] = useState(false)
    const [search, setsearch] = useState()
    const [users, setusers] = useState([])
    const [newMessage, setNewMessage] = useState()
    const SERVER_HOST = process.env.REACT_APP_API_ENDPOINT + '/images/'
    let members = []
    const ChatboxBottom = styled("div")(({ theme }) => ({
        marginTop: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',

    }))
    const handleMessageSend = () => {
        console.log(newMessage)
        api.post('/addmessage', { _id: props.chatId, message: newMessage, rootUser: props.rootUser })
            .then(res => {

                api.post('/readchat', { _id: props.chatId })
                    .then(res => {

                        setconversations(res.data.conversations)
                        console.log(res.data)
                    })
                socket.emit('new message', res.data, chat.members,props.taskId)
                
            })
            .catch()
        setNewMessage('')
    }


    useEffect(() => {
        if (props.chatId) {
            socket.emit("join chat", props.chatId)
            api.post('/readchat', { _id: props.chatId })
                .then(res => {
                    setchat(res.data);
                    // console.log(res.data)
                    // for(member of res.data.members){
                    //     console.log(member._id)
                    // }
                    // console.log(res.data.conversations)
                    setconversations(res.data.conversations)
                    res.data.members.forEach(member => {
                        // console.log(member._id)
                        api.post('/readuser', { _id: member._id })
                            .then(res => {
                                members.push(res.data)
                            })
                    });
                    // console.log(members)
                    setchatmembers(members)
                })

        }
    }, [props.chatId])

    useEffect(() => {
        console.log(conversations)
    }, [conversations])



    useEffect(() => {
        socket.on("message recieved", (newMessageRecieved) => {
            // console.log(newMessageRecieved)
            // console.log(conversations)
            // console.log(newMessageRecieved)
            setconversations([...conversations, newMessageRecieved]);


        });
    });



    const handleChange = (e) => {
        setsearch(e.target.value)
        if (props.wsId) {
            if (e.target.value === '') {
                setusers([])
            } else {
                api.post('/users', { _id: props.rootUser._id, wsId: props.wsId })
                    .then(res => {
                        setusers(res.data)
                    })
                    .catch(err => { })
            }
        } else {
            alert('select workspace')
        }

    }
    const users1 = users.filter(user => {
        return user.name.includes(search) || user.email.includes(search)
    })
    if (chatmembers) {
        // console.log(chatmembers)
        return (
            <Box display={'flex'} flexDirection='row'>
                <Box justifyContent={'space-between'} display='flex' flexDirection='column' flex={4} padding={2} maxHeight={'75vh'} minHeight={'75vh'} sx={{ boxShadow: "inset rgba(0, 0, 0, 0.35) 0px 0px 12px 0px" }} >
                    <Box overflow={'scroll'} minHeight={'80%'}>
                        {
                            conversations.map(messageObj => (
                                <MessageBox key={messageObj._id} sender={messageObj.sender} text={messageObj.text} rootUser={props.rootUser} />
                            ))
                        }

                    </Box>
                    <ChatboxBottom>
                        <TextField autoFocus='autoFocus' key='message' sx={{ width: '80%' }} size='small' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} label='write something'></TextField>
                        <Button onClick={handleMessageSend}><Send /></Button>
                        {!showadd && <Button onClick={() => { setshowadd(true) }}><AddSquare /></Button>}
                    </ChatboxBottom>
                </Box>
                {showadd && <Box display='flex' flexDirection={'column'} justifyContent='space-between' height={'75vh'} p='.5rem' width='35%'>
                    <Box>
                        <Box display='flex' justifyContent={'right'} width='100%'>
                            <Button onClick={() => { setshowadd(false) }}><CloseSquare /></Button>
                        </Box>
                        <TextField
                            value={search}
                            onChange={handleChange}
                            variant='standard'
                            size='small'
                            placeholder='search'

                            sx={{ marginBottom: '5px', backgroundColor: '#fff', paddingX: '.5rem', paddingY: '.2rem', borderRadius: '.5rem' }}
                            InputProps={{

                                startAdornment: <InputAdornment position="start"><SearchNormal /></InputAdornment>,
                            }}
                        />
                        {users1.map(user => <div key={user._id}><Box display='flex' flexDirection={'row'} paddingX='.5rem' marginY='.1rem' sx={{ backgroundColor: '#fff', cursor: "pointer", borderRadius: '0.5rem' }}>
                            <Button fullWidth
                                onClick={() => {
                                    localStorage.setItem("viewedProfile", user._id)
                                    window.open("/profileview", "_blank")
                                }}
                                sx={{ color: "black", textTransform: 'none', justifyContent: 'left' }}>
                                {user.name}
                            </Button>
                            <IconButton sx={{ color: 'primary.main' }}>
                                <AddCircle />
                            </IconButton>
                        </Box></div>)}
                    </Box>
                    <Box marginBottom={'2rem'}>
                        <Box>
                            <Typography marginY={'1rem'} fontWeight={'bold'}>Members</Typography>
                        </Box>
                        <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
                            {
                                chatmembers.map(member => (
                                    // <Typography>23</Typography>
                                    <Box key={member._id}>
                                        {member.image && <Box marginRight={'.3rem'} overflow={'hidden'} borderRadius={'50%'} width={'50px'} height={'45px'} border={'2px solid #223554'}>
                                            <IconButton sx={{ minHeight: 0, minWidth: 0, padding: 0 }}><img src={SERVER_HOST + member.image} position='center' alt='profile1' width={'45px'} height={'45px'} /></IconButton>
                                        </Box>
                                            ||
                                            <Box overflow={'hidden'} borderRadius={'50%'} width={'50px'} height={'45px'} border={'2px solid #223554'}>
                                                <img src={Localimage} position='center' alt='profile1' width={'45px'} height={'45px'} />
                                            </Box>
                                        }
                                    </Box>
                                )
                                )
                            }
                        </Box>
                    </Box>

                </Box>}
            </Box>
        )
    }
}

export default ChatBox
