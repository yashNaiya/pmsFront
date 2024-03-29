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
import { useNavigate } from 'react-router-dom'

const Homemain = (props) => {
    const myContext = useContext(AppContext)
    const [wsname, setwsname] = useState()
    const [changeGroupname, setchangeGroupname] = useState(false)
    const [deletegroup, setdeletegroup] = useState(false)
    const [enterws, setenterws] = useState()
    const [groupName, setgroupName] = useState()
    const [open, setOpen] = useState(false);
    const [search, setsearch] = useState('')
    const [index, setindex] = useState()
    const [index2, setindex2] = useState()
    const [anchorEl2, setAnchorEl2] = useState(null)
    const [newadmin, setnewadmin] = useState({ name: '' })
    const [newgroupName, setnewgroupName] = useState()
    const [oldgroupname, setoldgroupname] = useState()
    const navigate = useNavigate()
    let tempadmin = []
    if (props.users) {
        tempadmin = props.users.filter(user => {
            return user.name === newadmin.name
        })
    }
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
        console.log(search)
    }
    const handleadminChange = () => {
        api.post('/adminchange', { wsId: myContext.workspace, newadmin: newadmin })
            .then(res => {
                alert("Admin for this Workspace has been changed")
                api.post('/signout', { rootUserId: props.rootUser._id }, { withCredentials: true })
                    .then(res => {
                        localStorage.clear()
                    })
                navigate('/')
            })
    }



    if (props.add && myContext.homepage === 2) {
        // console.log(props.changeadmin)
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
                {myContext.workspace && <Dialog disableEscapeKeyDown open={props.changeadmin} onClose={() => { props.setchangeadmin(false) }}>
                    <DialogTitle>Change Admin</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField onChange={(e) => { }} placeholder='Search User' size='small'></TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { props.setchangeadmin(false) }}>Cancel</Button>
                        <Button color='#ff0000' variant='contained'
                            onClick={() => {

                            }}>Change</Button>
                        {/* ||
                            <Button disabled>
                                Change
                            </Button> */}
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
                                    window.location.reload(false); localStorage.clear()
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
                        <Box display={'flex'} flexDirection='row' justifyContent='space-between'>
                            <Typography fontWeight='bold' variant='h4' color={'primary.main'}>Invite To Project</Typography>
                        </Box>
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
                                api.post('/addtoproject', { users: selectedUsers, project: props.selectedproject, rootUser: props.rootUser, adminId: myContext.workspace.admin })
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
                if (props.manageProject) {
                    return (
                        <ManageProject
                            project={props.selectedproject}
                            setselectedproject={props.setselectedproject}
                            handleClose2={handleClose2}
                            handleClose3={handleClose3}
                            wsname={wsname}
                            setwsname={setwsname}
                            setmanageProject={props.setmanageProject}
                            handleWorkspaceRename={handleWorkspaceRename}
                            handleWorkspaceDelete={handleWorkspaceDelete}
                            enterws={enterws}
                            setenterws={setenterws}
                            deletews={props.deletews}
                            renamews={props.renamews}
                        />
                    )
                } else {
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
                                            window.location.reload(false); localStorage.clear()

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
                            <Dialog fullWidth disableEscapeKeyDown open={changeGroupname} onClose={() => { setchangeGroupname(false) }}>
                                <DialogTitle>New Name</DialogTitle>
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <TextField value={newgroupName} onChange={(e) => { setnewgroupName(e.target.value) }} placeholder='name' size='small'></TextField>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => { setchangeGroupname(false) }}>Cancel</Button>
                                    <Button variant='contained'
                                        onClick={() => {
                                            setchangeGroupname(false)
                                            api.post('/groupnamechange', { projectId: props.selectedproject._id, newname: newgroupName, oldname: oldgroupname })
                                                .then(res => {
                                                    reloadProject()
                                                })
                                        }}>Change</Button>
                                </DialogActions>
                            </Dialog>
                            <Dialog fullWidth disableEscapeKeyDown open={deletegroup} onClose={() => { setchangeGroupname(false) }}>
                                <DialogTitle>Delete Group</DialogTitle>
                                <DialogContent>
                                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                        <Typography>Do you surely want to delete this group?</Typography>
                                    </Box>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={() => { setdeletegroup(false) }}>Cancel</Button>
                                    <Button variant='contained'
                                        onClick={() => {
                                            setdeletegroup(false)
                                        }}>Delete</Button>
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
                                                {props.isAdmin ? <Button variant='contained' onClick={() => { props.setmanageProject(true) }}>Manage Project</Button> : <></>}
                                            </Box>}
                                    </Box>
                                    {(props.selectedproject.manager._id.toString() === props.rootUser._id.toString() || myContext.workspace.admin.toString() === props.rootUser._id.toString())
                                        && <Box>
                                            {props.viewpage === 0 ? <Button onClick={() => { props.setviewpage(0) }} sx={{ borderRadius: '0', color: 'black', backgroundColor: 'grey.main' }}>Main Table</Button> :
                                                <Button onClick={() => { props.setviewpage(0) }} sx={{ borderRadius: '0', color: 'black' }}>Main Table</Button>}
                                            {props.viewpage === 1 ? <Button onClick={() => { props.setviewpage(1) }} sx={{ borderRadius: '0', color: 'black', backgroundColor: 'grey.main' }}>Timeline</Button> : <Button onClick={() => { props.setviewpage(1) }} sx={{ borderRadius: '0', color: 'black' }}>Timeline</Button>}
                                            {props.viewpage === 2 ? <Button onClick={() => { props.setviewpage(2) }} sx={{ borderRadius: '0', color: 'black', backgroundColor: 'grey.main' }}>Workload</Button> : <Button onClick={() => { props.setviewpage(2) }} sx={{ borderRadius: '0', color: 'black' }}>Workload</Button>}
                                            {props.viewpage === 3 ? <Button onClick={() => { props.setviewpage(3) }} sx={{ borderRadius: '0', color: 'black', backgroundColor: 'grey.main' }}>Dashboard</Button> : <Button onClick={() => { props.setviewpage(3) }} sx={{ borderRadius: '0', color: 'black' }}>Dashboard</Button>}
                                        </Box> ||
                                        <Box>
                                            <Button onClick={() => { props.setviewpage(0) }} sx={{ borderRadius: '0', color: 'black', backgroundColor: 'grey.main' }}>Main Table</Button>
                                        </Box>}
                                </Box>
                                {props.viewpage === 0 && <Box flex={9} margin={'1rem'}>
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
                                                <Group search={search} setoldgroupname={setoldgroupname} setdeletegroup={setdeletegroup} setchangeGroupname={setchangeGroupname} reloadProject={reloadProject} rootUser={props.rootUser} wsId={myContext.workspace._id} project={props.selectedproject} key={index} group={group} />
                                            ))
                                        }

                                    </Box>
                                </Box>}
                                {props.viewpage === 1 && <Timeline groups={props.selectedproject.groups} />}
                                {props.viewpage === 2 && <Workload rootUser={props.rootUser} project={props.selectedproject} />}
                                {props.viewpage === 3 && <Dashboard project={props.selectedproject} />}


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
                                        window.location.reload(false); localStorage.clear()
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
                                window.location.reload(false); localStorage.clear()
                            }}>Delete</Button>
                            ||
                            <Button disabled>
                                Delete
                            </Button>}
                    </DialogActions>
                </Dialog>}
                {myContext.workspace && <Dialog fullWidth disableEscapeKeyDown open={props.changeadmin} onClose={() => { props.setchangeadmin(false) }}>
                    <DialogTitle>Change Admin</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <TextField placeholder='enter user name' fullWidth value={newadmin.name} onChange={(e) => {
                                setnewadmin((prevState) => ({
                                    ...prevState,
                                    'name': e.target.value
                                }))
                            }}></TextField>
                            {tempadmin && tempadmin.map(admin => <div key={admin._id}><Box paddingX='.5rem' marginY='.1rem' sx={{ backgroundColor: '#fff', cursor: "pointer", borderRadius: '0.5rem' }}>
                                <Button fullWidth
                                    onClick={() => {
                                        setnewadmin(admin)
                                    }}
                                    sx={{ color: "black", textTransform: 'none', justifyContent: 'left' }}>
                                    {admin.name}
                                </Button>
                            </Box></div>)}
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { props.setchangeadmin(false); setnewadmin({ name: "" }) }}>Cancel</Button>
                        {newadmin._id && <Button variant='contained'
                            onClick={() => {
                                handleadminChange()
                                setnewadmin({ name: "" })
                            }}>Change</Button>
                            ||
                            <Button disabled>
                                Change
                            </Button>}
                    </DialogActions>
                </Dialog>}
            </Box>
        )


    }
}

export default Homemain
