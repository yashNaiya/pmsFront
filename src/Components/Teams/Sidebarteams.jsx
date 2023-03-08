import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Add, ArrowDown, ArrowDown2, DirectDown, More, SearchNormal, TickCircle } from 'iconsax-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import AppContext from '../AppContext'
import { useContext } from 'react'
import api from '../../Api'

const Sidebarteams = (props) => {
    const [search, setsearch] = useState()
    const [showallteams, setshowallteams] = useState(false)
    const [showmyteams, setshowmyteams] = useState(false)
    const myContext = useContext(AppContext)
    const [users, setusers] = useState([])

    const handleChange= (e)=>{
        setsearch(e.target.value)

        if(e.target.value===''){
            setusers([])
        }else{
            api.post('/users',{_id:props.rootUser._id})
            .then(res=>{
              setusers(res.data)
            })
            .catch(err=>{})
        }

    }
    
    const users1 = users.filter(user => {
        return user.name.includes(search) || user.email.includes(search)
    })
    
    if (props.allTeams && props.myTeams) {
        return (
            <Box flex={1} minHeight={'100vh'} bgcolor={'grey.main'}>
                <Box minHeight={'22vh'} borderBottom={'1px solid black'} justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'} paddingBottom={'1rem'} paddingTop={'4rem'}>
                    <TextField
                        value={search}
                        onChange={handleChange}
                        variant='standard'
                        size='small'
                        placeholder='search'

                        sx={{ marginBottom: '5px', backgroundColor: '#fff', paddingX: '.5rem', paddingY: '.2rem', borderRadius: '.5rem' }}
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: <InputAdornment position="start"><SearchNormal /></InputAdornment>,
                        }}
                    />

                    {users1.map(user => <div key={user._id}><Box paddingX='.5rem'marginY='.1rem' sx={{backgroundColor:'#fff', cursor: "pointer" ,borderRadius:'0.5rem'}}>
                        <Button  fullWidth onClick={() => {}} sx={{ color: "black",textTransform: 'none',justifyContent: 'left' }}>
                            {user.name}
                        </Button>
                    </Box></div>)}

                    <Box>
                        <Button onClick={myContext.toggleTeam} fullWidth sx={{ color: 'black', margin: 0, paddingX: 0, justifyContent: 'left' }}>
                            <Add />
                            <Typography marginLeft={'1rem'}>Add</Typography>
                        </Button>
                    </Box>
                    <Box>
                        <Button onClick={() => { props.setpage(1) }} fullWidth sx={{ color: 'black', margin: 0, paddingX: 0, justifyContent: 'left' }}>
                            <TickCircle />
                            <Typography marginLeft={'1rem'}>Approve</Typography>
                        </Button>
                    </Box>
                </Box>
                <Box justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'}>
                    <Box borderBottom={'1px solid black'} paddingY="1rem" display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography>All Teams</Typography>

                            <IconButton onClick={() => { setshowallteams(!showallteams) }} sx={{ textTransform: 'none', color: 'black', margin: 0, paddingX: 0 }}>
                                <ArrowDown2 />
                            </IconButton>
                        </Box>
                        {showallteams &&
                            props.allTeams.map(team => {
                                return (
                                    <Box >
                                        <Button
                                            onClick={() => {
                                                props.setpage(0)
                                                props.settempteam(team)
                                            }}
                                            fullWidth sx={{ textTransform: 'none', color: 'grey.dark', justifyContent: 'left' }}>{team.name}</Button>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Box borderBottom={'1px solid black'} paddingY="1rem" display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                        <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                            <Typography>My Teams</Typography>
                            <IconButton onClick={() => { setshowmyteams(!showmyteams) }} sx={{ textTransform: 'none', color: 'black', margin: 0, paddingX: 0 }}>
                                <ArrowDown2 />
                            </IconButton>
                        </Box>
                        {showmyteams &&
                            props.myTeams.map(team => {
                                return (
                                    <Box >
                                        <Button
                                            onClick={() => {
                                                props.setpage(0)
                                                props.settempteam(team)
                                            }}
                                            fullWidth sx={{ textTransform: 'none', color: 'grey.dark', justifyContent: 'left' }}>{team.name}</Button>
                                    </Box>
                                )
                            })
                        }
                    </Box>
                    <Box paddingY="1rem" >
                        <Button onClick={() => { props.setpage(2) }} variant='contained' fullWidth sx={{ textTransform: 'none', justifyContent: 'left', borderRadius: '1rem' }}>All Users</Button>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default Sidebarteams
