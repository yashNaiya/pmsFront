import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AppContext from './../AppContext'
import { useContext } from 'react'
import api from '../../Api'
import { Add, CloseCircle, Edit, Edit2, Profile } from 'iconsax-react'
import MUIDataTable from 'mui-datatables'

const ManageProject = (props) => {
    const [users, setusers] = useState([])
    const [usersTemp, setusersTemp] = useState([])
    const [teams, setteams] = useState([])
    const [editmembers, seteditmembers] = useState(false)
    const [editreq, seteditreq] = useState(false)
    const [requirementList, setrequirementList] = useState(props.project.requirements)
    const [name, setname] = useState(props.project.name)
    const [manager, setmanager] = useState(props.project.manager)
    const [due, setdue] = useState(props.project.due)
    const [editdetais, seteditdetais] = useState(false)
    useEffect(() => {
        api.post('/getmembers', props.project.members)
            .then(res => {
                setteams(res.data.teams)
                setusers(res.data.users)
            })
    }, [])
    useEffect(() => {
        api.post('/getmembers', props.project.members)
            .then(res => {
                setteams(res.data.teams)
                setusers(res.data.users)
            })
    }, [props.project])
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
    const handleRequirementRemove = (index) => {
        const list = [...requirementList]
        list.splice(index, 1)
        setrequirementList(list)
    }
    const handleReqirementUpdate = () => {
        console.log(requirementList)
        api.post('/changeprojectrequiremnets', { requirementList: requirementList, projectId: props.project._id })
            .then(res => {
                api.post('/readproject', { _id: props.project._id })
                    .then(res => props.setselectedproject(res.data))
                seteditreq(false);
                // setrequirementList(props.project.requirements)
            })
    }
    const handleDetailChange = () => {
        api.post('/changeprojectdetail', { name: name, due: due, manager: manager, projectId: props.project._id })
            .then(res => {
                api.post('/readproject', { _id: props.project._id })
                    .then(res => props.setselectedproject(res.data))
                seteditdetais(false);
            })
    }
    const columns = ["name", "email", "number", "role", {
        name: 'Action'
        , options: {
            customBodyRender: (value, tableMeta) => {
                return (
                    <Box>
                        <Button sx={{ marginRight: '1rem' }} variant='contained'
                            onClick={() => {
                                api.post('/removefromproject', { team: false, name: tableMeta.rowData[0], projectId: props.project._id })
                                    .then(res => {
                                        seteditmembers(false); 
                                        alert(res.data.message)
                                        api.post('/readproject', { _id: props.project._id })
                                            .then(res => props.setselectedproject(res.data))
                                    })
                            }}>
                            remove
                        </Button>
                    </Box>

                )
            }
        }
    }];
    const columns2 = ["name", {
        name: 'Action'
        , options: {
            customBodyRender: (value, tableMeta) => {
                return (
                    <Box>
                        <Button sx={{ marginRight: '1rem' }} variant='contained'
                            onClick={() => {
                                console.log(tableMeta.rowData)
                                api.post('/removefromproject', { team: true, name: tableMeta.rowData[0], projectId: props.project._id })
                                    .then(res => {
                                        seteditmembers(false); 
                                        alert(res.data.message)
                                        api.post('/readproject', { _id: props.project._id })
                                            .then(res => props.setselectedproject(res.data))
                                    })
                            }}>
                            remove
                        </Button>
                    </Box>

                )
            }
        }
    }];
    const options = {
        filter: true,
        selectableRows: 'none',
        filterType: "dropdown",
        responsive: "standard",
        rowsPerPage: 10,
        print: false,
        pagination: false,

        onRowClick: () => {

        }
    }

    // const options1 = {
    //     filter: true,
    //     selectableRows: 'none',
    //     filterType: "dropdown",
    //     responsive: "standard",
    //     rowsPerPage: 10,
    //     print: false,
    //     pagination: false,

    //     onRowClick: (rowData) => {
    //         let _id = ""
    //         for (let i = 0; i < teams.length; i++) {
    //             if (teams[i].name === rowData[0])
    //                 _id = teams[i]._id
    //         }
    //         if (_id !== "") {
    //             console.log(_id)
    //             localStorage.setItem("viewedTeam", _id)
    //             window.open("/TeamView", "_blank")
    //         }
    //     }
    // }
    const options2 = {
        filter: true,
        selectableRows: 'none',
        filterType: "dropdown",
        responsive: "standard",
        rowsPerPage: 10,
        print: false,
        pagination: false,

        onRowClick: (rowData) => {
            let _id = ""
            for (let i = 0; i < teams.length; i++) {
                if (teams[i].name === rowData[0])
                    _id = teams[i]._id
            }
            if (_id !== "") {
                console.log(_id)
                localStorage.setItem("viewedTeam", _id)
                window.open("/TeamView", "_blank")
            }
        }
    }
    const handleSearchChange = (e) => {
        setmanager(e.target.value)

        if (e.target.value === '') {
            setusersTemp([])
        } else {
            api.post('/getmembers', props.project.members)
                .then(res => {
                    setusersTemp(res.data.users)
                    // console.log(res.data)
                })
                .catch(err => { })
        }

    }
    const users1 = usersTemp.filter(user => {
        return user.name.includes(manager) || user.email.includes(manager)
    })

    const myContext = useContext(AppContext)
    return (
        <Box flex={5}>
            {myContext.workspace && <Dialog disableEscapeKeyDown open={props.deletews} onClose={props.handleClose3}>
                <DialogTitle>Delete Workspace</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TextField value={props.enterws} onChange={(e) => { props.setenterws(e.target.value) }} placeholder='Enter Workspace Name' size='small'></TextField>
                        <Typography variant='caption' color={'red'} >deleting workspace will also remove all the clients and projects linked with it</Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose3}>Cancel</Button>
                    {props.enterws === myContext.workspace.name && <Button color='red' variant='contained'
                        onClick={() => {
                            props.handleWorkspaceDelete()
                            window.location.reload(false); localStorage.clear()
                        }}>Delete</Button>
                        ||
                        <Button disabled>
                            Delete
                        </Button>}
                </DialogActions>
            </Dialog>}
            <Dialog disableEscapeKeyDown open={props.renamews} onClose={props.handleClose2}>
                <DialogTitle>Change Workspace Name</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <TextField value={props.wsname} onChange={(e) => { props.setwsname(e.target.value) }} placeholder='name' size='small'></TextField>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleClose2}>Cancel</Button>
                    <Button variant='contained'
                        onClick={() => {
                            props.handleWorkspaceRename()

                        }}>Rename</Button>
                </DialogActions>
            </Dialog>
            <Box textAlign={'right'}>
                <IconButton onClick={() => {
                    props.setmanageProject(false)
                }}>
                    <CloseCircle />
                </IconButton>
            </Box>
            <Box margin={'3rem'}>
                <Box display={'flex'} flexDirection='row' justifyContent='space-between'>
                    {editdetais && <TextField sx={{ width: '30%' }} variant='standard'
                        onChange={(e) => {
                            setname(e.target.value)
                        }}
                        name='name' value={name} ></TextField>
                        ||
                        <Typography fontWeight='bold' variant='h4' color={'primary.main'}>{props.project.name}</Typography>}
                    <Button onClick={() => { seteditdetais(true) }} variant='outlined' sx={{ color: 'black' }}>edit details<Edit /></Button>
                </Box>
                {editdetais &&
                    <Box marginTop={'2rem'}>
                        <Box width='30%'>
                            <Typography paddingY={1} marginRight={'5rem'}>Due Date :{due.split('T')[0]}</Typography>
                            <TextField fullWidth variant='standard' borderRadius={'.5rem'}
                                onChange={(e) => {
                                    setdue(e.target.value)
                                }}
                                type='date'
                                name='due' paddingLeft={3} paddingY={1} value={due} size='small' sx={{ marginBottom: '1rem' }} label='due date'></TextField>
                        </Box>
                        <Box width='30%'>
                            <Typography paddingY={1} marginRight={'5rem'}>Manager :</Typography>
                            <TextField fullWidth variant='standard' name='manager' onChange={handleSearchChange} sx={{ marginBottom: '1rem' }} label='project manager' value={manager.name}></TextField>
                            {users1.map(user => <div key={user._id}><Box display={'flex'} flexDirection='row' justifyContent={'left'} paddingX='.5rem' marginY='.1rem' sx={{ cursor: "pointer", borderRadius: '0.5rem' }}>
                                <Button fullWidth
                                    onClick={() => {
                                        setmanager(user)
                                    }} sx={{ backgroundColor: 'grey.main', color: "black", textTransform: 'none', justifyContent: 'left' }}>
                                    {user.name}
                                </Button>
                                <IconButton onClick={() => {
                                    localStorage.setItem("viewedProfile", user._id)
                                    window.open("/ProfileView", "_blank")
                                }} sx={{ backgroundColor: '#fff' }}><Profile /></IconButton>
                            </Box></div>)}
                        </Box>
                        <Box width='20%' display='flex' flexDirection={'row'} justifyContent='space-between'>
                            <Button onClick={() => { handleDetailChange() }} variant='contained'>save</Button>
                            <Button onClick={() => { seteditdetais(false); }} variant='outlined'>cancel</Button>
                        </Box>
                    </Box>
                    || <Box display='flex' flexDirection='column' width='100%' marginTop={'1rem'}>
                        <Box marginY={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                            <Typography>Due Date : </Typography>
                            <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{props.project.due.split('T')[0]}</Typography>
                        </Box>

                        <Box marginBottom={5} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'}>
                            <Typography>Manager : </Typography>
                            <Typography sx={{ backgroundColor: 'grey.main' }} borderRadius={'.5rem'} width='40%' paddingLeft={3} paddingY={1}>{props.project.manager.name}</Typography>
                        </Box>
                    </Box>}
                <Box width={'100%'} alignItems={'center'} borderBottom={'1px solid black'} sx={{ marginBottom: '1rem' }} display='flex' flexDirection={'row'} justifyContent='space-between'>
                    <Typography fontWeight={'bold'} fontSize='22px' marginTop={'2rem'} sx={{ marginBottom: '1rem' }}>Requiremnets :</Typography>
                    <IconButton onClick={() => seteditreq(true)}><Edit /></IconButton>
                </Box>
                {editreq &&
                    <Box>
                        <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
                            {
                                requirementList.map((requirement, index) => (
                                    <Box width='70%'>
                                        <Box display={'flex'} flexDirection='row' alignItems='flex-end' >
                                            <IconButton onClick={() => {
                                                requirementList.splice(index, 1)
                                                handleReqirementUpdate()
                                            }}><CloseCircle /></IconButton>
                                        </Box>
                                        <Box key={index} bgcolor={'grey.main'} borderRadius='.5rem' marginRight={'3rem'} paddingBottom={'1rem'} display='flex' marginTop={'1rem'} padding='1rem' flexDirection='column'>
                                            <TextField variant='standard' size='small' sx={{ marginY: '1rem' }} onChange={(e) => handleRequiremetChange(e, index)} label='name' name='name' value={requirement.name}></TextField>
                                            <TextField variant='standard' size='small' sx={{ marginBottom: '1rem' }} onChange={(e) => handleRequiremetChange(e, index)} label='desc' name='desc' value={requirement.desc}></TextField>
                                        </Box>
                                    </Box>
                                ))
                            }
                        </Box>
                        <Button
                            onClick={handleRequiremnetAdd}
                            sx={{ textTransform: 'none', justifyContent: 'left' }}><Add />Add</Button>
                        <Box width='20%' m='2rem' display='flex' flexDirection={'row'} justifyContent='space-between'>
                            <Button onClick={handleReqirementUpdate} variant='contained'>save</Button>
                            <Button onClick={() => { seteditreq(false); setrequirementList(props.project.requirements) }} variant='outlined'>cancel</Button>
                        </Box>
                    </Box>

                    ||
                    <Box display='flex' flexDirection={'row'} flexWrap='wrap'>
                        {
                            props.project.requirements.map((requirement, index) => (
                                <Box key={index} bgcolor={'grey.main'} borderRadius='.5rem' marginRight={'3rem'} width='70%' paddingBottom={'1rem'} display='flex' marginTop={'1rem'} padding='1rem' flexDirection='column'>
                                    <Typography sx={{ marginY: '1rem' }} label='name' name='name'>Name : {requirement.name}</Typography>
                                    <Typography sx={{ marginBottom: '1rem' }} label='email' name='email'>Desccription : {requirement.desc}</Typography>
                                </Box>
                            ))
                        }
                    </Box>}
                {users && teams && <Box marginTop={'1rem'}>
                    <Box borderBottom={'1px solid black'} display={'flex'} flexDirection='row' justifyContent='space-between' width='100%'>
                        <Typography fontWeight={'bold'} fontSize='22px' marginTop={'2rem'} sx={{ marginBottom: '1rem' }}>Members :</Typography>
                        <IconButton onClick={() => seteditmembers(true)}><Edit /></IconButton>
                    </Box>
                    <Box marginY={'5%'}>
                        <MUIDataTable
                            title={'Users'}
                            data={users}
                            columns={editmembers ? columns : ["name", "email", "number", "role"]}
                            options={options} />
                    </Box>
                    <Box marginY={'5%'}>
                        <MUIDataTable
                            title={'Teams'}
                            data={teams}
                            columns={editmembers ? columns2 : ['name']}
                            options={editmembers ? options : options2} />
                    </Box>
                    {editmembers && <Box display={'flex'} margin='3rem' justifyContent={'flex-end'}
                        flexDirection={'row'} >
                        <Button onClick={() => { seteditmembers(false); }} variant='outlined'>cancel</Button>
                    </Box>}
                </Box>}
            </Box>
        </Box >
    )
}

export default ManageProject
