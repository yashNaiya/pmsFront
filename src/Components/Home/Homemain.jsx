import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, InputAdornment, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { Add, CloseCircle, Edit, More, ProfileAdd, SearchNormal } from 'iconsax-react'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import api from '../../Api'
import Group from './Group'
import SelectAdd from './SelectAdd'

const Homemain = (props) => {
    const [groupName, setgroupName] = useState()
    const [open, setOpen] = React.useState(false);
    const [search, setsearch] = useState()
    const [invitetoproject, setinvitetoproject] = useState(false)
    const [index, setindex] = useState()
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    let selectedUsers = []
    const handleChange = (e) => {
        setsearch(e.target.value)
        console.log(search)
    }

    if (props.add) {
        return (
            <Box flex={5}>
                {props.selectedworkspacedata &&
                    <SelectAdd rootUser={props.rootUser} selectedworkspacedata={props.selectedworkspacedata} setaddcustomer={props.setaddcustomer} setaddproject={props.setaddproject} setadd={props.setadd} />
                    ||
                    <Typography>No workspace is selected</Typography>
                }
            </Box>
        )
    }
    else {
        if (props.selectedproject) {
            if (invitetoproject) {
                const columns = ["name", "email", "number", "role"];
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
                return (
                    <Box flex={5}>
                        <Box textAlign={'right'}>
                            <IconButton onClick={() => {
                                setinvitetoproject(false)
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
                                        console.log(props.users[i.index])
                                        selectedUsers.push(props.users[i.index])
                                    })
                                    api.post('/addusers', { users: selectedUsers, team: props.tempteam, rootUser: props.rootUser })
                                        .then(res => {
                                            alert(res.data.message)
                                            window.location.reload(false)
                                        })
                                        .catch(err => { })
                                }}>add</Button>
                            </Box>
                        </Box>
                    </Box>
                )
            }
            else {
                
                return (
                    <Box flex={5}>
                        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                            <DialogTitle>Add Group</DialogTitle>
                            <DialogContent>
                                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <TextField value={groupName} onChange={(e)=>{setgroupName(e.target.value)}} placeholder='name' size='small'></TextField>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button variant='contained' 
                                onClick={()=>{
                                    handleClose()
                                    api.post('/addgroup',{wsID:props.selectedworkspacedata._id,name:groupName,projectID:props.selectedproject._id})
                                    .then(res=>{})
                                    .catch()
                                    }}>Add</Button>
                            </DialogActions>
                        </Dialog>
                        <Box minHeight={'100vh'} direction={'column'} justifyContent='space-between'>
                            <Box display={'flex'} justifyContent={'space-between'} flexDirection={'column'} flex={.5} paddingX={'1rem'} borderBottom={'1px solid black'}>
                                <Box marginX={'1rem'} marginTop={'4rem'} display={'flex'} justifyContent={'space-between'} flexDirection={'row'}>
                                    <Typography sx={{marginBottom:'1rem'}} variant='h5'>{props.selectedproject.name}</Typography>
                                    <Box>
                                        <Button variant='outlined' onClick={() => setinvitetoproject(true)} sx={{ color: 'black' }}><ProfileAdd />invite</Button>
                                        <IconButton sx={{ color: 'black' }}><Edit /></IconButton>
                                    </Box>
                                </Box>
                                <Box>
                                    <Button sx={{ color: 'black' }}>Main Table</Button>
                                    <Button sx={{ color: 'black' }}>Timeline</Button>
                                    <Button sx={{ color: 'black' }}><Add /></Button>
                                </Box>
                            </Box>
                            <Box flex={9} margin={'1rem'}>
                                <Box display='flex' width='40%' justifyContent={'space-between'}>
                                    <Button onClick={()=>handleClickOpen()} variant='contained'>add group</Button>
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
                                        props.selectedproject.groups.map((group,index)=>(
                                            <Group key={index} group={group} />
                                        ))
                                    }
                                    
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                )
            }
        }

        else {
            return (
                <Box flex={5}>

                </Box>
            )
        }
    }
}

export default Homemain
