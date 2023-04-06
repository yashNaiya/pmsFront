import { Box, Button, FormControl, IconButton, InputLabel, ListItemText, Menu, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Add, ArrowDown, ArrowDown2, ArrowRight2, CloseCircle, More, TickCircle, Warning2 } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import api from '../../Api';
import AppContext from './../AppContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
const Sidebar = (props) => {
    const navigate = useNavigate()
    const myContext = useContext(AppContext);
    const [workspace, setworkspace] = useState()
    const [showClients, setshowClients] = useState(false)
    const [showProjects, setshowProjects] = useState(false)
    const [wslist, setwslist] = useState()
    const [cList, setcList] = useState([])
    const [pList, setpList] = useState([])
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorEl2, setAnchorEl2] = useState(null)
    const handleClose1 = () => {
        setAnchorEl(null);
    };
    // const handleClose2 = () => {
    //     setAnchorEl2(null);
    // };
    const handleClick1 = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);

    };

    // const handleClick2 = (event) => {
    //     console.log(event.currentTarget)
    //     setAnchorEl2(event.currentTarget);
    // };
    const Open = Boolean(anchorEl);
    const Open2 = Boolean(anchorEl2);
    useEffect(() => {
        api.get('/readworkspaces')
            .then(res => {
                setwslist(res.data)
            })
            .catch()
        let wsId = localStorage.getItem('ws')
        if (wsId) {
            api.post('/currentworkspace', { _id: wsId })
                .then(res => {
                    myContext.setWorkspace(res.data)
                    // console.log(res.data)
                    if (props.rootUser && res.data) {
                        if (props.rootUser._id.toString() === res.data.admin.toString()) {
                            console.log("Admin dataset")
                            props.setisAdmin(true)
                            api.post('/readclients', { _id: res.data._id })
                            .then(res => { setcList(res.data) })
                            .catch(err => { })

                        api.post('/readprojects', { _id: res.data._id })
                            .then(res => { setpList(res.data) })
                            .catch(err => { })
                        }
                        else {
                        console.log("User dataset")
                           api.post('/myprojects', { wsId: res.data._id, _id: props.rootUser._id })
                               .then(res => { setpList(res.data);console.log(res.data) })
                               .catch(err => { })
                       }
                    }

                })

        }


    }, [])
    useEffect(() => {
        // console.log(props.selectedworkspacedata)

        myContext.setWorkspace(props.selectedworkspacedata)
    }, [props.selectedworkspacedata])

    useEffect(() => {
        if (myContext.workspace ) {
            if(props.isAdmin){

                // console.log("hellloooo")
                api.post('/readclients', { _id: myContext.workspace._id })
                    .then(res => { setcList(res.data) })
                    .catch(err => { })
    
                api.post('/readprojects', { _id: myContext.workspace._id })
                    .then(res => { setpList(res.data) })
                    .catch(err => { })
            }else{
                api.post('/myprojects', { wsId: myContext.workspace._id, _id: props.rootUser._id })
                .then(res => { setpList(res.data);console.log(res.data) })
                .catch(err => { })
            }
        }
    }, [myContext.workspace])


    if (wslist) {
        return (
            <Box flex={1} minHeight={'100vh'} bgcolor={'grey.main'}>
                <Box borderBottom={'1px solid black'} justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'} paddingBottom={'1rem'} paddingTop={'4rem'}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        {myContext.workspace && <Typography fontSize={'20px'} fontWeight={'bold'}>{myContext.workspace.name}</Typography>
                            || <Typography fontSize={'20px'} fontWeight={'bold'}>Workspace</Typography>}
                        {props.isAdmin && <IconButton
                            sx={{ color: 'black' }}
                            onClick={handleClick1}
                            bgcolor='green.main' flex={4}
                            aria-controls={Open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Open ? 'true' : undefined}>
                            <More />
                        </IconButton>}
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={Open}
                            onClose={handleClose1}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => { setAnchorEl(null); props.setrenamews(true) }}>Rename</MenuItem>
                            <MenuItem onClick={() => { setAnchorEl(null); props.setdeletews(true) }}>Delete</MenuItem>
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
                                <TextField value={workspace} onChange={(e) => { setworkspace(e.target.value); localStorage.setItem("ws", e.target.value._id) }} variant='standard'></TextField>
                                <Button onClick={() => {
                                    console.log(workspace)
                                    api.post('/createworkspace', { name: workspace, admin: props.rootUser })
                                        .then(res => { alert(res.data.message); setworkspace(''); props.setaddworkspace(false) })
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
                    {props.isAdmin && <Box marginTop='1rem'>
                        <Button variant='contained' onClick={() => { props.setadd(true); myContext.sethomepage(2) }} fullWidth sx={{ color: 'black', margin: 0, paddingX: 0, justifyContent: 'left', backgroundColor: 'primary.shadow' }}>
                            <Add />
                            <Typography marginLeft={'1rem'}>Add</Typography>
                        </Button>
                    </Box>}
                    {props.isAdmin && <Box marginTop='1rem'>
                        <Button variant='contained' onClick={() => { myContext.sethomepage(3) }} fullWidth sx={{ color: 'black', margin: 0, paddingX: 0, justifyContent: 'left', backgroundColor: 'primary.shadow' }}>
                            <TickCircle />
                            <Typography marginLeft={'1rem'}>Approve</Typography>
                        </Button>
                    </Box>}
                </Box>

                {myContext.workspace && cList && pList &&
                    <Box justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'}  >
                        {props.isAdmin && <Box display={'flex'} flexDirection={'column'} borderBottom={'1px solid black'} justifyContent={'space-between'} paddingY={'1rem'}>
                            <Box display='flex' flexDirection={'row'} alignItems='center' justifyContent={'space-between'} borderRadius={'.5rem'} width='100%' paddingX='.3rem' sx={{ backgroundColor: 'greyDark.main' }}>
                                <Typography>Clients</Typography>
                                <IconButton onClick={() => { setshowClients(!showClients) }} sx={{ justifyContent: 'left' }}>
                                    {showClients ? <ArrowDown2 /> : <ArrowRight2 />}
                                </IconButton>
                            </Box>
                            {showClients &&
                                cList.map((client, index) => (
                                    <Box key={index}>
                                        <Button onClick={() => {
                                            myContext.sethomepage(4)
                                            props.setselectedclient(client)
                                        }} fullWidth sx={{ textTransform: 'none', color: 'grey.dark', justifyContent: 'left' }}>{client.name}</Button>
                                    </Box>
                                ))


                            }
                        </Box>}
                        <Box paddingY={'1rem'}>
                            <Box display='flex' flexDirection={'row'} alignItems='center' justifyContent={'space-between'} borderRadius={'.5rem'} width='100%' paddingX='.3rem' sx={{ backgroundColor: 'greyDark.main' }}>
                                <Typography>Projects</Typography>
                                <IconButton onClick={() => { setshowProjects(!showProjects) }} sx={{ justifyContent: 'left' }}>
                                    {showProjects ? <ArrowDown2 /> : <ArrowRight2 />}
                                </IconButton>
                            </Box>
                            {showProjects &&
                                // console.log(pList)
                                pList.map((project, index) => (
                                    <Box key={index}>
                                        <Button
                                            onClick={() => {
                                                props.setselectedproject(project)
                                                myContext.sethomepage(5)
                                            }}
                                            fullWidth sx={{ textTransform: 'none', color: 'grey.dark', justifyContent: 'left' }}>{project.name}</Button>
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
