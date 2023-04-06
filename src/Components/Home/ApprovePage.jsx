import { Box, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from '../../Api'
import AppContext from './../AppContext'
import { useContext } from 'react'
import MUIDataTable from 'mui-datatables'
const ApprovePage = () => {
    const myContext = useContext(AppContext);
    const [action, setaction] = useState()
    useEffect(() => {
        api.post('/projectrequests', { wsId: myContext.workspace._id })
            .then(res => { setaction(res.data) })
            .catch()
    }, [])
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
                                    api.post('/approveprojectaction', { data: tableMeta.rowData })
                                        .then(res => {
                                            alert(res.data.message)
                                            api.post('/projectrequests', { wsId: myContext.workspace._id })
                                                .then(res => { setaction(res.data) })
                                                .catch()
                                        })
                                        .catch()
                                }}>
                                Approve
                            </Button>
                            <Button variant='outlined'
                                onClick={() => {

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
    if (action) {
        console.log(action)
        return (
            <Box margin={'5%'}>
                <MUIDataTable
                    title={'Projects Updates'}
                    data={action}
                    columns={columns2}
                    options={options} />

            </Box>
        )
    }
}

export default ApprovePage
