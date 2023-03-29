import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { CloseCircle } from 'iconsax-react'
import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'
import Select from '@mui/material/Select';
import { useContext } from 'react'
import api from '../Api'
const AddTeamBox = () => {
    useEffect(() => {
        let ws = localStorage.getItem('ws')
        setwsId(ws)
    }, [])

    const [wsId, setwsId] = useState()
    const myContext = useContext(AppContext);
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const [personName, setPersonName] = useState([]);
    const [teamName, setteamName] = useState()
    const [users, setusers] = useState()
    const [rootUser, setrootUser] = useState()
  
    useEffect(() => {
      api.get("/profile", { withCredentials: true })
              .then(res => {
                  setrootUser(res.data.rootUser) 
                 
              }).catch((err) => {
                  
              })
    }, [])
  
    useEffect(() => {
        if(rootUser){
            api.post('/users',{_id:rootUser._id,wsId:wsId})
            .then(res=>{
              setusers(res.data)
            })
            .catch(err=>{})
          }
    }, [rootUser])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    const handleCreate = ()=>{
        console.log(teamName)
        console.log(personName)
        api.post('/createteam',{teamName,personName,rootUser,workspace:myContext.workspace})
        .then(res=>{alert(res.data.message)})
        .catch(err=>{})
    }
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };

    if (myContext.teamValue && users) {
        return (
            <Box width={'40%'} height={'70%'} position={'absolute'} bgcolor={'#fff'}
                boxShadow={'rgba(0, 0, 0, 0.35) 0px 5px 20px'}
                marginX={'30%'}
                marginTop={'8%'}
                sx={{ zIndex: '1000' }}>
                <Box textAlign={'right'}>
                    <Button onClick={()=>{
                        setPersonName([])
                        setteamName('')
                        myContext.toggleTeam()
                        }}>
                        <CloseCircle />
                    </Button>
                </Box>
                <Box
                    display={'flex'} justifyContent={'space-evenly'}
                    flexDirection={'column'} alignItems={'center'}
                    height={'80%'}>
                    <TextField value={teamName} onChange={(e)=>{setteamName(e.target.value)}} label='Team Name'></TextField>
                    <FormControl sx={{ width: 250 }}>
                        <InputLabel id="demo-multiple-checkbox-label">Members</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            input={<OutlinedInput label="Members" />}
                            renderValue={(selected) => selected.join(', ')}
                            MenuProps={MenuProps}
                        >
                            {users.map((user) => (
                                <MenuItem key={user._id} value={user.name}>
                                    <Checkbox checked={personName.indexOf(user.name) > -1} />
                                    <ListItemText primary={user.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box display={'flex'} justifyContent={'space-evenly'}
                        flexDirection={'row'} width={'50%'} >
                        <Button variant='outlined' onClick={myContext.toggleTeam}>Cancel</Button>
                        <Button variant='contained' onClick={handleCreate}>Create</Button>
                    </Box>
                </Box>
            </Box>
        )
    }
    else {
        return (
            <></>
        )
    }
}

export default AddTeamBox
