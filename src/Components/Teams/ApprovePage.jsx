import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button, IconButton, Typography } from '@mui/material';
import api from '../../Api';
import { CloseCircle, FolderOpen, Zoom } from 'iconsax-react';
import AppContext from '../AppContext'
import { useContext } from 'react'
const ApprovePage = () => {
    const myContext = useContext(AppContext)
    const [teams, setteams] = useState()
    const [tempteam, settempteam] = useState()
    const [action, setaction] = useState()
    const [showteam, setshowteam] = useState(false)
    useEffect(() => {
        api.post('/notapprovedteams', { wsId: myContext.workspace._id })
            .then(res => {
                console.log(res.data)
                setteams(res.data)
            })
            .catch(e => { })
        api.post('/actionnotapproved', { wsId: myContext.workspace._id })
            .then(res => { setaction(res.data) })
            .catch()
    }, [])



    const columns = ["name", {
        name: "admin",
        options: {
            customBodyRender: (value, tableMeta, updateValue) => (
                <div>{value.name}</div>
            )
        }
    },
        {
            name: "members",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Box display={'flex'} flexDirection={'row'} alignItems='center'>
                        {value[0] ? <Typography>{value[0].name}</Typography> : <></>}
                        {value[1] ? <Typography>, {value[1].name}</Typography> : <></>}
                        {value[2] ? <Typography>, {value[2].name}</Typography> : <></>}
                        ...
                    </Box>

                )
            }
        },
        {
            name: '', options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Box>
                            <IconButton onClick={() => {
                                console.log(tableMeta.rowData[0])
                                api.post('/readteam', { name: tableMeta.rowData[0] })
                                    .then(res => { settempteam(res.data) })
                                    .catch(err => { })
                                setshowteam(!showteam)
                            }}>
                                <FolderOpen />
                            </IconButton>
                        </Box>

                    )
                }
            }

        },
        {
            name: 'Action', options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Box>
                            <Button sx={{ marginRight: '1rem' }} variant='contained'
                                onClick={() => {
                                    api.post('/approveteam', { name: tableMeta.rowData[0] })
                                        .then(res => {
                                            alert(res.data.message)
                                            api.post('/notapprovedteams', { wsId: myContext.workspace._id })
                                                .then(res => {
                                                    console.log(res.data)
                                                    setteams(res.data)
                                                })
                                                .catch(e => { })
                                        })
                                        .catch(err => { })
                                }}>
                                Approve
                            </Button>
                            <Button variant='outlined'
                                onClick={() => {
                                    api.post('/rejectteam', { name: tableMeta.rowData[0] })
                                        .then(res => {
                                            alert(res.data.message)
                                            api.post('/notapprovedteams', { wsId: myContext.workspace._id })
                                                .then(res => {
                                                    console.log(res.data)
                                                    setteams(res.data)
                                                })
                                                .catch(e => { })
                                        })
                                        .catch(err => { })
                                }}>
                                delete
                            </Button>
                        </Box>

                    )
                },
            }
        }];
    const columns2 = [
        {
            name: "name",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => (
                    <div>{value.name}</div>
                )
            }
        },
        "action",
        {
            name: "by",
            options: {
                customBodyRender: (value, tableMeta, updateValue) => (
                    <Box>{value.name}</Box>
                )
            }
        },
        "metadata",
        {
            name: 'Action', options: {
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Box>
                            <Button sx={{ marginRight: '1rem' }} variant='contained'
                                onClick={() => {
                                    // console.log(tableMeta.rowData)
                                    api.post('/approveaction', { data: tableMeta.rowData })
                                        .then(res => {
                                            alert(res.data.message)
                                            api.post('/actionnotapproved', { wsId: myContext.workspace._id })
                                                .then(res => { setaction(res.data) })
                                                .catch()
                                        })
                                        .catch()
                                }}>
                                Approve
                            </Button>
                            <Button variant='outlined'
                                onClick={() => {
                                    api.post('/rejectaction', { data: tableMeta.rowData })
                                        .then(res => {
                                            alert(res.data.message)
                                            api.post('/actionnotapproved', { wsId: myContext.workspace._id })
                                                .then(res => { setaction(res.data) })
                                                .catch()
                                        })
                                        .catch()
                                }}>
                                delete
                            </Button>
                        </Box>

                    )
                },
            }
        }
    ];
    const options = {
        filter: true,
        selectableRows: false,
        filterType: "dropdown",
        responsive: "standard",
        rowsPerPage: 10,
        print: false,
        pagination: false,
    }

    if (!showteam) {
        return (
            <Box flex={5}>
                <Box margin={'5%'}>

                    <MUIDataTable
                        title={'Teams'}
                        data={teams}
                        columns={columns}
                        options={options} />

                </Box>
                <Box margin={'5%'}>

                    <MUIDataTable
                        title={'Teams Update'}
                        data={action}
                        columns={columns2}
                        options={options} />

                </Box>
            </Box>
        )
    } else {
        if (tempteam) {
            return (
                <Box flex={5}>
                    <Box display={'flex'} justifyContent={'flex-end'}>
                        <IconButton onClick={() => { setshowteam(!showteam) }}>
                            <CloseCircle />
                        </IconButton>
                    </Box>
                    <Box>
                        {tempteam.name}
                        {tempteam.admin.name}
                        <Box>
                            {tempteam.members.map(profile => {
                                return (
                                    <Box>
                                        {profile.name}
                                        {profile.number}
                                        {profile.role}
                                    </Box>
                                )
                            })}
                        </Box>
                    </Box>
                </Box>
            )
        } else {
            return (<Box flex={5}></Box>)
        }
    }
}

export default ApprovePage
