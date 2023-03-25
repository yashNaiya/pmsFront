import { Box, Button, FormControl, IconButton, InputLabel, ListItemText, Menu, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Add, CloseCircle, More, TickCircle, Warning2 } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import api from '../../Api';
import AppContext from './../AppContext'
import { useContext } from 'react'
const Sidebar = (props) => {
    const myContext = useContext(AppContext);
    const [workspace, setworkspace] = useState()
    const [wslist, setwslist] = useState()
    const [cList, setcList] = useState()
    const [pList, setpList] = useState()
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorEl2, setAnchorEl2] = useState(null)
    const handleClose1 = () => {
        setAnchorEl(null);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const handleClick1 = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };

    const handleClick2 = (event) => {
        console.log(event.currentTarget)
        setAnchorEl2(event.currentTarget);
    };
    const Open = Boolean(anchorEl);
    const Open2 = Boolean(anchorEl2);
    useEffect(() => {
        api.get('/readworkspaces')
            .then(res => {
                setwslist(res.data)
            })
            .catch()
    }, [])
    useEffect(() => {
        if (props.selectedworkspacedata) {
            // console.log("hellloooo")
            api.post('/readclients', { _id: props.selectedworkspacedata._id })
                .then(res => { setcList(res.data) })
                .catch(err => { })

            api.post('/readprojects', { _id: props.selectedworkspacedata._id })
                .then(res => { setpList(res.data) })
                .catch(err => { })
        }
    }, [props.selectedworkspacedata])
    if (wslist) {
        return (
            <Box flex={1} minHeight={'100vh'} bgcolor={'grey.main'}>
                <Box minHeight={'30vh'} borderBottom={'1px solid black'} justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'} paddingBottom={'1rem'} paddingTop={'4rem'}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        {props.selectedworkspacedata && <Typography>{props.selectedworkspacedata.name}</Typography>
                            || <Typography>Workspace</Typography>}
                        <IconButton
                            sx={{ color: 'black' }}
                            onClick={handleClick1}
                            bgcolor='green.main' flex={4}
                            aria-controls={Open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Open ? 'true' : undefined}>
                            <More />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={Open}
                            onClose={handleClose1}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => { setAnchorEl(null); }}>Rename</MenuItem>
                            <MenuItem onClick={() => { setAnchorEl(null); }}>Manage</MenuItem>
                            <MenuItem onClick={() => { setAnchorEl(null); }}>Delete</MenuItem>
                        </Menu>
                    </Box>
                    <FormControl fullWidth size='small'>
                        <InputLabel id="demo-simple-select-label">Workspace</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Workspace"
                        >
                            {props.addworkspace && <Box>
                                <TextField value={workspace} onChange={(e) => { setworkspace(e.target.value); localStorage.setItem("ws",e.target.value._id) }} variant='standard'></TextField>
                                <Button onClick={() => {
                                    console.log(workspace)
                                    api.post('/createworkspace', { name: workspace,admin:props.rootUser })
                                        .then(res => { alert(res.data.message); setworkspace('') })
                                        .catch(err => { console.log(err) })
                                }}>add</Button>
                                <IconButton onClick={() => { props.setaddworkspace(false) }}><CloseCircle /></IconButton>
                            </Box>}
                            {!props.addworkspace &&
                                <Box>
                                    {wslist.map((ws) => (
                                        <MenuItem onClick={() => { props.setselectedworkspace(ws); localStorage.setItem("ws", ws._id) }} key={ws._id} value={ws.name}>
                                            <ListItemText primary={ws.name} />
                                        </MenuItem>
                                    ))}
                                    <Button fullWidth onClick={() => { props.setaddworkspace(true) }} sx={{ textTransform: 'none', justifyContent: 'left', color: '#000' }}><Add />Add</Button>
                                </Box>
                            }
                        </Select>
                    </FormControl>
                    <Box>
                        <Button onClick={() => { props.setadd(true) }} fullWidth sx={{ color: 'black', margin: 0, paddingX: 0, justifyContent: 'left' }}>
                            <Add />
                            <Typography marginLeft={'1rem'}>Add</Typography>
                        </Button>
                    </Box>
                    <Box>
                        <Button onClick={() => { }} fullWidth sx={{ color: 'black', margin: 0, paddingX: 0, justifyContent: 'left' }}>
                            <TickCircle />
                            <Typography marginLeft={'1rem'}>Approve</Typography>
                        </Button>
                    </Box>
                </Box>
                
                {props.selectedworkspacedata && cList && pList && 
                <Box justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'}  >
                    <Box display={'flex'} flexDirection={'column'} borderBottom={'1px solid black'} justifyContent={'space-between'} paddingY={'1rem'}>
                    <Typography>Clients</Typography>
                        {
                            cList.map((client, index) => (
                                <Box key={index} display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                                    <Typography variant='body2'>{client.name}</Typography>
                                    <IconButton
                                        sx={{ color: 'black' }}
                                        onClick={handleClick2}
                                        bgcolor='green.main' flex={4}
                                        aria-controls={Open2 ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={Open2 ? 'true' : undefined}>
                                        <More />
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl2}
                                        open={Open2}
                                        onClose={handleClose2}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem onClick={() => { setAnchorEl2(null); }}>Rename</MenuItem>
                                        <MenuItem onClick={() => { setAnchorEl2(null); }}>Manage</MenuItem>
                                        <MenuItem onClick={() => { setAnchorEl2(null); }}>Delete</MenuItem>
                                    </Menu>
                                </Box>
                            ))


                        }
                    </Box>
                    <Box paddingY={'1rem'}>
                        <Typography>Projects</Typography>
                        {
                            // // console.log(pList.projects)
                            pList.map((project, index) => (
                                <Box key={index}>
                                    <Button onClick={()=>{props.setselectedproject(project)}} fullWidth sx={{ textTransform: 'none', color: 'grey.dark', justifyContent: 'left' }}>{project.name}</Button>
                                </Box>
                            ))
                        }
                    </Box>
                </Box>
                    ||
                    <Box marginX={'1rem'} display='flex' alignItems={'center'} justifyContent='left' flexDirection={'row'}>
                        <Typography color={'grey'}>select workspace</Typography>
                        <Warning2 color={'grey'} />
                    </Box>
                }
            </Box>
        )
    }
}

export default Sidebar
