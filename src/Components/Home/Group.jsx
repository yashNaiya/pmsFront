import { Box, Button, IconButton, Menu, MenuItem } from '@mui/material'
import { height, Stack } from '@mui/system'
import { ArrowDown2, Message, Profile } from 'iconsax-react'
import React, { useState } from 'react'

const Group = () => {
    const [anchorEl, setAnchorEl] = useState(null)
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const Open = Boolean(anchorEl);
    return (
        <Box marginY='1.5rem'>
            <Button sx={{ textTransform: 'none', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}><ArrowDown2 /> Group</Button>
            <Box marginY='1rem'>
                <Stack bgcolor={'grey.main'} p='.2rem' margin={'auto'} width={'80%'} direction={'row'} justifyContent='space-between'>
                    <Box textAlign={'center'} flex={5}>Item</Box>
                    <Box textAlign={'center'} flex={2}></Box>
                    <Box textAlign={'center'} flex={2}>Owner</Box>
                    <Box textAlign={'center'} flex={4}>Status</Box>
                    <Box textAlign={'center'} flex={3}>Due</Box>
                    <Box textAlign={'center'} flex={3}>Linked To</Box>
                </Stack>
                <Stack paddingX='.2rem' paddingY='.1rem' margin={'auto'} width={'80%'} direction={'row'} justifyContent='space-between'>
                    <Box textAlign={'center'} alignSelf='center' flex={5}>Item Name</Box>
                    <Box textAlign={'center'} alignSelf='center' flex={2}><IconButton><Message /></IconButton></Box>
                    <Box textAlign={'center'} alignSelf='center' flex={2}><IconButton><Profile /></IconButton></Box>
                    <Box sx={{ ":hover": { cursor: 'pointer' } }}
                        onClick={handleClick}
                        textAlign={'center'} bgcolor='green.main' flex={4}
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
                        sx={{width:'10rem'}}
                    >
                        <MenuItem sx={{width:'5rem' ,height:'2rem', backgroundColor:'green.main'}} onClick={() => { setAnchorEl(null); }}></MenuItem>
                        <MenuItem sx={{width:'5rem' ,height:'2rem', backgroundColor:'orange.main'}} onClick={() => { setAnchorEl(null); }}></MenuItem>
                        <MenuItem sx={{width:'5rem' ,height:'2rem', backgroundColor:'red.main'}} onClick={() => { setAnchorEl(null); }} ></MenuItem>
                    </Menu>
                    <Box textAlign={'center'} alignSelf='center' flex={3}>23-3-2023</Box>
                    <Box textAlign={'center'} alignSelf='center' flex={3}>Add login page to the site</Box>
                </Stack>
                
            </Box>
        </Box>
    )
}

export default Group
