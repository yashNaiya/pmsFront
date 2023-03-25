import { Box, IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { Message, People, Profile } from 'iconsax-react';
import React, { useEffect, useState } from 'react'

const Task = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [color, setcolor] = useState()
    let tempcolor = ''
    const setcolorFun = ()=>{
        if(props.task.status==='error'){
            tempcolor = 'red.main'
        }else if(props.task.status==='on hold'){
            tempcolor = 'grey.main'
        }else if(props.task.status==='working'){
            tempcolor = 'orange.main'
        }
    }
    const changeStatus = (changedColor)=>{
        if(props.task.owner._id===props.rootUser._id){
            setcolor(changedColor)
        }else{
            alert('you are not authorized to change the state of this task')
        }
        
    }
    useEffect(() => {
      setcolor(tempcolor)
    }, [tempcolor])
    
    if(props){
        
        setcolorFun()
        const handleClick = (event) => {
            console.log(event.currentTarget)
            setAnchorEl(event.currentTarget);
        };
        const handleClose = () => {
            setAnchorEl(null);
        };
        const Open = Boolean(anchorEl);
    
        return (
            <Stack  paddingX='.2rem' paddingY='.1rem' margin={'auto'} width={'99%'} direction={'row'} justifyContent='space-between'>
                <Box textAlign={'center'} alignSelf='center' flex={5}><Typography>{props.task.name}</Typography></Box>
                <Box textAlign={'center'} alignSelf='center' flex={2}><IconButton><Message /></IconButton></Box>
                <Box textAlign={'center'} alignSelf='center' flex={2}><IconButton>{props.task.ownerType === 'solo' ? <Profile /> : <People />}</IconButton></Box>
                <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    onClick={handleClick}
                    textAlign={'center'} bgcolor={color} flex={4}
                    aria-controls={Open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Open ? 'true' : undefined}
                >
                </Box>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={Open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    sx={{ width: '10rem' }}
                >
                    <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'green.main' }} onClick={() => { setAnchorEl(null); changeStatus('green.main') }}></MenuItem>
                    <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'orange.main' }} onClick={() => { setAnchorEl(null); changeStatus('orange.main') }}></MenuItem>
                    <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'grey.main' }} onClick={() => { setAnchorEl(null); changeStatus('grey.main') }}></MenuItem>
                    <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'red.main' }} onClick={() => { setAnchorEl(null); changeStatus('red.main')}} ></MenuItem>
                </Menu>
                <Box textAlign={'center'} alignSelf='center' flex={3}><Typography>{props.task.due.split('T')[0]}</Typography></Box>
                <Box textAlign={'center'} alignSelf='center' flex={3}><Typography>{props.task.linkedTo}</Typography></Box>
            </Stack>
        )
    }
}

export default Task
