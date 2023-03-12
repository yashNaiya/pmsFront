import { Box, Button, IconButton, Menu, MenuItem, Typography } from '@mui/material'
import { height, Stack } from '@mui/system'
import { ArrowDown2, ArrowRight2, Message, Profile } from 'iconsax-react'
import React, { useState } from 'react'

const Group = (props) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [open, setopen] = useState(false)
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClick = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const Open = Boolean(anchorEl);
    if (props.group) {
        return (
            <Box marginY='1.5rem'>
                <Button onClick={()=>setopen(!open)} sx={{ textTransform: 'none', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }}>{open?<ArrowDown2 />:<ArrowRight2/>}{props.group.name}</Button>
                {open && <Box marginY='1rem'>
                    <Stack bgcolor={'grey.main'} p='.2rem' margin={'auto'} width={'80%'} direction={'row'} justifyContent='space-between'>
                        <Box textAlign={'center'} flex={5}><Typography>Item</Typography></Box>
                        <Box textAlign={'center'} flex={2}></Box>
                        <Box textAlign={'center'} flex={2}><Typography>Owner</Typography></Box>
                        <Box textAlign={'center'} flex={4}><Typography>Status</Typography></Box>
                        <Box textAlign={'center'} flex={3}><Typography>Due</Typography></Box>
                        <Box textAlign={'center'} flex={3}><Typography>Linked To</Typography></Box>
                    </Stack>
                    <Stack paddingX='.2rem' paddingY='.1rem' margin={'auto'} width={'80%'} direction={'row'} justifyContent='space-between'>
                        <Box textAlign={'center'} alignSelf='center' flex={5}><Typography>Item Name</Typography></Box>
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
                            sx={{ width: '10rem' }}
                        >
                            <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'green.main' }} onClick={() => { setAnchorEl(null); }}></MenuItem>
                            <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'orange.main' }} onClick={() => { setAnchorEl(null); }}></MenuItem>
                            <MenuItem sx={{ width: '5rem', height: '2rem', backgroundColor: 'red.main' }} onClick={() => { setAnchorEl(null); }} ></MenuItem>
                        </Menu>
                        <Box textAlign={'center'} alignSelf='center' flex={3}><Typography>23-3-2023</Typography></Box>
                        <Box textAlign={'center'} alignSelf='center' flex={3}><Typography>Add login page to the site</Typography></Box>
                    </Stack>
                </Box>
                    ||
                <Box>
                </Box>
                    }
            </Box>
        )
    }
}

export default Group
