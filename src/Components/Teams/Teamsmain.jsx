import { Box, Button, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemText, Menu, MenuItem, OutlinedInput, Select, TextField, Typography, } from '@mui/material'
import { CloseCircle, More, ProfileAdd, Trash } from 'iconsax-react'
import MUIDataTable from 'mui-datatables'
import React from 'react'
import { useState } from 'react'
import api from '../../Api'
import image from '../../Assets/Team.gif'
const Teamsmain = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [newname, setnewname] = useState()
    const [rename, setrename] = useState(false)
    const [remove, setremove] = useState(false)
    const [edit, setedit] = useState(false)
    const [invite, setinvite] = useState(false)
    const [index, setindex] = useState()
    let selectedUsers = []
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const Open = Boolean(anchorEl);
    if (props.tempteam) {
        const options = {
            filter: true,
            selectableRows: false,
            filterType: "dropdown",
            responsive: "standard",
            rowsPerPage: 10,
            print: false,
            pagination: false,
        }
        let columns = []
        if (edit && props.rootUser) {
            columns = ['name', 'role', 'number',
                {
                    name: '', options: {
                        customBodyRender: (value, tableMeta, updateValue) => {
                            return (
                                <Box>
                                    <IconButton onClick={() => {
                                        console.log(tableMeta.rowData)
                                        api.post('/reomvefromteam', { user: tableMeta.rowData, team: props.tempteam, rootUser: props.rootUser })
                                            .then(res => {
                                                alert(res.data.message)
                                                window.location.reload(false)
                                            })
                                            .catch(err => { })
                                    }}>
                                        <Trash />
                                    </IconButton>
                                </Box>

                            )
                        }
                    }

                }
            ]
        } else {
            columns = ['name', 'role', 'number']
        }
        if (rename && props.rootUser) {
            return (
                <Box flex={5}>
                    <Box width={'40%'} height={'60%'} position={'absolute'} bgcolor={'#fff'}
                        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 20px'}
                        marginX={'20%'}
                        marginTop={'8%'}
                        sx={{ zIndex: '1000' }}>
                        <Box textAlign={'right'}>
                            <IconButton onClick={() => {
                                setrename(false)
                            }}>
                                <CloseCircle />
                            </IconButton>
                        </Box>
                        <Box
                            display={'flex'} justifyContent={'space-evenly'}
                            flexDirection={'column'} alignItems={'center'}
                            height={'80%'}>
                            <TextField defaultValue={props.tempteam.name} value={newname}
                                onChange={(e) => { setnewname(e.target.value) }}></TextField>
                            <Box display={'flex'} justifyContent={'space-evenly'}
                                flexDirection={'row'} width={'50%'} >
                                <Button variant='outlined' onClick={() => { setrename(false) }}>cancel</Button>
                                <Button variant='contained' onClick={() => {
                                    api.post('/renameteam', { team: props.tempteam, rootUser: props.rootUser, newname: newname })
                                        .then(res => { alert(res.data.message) })
                                        .catch(err => { })
                                    setrename(false)
                                }}>save</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        }
        if (remove && props.rootUser) {
            return (
                <Box flex={5}>
                    <Box width={'40%'} height={'60%'} position={'absolute'} bgcolor={'#fff'}
                        boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 20px'}
                        marginX={'20%'}
                        marginTop={'8%'}
                        sx={{ zIndex: '1000' }}>
                        <Box textAlign={'right'}>
                            <IconButton onClick={() => {
                                setremove(false)
                            }}>
                                <CloseCircle />
                            </IconButton>
                        </Box>
                        <Box
                            display={'flex'} justifyContent={'space-evenly'}
                            flexDirection={'column'} alignItems={'center'}
                            height={'80%'}>
                            <Typography variant='h6'>{props.tempteam.name}</Typography>
                            <Typography>Are you sure you want to delete this team?</Typography>
                            <Box display={'flex'} justifyContent={'space-evenly'}
                                flexDirection={'row'} width={'50%'} >
                                <Button variant='contained'
                                    onClick={() => {
                                        api.post('/deleteteam', { team: props.tempteam, rootUser: props.rootUser })
                                            .then(res => {
                                                alert(res.data.message)
                                                setremove(false)
                                                window.location.reload(false)
                                            })
                                            .catch(err => { })
                                    }}
                                >yes</Button>
                                <Button variant='outlined'
                                    onClick={() => {
                                        setremove(false)
                                    }}>no</Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            )
        }
        if (invite && props.rootUser) {
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
                    // console.log()
                }
            }
            return (
                <Box flex={5}>
                    <Box textAlign={'right'}>
                        <IconButton onClick={() => {
                            setinvite(false)
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
        return (
            <Box flex={5}>
                {/* <Stack minHeight={'100vh'} direction={'column'} justifyContent='space-between'>
                    <Box display={'flex'} justifyContent={'space-between'} flexDirection={'column'} flex={.5} paddingBottom={'1rem'} paddingX={'1rem'} borderBottom={'1px solid black'}>
                        <Box marginTop={'4rem'} display={'flex'} justifyContent={'space-between'} flexDirection={'row'}>
                            <Typography variant='h5'>Development Team</Typography>
                            <Box>
                                <Button variant='outlined' sx={{ color: 'black' }}><ProfileAdd />invite</Button>
                                <Button sx={{ color: 'black' }}><More /></Button>
                            </Box>
                        </Box>
                        <Box>
                            <TextField
                                value={search}
                                onChange={(e)=>{setsearch(e.target.value)}}
                                variant='standard'
                                size='small'
                                sx={{backgroundColor:'grey.main',borderRadius:'.5rem' ,paddingX:'.5rem',paddingY:'.2rem'}}
                                placeholder='search'
                                InputProps={{
                                    disableUnderline: true,
                                    startAdornment: <InputAdornment position="start"><SearchNormal /></InputAdornment>,
                                }}
                            />
                        </Box>
                    </Box>
                    <Box flex={9} paddingY='3rem'>
                        <Box display={'flex'} alignItems='center' flexDirection={'column'} >
                           <Stack direction={'row'} marginBottom='1rem' backgroundColor='grey.main' justifyContent='space-between' width='80%'>
                                <Typography flex={1}>Name</Typography>
                                <Typography flex={1}>Email</Typography>
                                <Typography flex={1}>Number</Typography>
                           </Stack>
                           <Stack direction={'row'} marginBottom='1rem' justifyContent='space-between' width='80%'>
                                <Typography flex={1}>shyam</Typography>
                                <Typography flex={1}>shyam30@gmail.com</Typography>
                                <Typography flex={1}>9081819007</Typography>
                           </Stack>
                        </Box>
                    </Box>
                </Stack> */}
                <Box margin={'5%'}>
                    <Box display={'flex'} marginBottom='3rem' justifyContent='flex-end' alignItems={'center'}>
                        <Button variant='outlined'
                            onClick={() => { setinvite(true) }}
                            sx={{ color: '#000', borderBlockColor: '#000', marginRight: '2rem' }}><ProfileAdd />invite</Button>
                        <IconButton
                            aria-controls={Open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={Open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <More />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={Open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => { setAnchorEl(null); setrename(true) }} >Rename</MenuItem>
                            <MenuItem onClick={() => { setAnchorEl(null); setedit(true) }} >Edit</MenuItem>
                            <MenuItem onClick={() => { setAnchorEl(null); setremove(true) }} >Delete</MenuItem>
                        </Menu>

                    </Box>
                    <MUIDataTable
                        title={props.tempteam.name}
                        data={props.tempteam.members}
                        columns={columns}
                        options={options} />

                    {edit &&
                        <Box display={'flex'} justifyContent='flex-end' marginTop={'3rem'} alignItems={'center'}>
                            <Button variant='outlined' onClick={() => { setedit(false) }}>cancel</Button>
                        </Box>
                    }
                </Box>
            </Box>
        )
    } else {
        return (
            <Box flex={5} display='flex' justifyContent={'center'} alignItems='center' >
                <img src={image} alt=''></img>

            </Box>
        )
    }
}

export default Teamsmain
