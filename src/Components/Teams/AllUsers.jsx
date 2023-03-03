import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import { Button } from '@mui/material';

const AllUsers = (props) => {
    const [data, setdata] = useState([])

    useEffect(() => {
      setdata(props.users)
    }, [props])
    
    const columns = ["name", "email", "number", "role",{name:'Action'
    ,options:{
        customBodyRender: (value, tableMeta) => {
            return (
                <Box>
                <Button sx={{marginRight:'1rem'}} variant='contained' onClick={() => console.log(value, tableMeta) }>
                    remove
                </Button>
                </Box>
                
            )
        }
    }}];
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
    if(data){
        return (
            <Box flex={5}>
                <Box margin={'5%'}>
                    <MUIDataTable
                        title={'Users'}
                        data={data}
                        columns={columns}
                        options={options} />
                </Box>
    
            </Box>
        )
    }
}

export default AllUsers

