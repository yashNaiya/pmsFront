import { Box, Button, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Typography } from '@mui/material'
import { Add, More } from 'iconsax-react'
import React, { useState } from 'react'

const Sidebar = (props) => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const [anchorEl, setAnchorEl] = useState(null)
    const [anchorEl2, setAnchorEl2] = useState(null)
    const handleClose1 = () => {
        setAnchorEl(null);
    };
    const handleClose2 = () => {
        setAnchorEl2(null);
    };
    const handleClick1 = (event) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };
    const handleClick2 = (event) => {
        console.log(event.currentTarget)
        setAnchorEl2(event.currentTarget);
    };
    const Open = Boolean(anchorEl);
    const Open2 = Boolean(anchorEl2);

    return (
        <Box flex={1} minHeight={'100vh'} bgcolor={'grey.main'}>
            <Box minHeight={'25%'} borderBottom={'1px solid black'} justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'} paddingBottom={'1rem'} paddingTop={'4rem'}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>workspace</Typography>
                    <IconButton 
                    sx={{ color: 'black' }}
                    onClick={handleClick1}
                    textAlign={'center'} bgcolor='green.main' flex={4}
                    aria-controls={Open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={Open ? 'true' : undefined}>
                        <More />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={Open}
                        onClose={handleClose1}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => { setAnchorEl(null); }}>Rename</MenuItem>
                        <MenuItem onClick={() => { setAnchorEl(null); }}>Manage</MenuItem>
                        <MenuItem onClick={() => { setAnchorEl(null); }}>Delete</MenuItem>
                    </Menu>
                </Box>
                <FormControl fullWidth size='small'>
                    <InputLabel id="demo-simple-select-label">Workspace</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem><Button onClick={()=>{}} sx={{textTransform:'none',justifyContent:'left',color:'#000'}}><Add/>Add</Button></MenuItem>
                    </Select>
                </FormControl>
                <Box>
                    <Button onClick={()=>{props.setadd(true)}} fullWidth sx={{ color: 'black', margin: 0, paddingX: 0,justifyContent:'left' }}>
                        <Add />
                        <Typography marginLeft={'1rem'}>Add</Typography>
                    </Button>
                </Box>
            </Box>
            <Box justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'} paddingBottom={'1rem'} paddingTop={'2rem'}>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Button fullWidth sx={{textTransform:'none', color: 'black', margin: 0, paddingX: 0, justifyContent:'left' }}>
                            <Typography>customer</Typography>
                        </Button>
                        <IconButton 
                        sx={{ color: 'black' }}
                        onClick={handleClick2}
                        textAlign={'center'} bgcolor='green.main' flex={4}
                        aria-controls={Open2 ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={Open2 ? 'true' : undefined}>
                            <More />
                        </IconButton>
                        <Menu
                        id="basic-menu"
                        anchorEl={anchorEl2}
                        open={Open2}
                        onClose={handleClose2}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => { setAnchorEl2(null); }}>Rename</MenuItem>
                        <MenuItem onClick={() => { setAnchorEl2(null); }}>Manage</MenuItem>
                        <MenuItem onClick={() => { setAnchorEl2(null); }}>Delete</MenuItem>
                    </Menu>
                    </Box>
                    <Box>
                        <Button fullWidth sx={{textTransform:'none',color: 'grey.dark',justifyContent:'left' }}>Project</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebar
