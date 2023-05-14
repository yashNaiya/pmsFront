import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material';
import api from '../../Api';

const AllUsers = (props) => {
    const [data, setdata] = useState([])

    useEffect(() => {
        setdata(props.users)
    }, [props])

    const columns = ["name", "email", "number", "role", {
        name: 'Action'
        , options: {
            customBodyRender: (value, tableMeta) => {
                return (
                    <Box>
                        <Button sx={{ marginRight: '1rem' }} variant='contained' onClick={() => {
                            // console.log(tableMeta.rowData[1]) 
                            api.post('/removefromws', { email: tableMeta.rowData[1], ws: props.workspace })
                                .then(res => {
                                    alert(res.data.message)
                                    api.post('/users', { _id: props.rootUser._id, wsId: props.workspace._id })
                                        .then(res => {
                                            setdata(res.data)
                                        })
                                })
                        }
                        }>
                            remove
                        </Button>
                    </Box>

                )
            }
        }
    }];
    const columns2 = ["name", "email", "number", "role"]
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
    if (data) {
        return (
            <Box flex={5}>
                <Box margin={'5%'}>
                    <MUIDataTable
                        title={'Users'}
                        data={data}
                        columns={props.isAdmin ? columns : columns2}
                        options={options} />
                </Box>

            </Box>
        )
    }
}

export default AllUsers


