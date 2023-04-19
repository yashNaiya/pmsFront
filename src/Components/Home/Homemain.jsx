import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, Menu, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { Add, CloseCircle, Edit, More, ProfileAdd, SearchNormal } from 'iconsax-react'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import api from '../../Api'
import ClientPage from './ClientPage'
import Group from './Group'
import SelectAdd from './SelectAdd'
import AppContext from './../AppContext'
import { useContext } from 'react'
import ApprovePage from './ApprovePage'
import Timeline from './Timeline'
import Workload from './Workload'
import Dashboard from './Dashboard'
import ManageProject from './ManageProject'

const Homemain = (props) => {
    const myContext = useContext(AppContext)
    const [wsname, setwsname] = useState()
    const [enterws, setenterws] = useState()
    const [groupName, setgroupName] = useState()
    const [open, setOpen] = useState(false);
    const [search, setsearch] = useState()
    const [index, setindex] = useState()
    const [index2, setindex2] = useState()
    const [anchorEl2, setAnchorEl2] = useState(null)
   
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (myContext.workspace) {
            setwsname(myContext.workspace.name)
        }
    }, [myContext.workspace])
    const Open = Boolean(anchorEl2);

    // console.log(props.selectedclient)
    const handleWorkspaceDelete = () => {
        api.post('/deleteworkspace', { _id: myContext.workspace._id })
            .then(res => {
                alert(res.data.message)
                handleClose3()
            }
            )
            .catch()
    }
    const handleWorkspaceRename = () => {
        api.post("/renameworkspace", { _id: myContext.workspace._id, name: wsname })
            .then(res => {
                alert(res.data.message)
                handleClose2()
            })
    }
    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };
    const handleClose2 = (event, reason) => {
        props.setrenamews(false)
        console.log(wsname)
    };
    const handleClose3 = (event, reason) => {
        props.setdeletews(false)
        // console.log(enterws)
        setenterws('')
    };

    const reloadProject = () => {
        api.post("/readproject", { _id: props.selectedproject._id })
            .then(res => {
                props.setselectedproject(res.data)
            }).catch()
    }
    let selectedUsers = []
    let selectedTeams = []
    const handleChange = (e) => {
        setsearch(e.target.value)
    }

 
    

    if (props.add && myContext.homepage === 2) {

        return (

            <Box flex={5}>
                {myContext.workspace && <Dialog disableEscapeKeyDown open={props.deletews} onClose={handleClose3}>
                    <DialogTitle>Delete Workspace</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField value={enterws} onChange={(e) => { setenterws(e.target.value) }} placeholder='Enter Workspace Name' size='small'></TextField>
                            <Typography variant='caption' color={'red'} >deleting workspace will also remove all the clients and projects linked with it</Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose3}>Cancel</Button>
                        {enterws === myContext.workspace.name && <Button color='red' variant='contained'
                            onClick={() => {
                                handleWorkspaceDelete()
                            }}>Delete</Button>
                            ||
                            <Button disabled>
                                Delete
                            </Button>}
                    </DialogActions>
                </Dialog>}
                <Dialog disableEscapeKeyDown open={props.renamews} onClose={handleClose2}>
                    <DialogTitle>Change Workspace Name</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField value={wsname} onChange={(e) => { setwsname(e.target.value) }} placeholder='name' size='small'></TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose2}>Cancel</Button>
                        <Button variant='contained'
                            onClick={() => {
                                handleWorkspaceRename()
                            }}>Rename</Button>
                    </DialogActions>
                </Dialog>
                {myContext.workspace &&
                    <SelectAdd rootUser={props.rootUser} selectedworkspacedata={myContext.workspace} setaddcustomer={props.setaddcustomer} setaddproject={props.setaddproject} setadd={props.setadd} />
                    ||
                    <Typography>No workspace is selected</Typography>
                }
            </Box>
        )
    } else if (myContext.homepage === 3) {
        return (
            <Box flex={5}>
                <ApprovePage />
            </Box>
        )
    }
    else {
        if (props.invitetoproject && props.users && props.teams) {
            const columns = ["name", "email", "number", "role"];
            const columns2 = ["name"];

            const options = {
                filter: true,
                onRowsSelect: (currentRowsSelected, allRowsSelected) => {
                    setindex(allRowsSelected)
                },
                filterType: "dropdown",
                responsive: "standard",
                rowsPerPage: 10,
                print: false,
                pagination: false,

                onRowClick: () => {

                }
            }
            const options2 = {
                filter: true,
                onRowsSelect: (currentRowsSelected, allRowsSelected) => {
                    setindex2(allRowsSelected)
                },
                filterType: "dropdown",
                responsive: "standard",
                rowsPerPage: 10,
                print: false,
                pagination: false,

                onRowClick: (rowData) => {
                    // console.log(rowData)
                    let _id = ""
                    for (let i = 0; i < props.teams.length; i++) {
                        if (props.teams[i].name === rowData[0])
                            _id = props.teams[i]._id
                    }
                    if (_id !== "") {
                        console.log(_id)
                        localStorage.setItem("viewedTeam", _id)
                        window.open("/TeamView", "_blank")
                    }


                }
            }
            return (
                <Box flex={5}>
                    {myContext.workspace && <Dialog disableEscapeKeyDown open={props.deletews} onClose={handleClose3}>
                        <DialogTitle>Delete Workspace</DialogTitle>
                        <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <TextField value={enterws} onChange={(e) => { setenterws(e.target.value) }} placeholder='Enter Workspace Name' size='small'></TextField>
                                <Typography variant='caption' color={'red'} >deleting workspace will also remove all the clients and projects linked with it</Typography>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose3}>Cancel</Button>
                            {enterws === myContext.workspace.name && <Button color='red' variant='contained'
                                onClick={() => {
                                    handleWorkspaceDelete()
                                    window.location.reload(false) ;localStorage.clear()
                                }}>Delete</Button>
                                ||
                                <Button disabled>
                                    Delete
                                </Button>}
                        </DialogActions>
                    </Dialog>}
                    <Dialog disableEscapeKeyDown open={props.renamews} onClose={handleClose2}>
                        <DialogTitle>Change Workspace Name</DialogTitle>
                        <DialogContent>
                            <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                <TextField value={wsname} onChange={(e) => { setwsname(e.target.value) }} placeholder='name' size='small'></TextField>
                            </Box>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose2}>Cancel</Button>
                            <Button variant='contained'
                                onClick={() => {
                                    handleWorkspaceRename()

                                }}>Rename</Button>
                        </DialogActions>
                    </Dialog>

                    <Box textAlign={'right'}>
                        <IconButton onClick={() => {
                            props.setinvitetoproject(false)
                        }}>
                            <CloseCircle />
                        </IconButton>
                    </Box>
                    <Box display={'flex'} alignItems='left' marginLeft={'3rem'} flexDirection={'column'}>
                        <Box margin={'5%'}>
                            <MUIDataTable
                                title={'Users'}
                                data={props.users}
                                columns={columns}
                                options={options} />
                        </Box>
                        <Box display={'flex'} margin='3rem' justifyContent={'flex-end'}
                            flexDirection={'row'} >
                            <Button variant='contained' onClick={() => {
                                console.log(index)
                                selectedUsers = []
                                index.map(i => {
                                    selectedUsers.push(props.users[i.index])
                                })
                                api.post('/addtoproject', { users: selectedUsers, project:props.selectedproject, rootUser: props.rootUser, adminId: myContext.workspace.admin })
                                    .then(res => {
                                        alert(res.data.message)
                                        reloadProject()
                                    })
                                    .catch(err => { })
                            }}>add</Button>
                        </Box>
                    </Box>
                    <Box display={'flex'} alignItems='left' marginLeft={'3rem'} flexDirection={'column'}>
                        <Box margin={'5%'}>
                            <MUIDataTable
                                title={'Teams'}
                                data={props.teams}
                                columns={columns2}
                                options={options2} />
                        </Box>
                        <Box display={'flex'} margin='3rem' justifyContent={'flex-end'}
                            flexDirection={'row'} >
                            <Button variant='contained' onClick={() => {
                                // console.log(index2)
                                selectedUsers = []
                                index2.map(i => {
                                    selectedTeams.push(props.teams[i.index])
                                })
                                console.log(selectedTeams)
                                api.post('/addteamstoproject', { teams: selectedTeams, project: props.selectedproject, rootUser: props.rootUser, adminId: myContext.workspace.admin })
                                    .then(res => {
                                        alert(res.data.message)
                                        reloadProject()
                                    })
                                    .catch(err => { })
                            }}>add</Button>
                        </Box>
                    </Box>
                </Box>
            )
        }
        else {
            if (myContext.homepage === 5 && props.selectedproject) {
                if(props.manageProject){
                    return(
                        <ManageProject 
                        project = {props.selectedproject}
                        setselectedproject={props.setselectedproject}
                        handleClose2={handleClose2}
                        handleClose3={handleClose3}
                        wsname={wsname}
                        setwsname={setwsname}
                        setmanageProject = {props.setmanageProject}
                        handleWorkspaceRename={handleWorkspaceRename}
                        handleWorkspaceDelete={handleWorkspaceDelete}
                        enterws={enterws}
                        setenterws={setenterws}
                        deletews = {props.deletews}
                        renamews = {props.renamews}
                        />
                    )
                }else{
                    return (
                        <Box flex={5}>
                            {myContext.workspace && <Dialog disableEscapeKeyDown open={props.deletews} onClose={handleClose3}>
                                <DialogTitle>Delete Workspace</DialogTitle>
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <TextField value={enterws} onChange={(e) => { setenterws(e.target.value) }} placeholder='Enter Workspace Name' size='small'></TextField>
                                        <Typography variant='caption' color={'red'} >deleting workspace will also remove all the clients and projects linked with it</Typography>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose3}>Cancel</Button>
                                    {enterws === myContext.workspace.name && <Button color='red' variant='contained'
                                        onClick={() => {
                                            handleWorkspaceDelete()
                                            window.location.reload(false) ;localStorage.clear()
                                            
                                        }}>Delete</Button>
                                        ||
                                        <Button disabled>
                                            Delete
                                        </Button>}
                                </DialogActions>
                            </Dialog>}
                            <Dialog disableEscapeKeyDown open={props.renamews} onClose={handleClose2}>
                                <DialogTitle>Change Workspace Name</DialogTitle>
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <TextField value={wsname} onChange={(e) => { setwsname(e.target.value) }} placeholder='name' size='small'></TextField>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose2}>Cancel</Button>
                                    <Button variant='contained'
                                        onClick={() => {
                                            handleWorkspaceRename()
    
                                        }}>Rename</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                                <DialogTitle>Add Group</DialogTitle>
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <TextField value={groupName} onChange={(e) => { setgroupName(e.target.value) }} placeholder='name' size='small'></TextField>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button variant='contained'
                                        onClick={() => {
                                            handleClose()
                                            api.post('/addgroup', { wsID: myContext.workspace._id, name: groupName, projectID: props.selectedproject._id })
                                                .then(res => { reloadProject() })
                                                .catch()
                                        }}>Add</Button>
                                </DialogActions>
                            </Dialog>
                            <Box minHeight={'100vh'} direction={'column'} justifyContent='space-between'>
                                <Box display={'flex'} justifyContent={'space-between'} flexDirection={'column'} flex={.5} paddingX={'1rem'} borderBottom={'1px solid black'}>
                                    <Box marginX={'1rem'} height='5rem' marginTop={'2rem'} display={'flex'} justifyContent={'space-between'} flexDirection={'row'}>
                                        <Box>
                                            <Typography fontWeight={'bold'} sx={{ marginBottom: '1rem' }} variant='h4'>{props.selectedproject.name}</Typography>
                                        </Box>
                                        {(props.selectedproject.manager._id.toString() === props.rootUser._id.toString() || myContext.workspace.admin.toString() === props.rootUser._id.toString())
                                            &&
                                            <Box display='flex' flexDirection={'column'} justifyContent='space-between' >
                                                <Button variant='outlined' onClick={() => props.setinvitetoproject(true)} sx={{ color: 'black' }}><ProfileAdd />invite</Button>
                                                <Button variant='contained' onClick={()=>{props.setmanageProject(true)}}>Manage Project</Button>
                                            </Box>}
                                    </Box>
                                    <Box>
                                        <Button onClick={()=>{props.setviewpage(0)}} sx={{ color: 'black' }}>Main Table</Button>
                                        <Button onClick={()=>{props.setviewpage(1)}} sx={{ color: 'black' }}>Timeline</Button>
                                        <Button onClick={()=>{props.setviewpage(2)}} sx={{ color: 'black' }}>Workload</Button>
                                        <Button onClick={()=>{props.setviewpage(3)}} sx={{ color: 'black' }}>Dashboard</Button>
                                    </Box>
                                </Box>
                                {props.viewpage===0 && <Box flex={9} margin={'1rem'}>
                                    <Box display='flex' width='40%' justifyContent={'space-between'}>
                                        {props.selectedproject.manager._id.toString() === props.rootUser._id.toString() && <Button onClick={() => handleClickOpen()} variant='contained'>add group</Button>}
                                        <TextField
                                            value={search}
                                            onChange={handleChange}
                                            variant='standard'
                                            size='small'
                                            placeholder='search'
                                            sx={{ marginBottom: '5px', backgroundColor: 'grey.main', paddingX: '.5rem', paddingY: '.2rem', borderRadius: '.5rem' }}
                                            InputProps={{
                                                disableUnderline: true,
                                                startAdornment: <InputAdornment position="start"><SearchNormal /></InputAdornment>,
                                            }}
                                        />
                                    </Box>
                                    <Box>
                                        {
                                            props.selectedproject.groups.map((group, index) => (
                                                <Group reloadProject={reloadProject} rootUser={props.rootUser} wsId={myContext.workspace._id} project={props.selectedproject} key={index} group={group} />
                                            ))
                                        }
    
                                    </Box>
                                </Box>}
                                {props.viewpage===1 && <Timeline groups={props.selectedproject.groups}/>}
                                {props.viewpage===2 && <Workload rootUser={props.rootUser}  project={props.selectedproject}/>}
                                {props.viewpage===3 && <Dashboard project={props.selectedproject}/>}
    
    
                            </Box>
                        </Box>
                    )
                }
            }
            else if (props.selectedclient && myContext.homepage === 4) {
                return (
                    <Box flex={5}>
                        {myContext.workspace && <Dialog disableEscapeKeyDown open={props.deletews} onClose={handleClose3}>
                            <DialogTitle>Delete Workspace</DialogTitle>
                            <DialogContent>
                                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <TextField value={enterws} onChange={(e) => { setenterws(e.target.value) }} placeholder='Enter Workspace Name' size='small'></TextField>
                                    <Typography variant='caption' color={'red'} >deleting workspace will also remove all the clients and projects linked with it</Typography>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose3}>Cancel</Button>
                                {enterws === myContext.workspace.name && <Button color='red' variant='contained'
                                    onClick={() => {
                                        handleWorkspaceDelete()
                                        window.location.reload(false) ;localStorage.clear()
                                    }}>Delete</Button>
                                    ||
                                    <Button disabled>
                                        Delete
                                    </Button>}
                            </DialogActions>
                        </Dialog>}
                        <Dialog disableEscapeKeyDown open={props.renamews} onClose={handleClose2}>
                            <DialogTitle>Change Workspace Name</DialogTitle>
                            <DialogContent>
                                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <TextField value={wsname} onChange={(e) => { setwsname(e.target.value) }} placeholder='name' size='small'></TextField>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose2}>Cancel</Button>
                                <Button variant='contained'
                                    onClick={() => {
                                        handleWorkspaceRename()
                                    }}>Rename</Button>
                            </DialogActions>
                        </Dialog>
                        <ClientPage rootUser={props.rootUser} setselectedproject={props.setselectedproject} selectedclient={props.selectedclient} />
                    </Box>
                )
            }
        }



        return (
            <Box flex={5}>
                <Dialog disableEscapeKeyDown open={props.renamews} onClose={handleClose2}>
                    <DialogTitle>Change Workspace Name</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField value={wsname} onChange={(e) => { setwsname(e.target.value) }} placeholder='name' size='small'></TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose2}>Cancel</Button>
                        <Button variant='contained'
                            onClick={() => {
                                handleWorkspaceRename()
                            }}>Rename</Button>
                    </DialogActions>
                </Dialog>
                {myContext.workspace && <Dialog disableEscapeKeyDown open={props.deletews} onClose={handleClose3}>
                    <DialogTitle>Delete Workspace</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField value={enterws} onChange={(e) => { setenterws(e.target.value) }} placeholder='Enter Workspace Name' size='small'></TextField>
                            <Typography variant='caption' color={'red'} >deleting workspace will also remove all the clients and projects linked with it</Typography>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose3}>Cancel</Button>
                        {enterws === myContext.workspace.name && <Button color='red' variant='contained'
                            onClick={() => {
                                handleWorkspaceDelete()
                                window.location.reload(false) ;localStorage.clear()
                            }}>Delete</Button>
                            ||
                            <Button disabled>
                                Delete
                            </Button>}
                    </DialogActions>
                </Dialog>}
            </Box>
        )


    }
}

export default Homemain
