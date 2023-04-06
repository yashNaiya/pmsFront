import { Box, Button } from '@mui/material'
import MUIDataTable from 'mui-datatables'
import React, { useEffect, useState } from 'react'
import api from './Api'

const TeamView = () => {
    const [team, setteam] = useState()
  
    let columns = ['name', 'role', 'number']
    useEffect(() => {
        const _id = localStorage.getItem('viewedTeam')
        if (_id) {
            console.log(_id)
            api.post('/readteambyid', {_id:_id})
                .then(res => { 
                    setteam(res.data) 
                    console.log("hiiii")
                })
                .catch(err => console.log(err))
        }
    }, [])

    console.log(team)
    if (team) {
        const options = {
            filter: true,
            selectableRows: false,
            filterType: "dropdown",
            responsive: "standard",
            rowsPerPage: 10,
            print: false,
            pagination: false,
        }
        return (
            <Box flex={5}>
               
                <Box margin={'5%'}>
                    {/* <Box display={'flex'} marginBottom='3rem' justifyContent='flex-end' alignItems={'center'}>
                        
                    </Box> */}
                    <MUIDataTable
                        title={team.name}
                        data={team.members}
                        columns={columns}
                        options={options} />
                </Box>
            </Box>
        )
    }
}

export default TeamView
