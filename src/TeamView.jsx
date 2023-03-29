import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react'
import api from './Api'

const TeamView = () => {
    const [team, setteam] = useState()
    useEffect(() => {
        const _id = localStorage.getItem('ViewedTeam')
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
        return (
            <Box>
                {team.name}
            </Box>
        )
    }
}

export default TeamView
