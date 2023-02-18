import { Box, Button, FormControl, Input, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Add, ArrowDown, ArrowDown2, DirectDown, More, SearchNormal, TickCircle } from 'iconsax-react'
import React from 'react'

const Sidebarteams = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Box flex={1} minHeight={'100vh'} bgcolor={'grey.main'}>
            <Box minHeight={'22%'} borderBottom={'1px solid black'} justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'} paddingBottom={'1rem'} paddingTop={'4rem'}>
                <TextField
                    variant='standard'
                    size='small'
                    placeholder='search'
                    sx={{ backgroundColor: '#fff',paddingX:'.5rem',paddingY:'.2rem',borderRadius:'.5rem'  }}
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: <InputAdornment position="start"><SearchNormal /></InputAdornment>,
                    }}
                />
                <Box>
                    <Button fullWidth sx={{ color: 'black', margin: 0, paddingX: 0, justifyContent: 'left' }}>
                        <Add />
                        <Typography marginLeft={'1rem'}>Add</Typography>
                    </Button>
                </Box>
                <Box>
                    <Button fullWidth sx={{ color: 'black', margin: 0, paddingX: 0, justifyContent: 'left' }}>
                        <TickCircle />
                        <Typography marginLeft={'1rem'}>Approve</Typography>
                    </Button>
                </Box>
            </Box>
            <Box justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'}>
                <Box borderBottom={'1px solid black'} paddingY="1rem" display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>All Teams</Typography>
                        <Button sx={{ textTransform: 'none', color: 'black', margin: 0, paddingX: 0 }}>
                            <ArrowDown2 />
                        </Button>
                    </Box>
                    <Box >
                        <Button fullWidth sx={{ textTransform: 'none', color: 'grey.dark', justifyContent: 'left' }}>Development Team</Button>
                    </Box>
                    <Box>
                        <Button fullWidth sx={{ textTransform: 'none', color: 'grey.dark', justifyContent: 'left' }}>Test Team</Button>
                    </Box>
                </Box>
                <Box borderBottom={'1px solid black'} paddingY="1rem" display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                    <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                        <Typography>My Teams</Typography>
                        <Button sx={{ textTransform: 'none', color: 'black', margin: 0, paddingX: 0 }}>
                            <ArrowDown2 />
                        </Button>
                    </Box>
                    <Box >
                        <Button fullWidth sx={{ textTransform: 'none', color: 'grey.dark', justifyContent: 'left' }}>Development Team</Button>
                    </Box>
                    <Box>
                        <Button fullWidth sx={{ textTransform: 'none', color: 'grey.dark', justifyContent: 'left' }}>Test Team</Button>
                    </Box>
                </Box>
                <Box paddingY="1rem" >
                    <Button variant='contained' fullWidth sx={{ textTransform: 'none', justifyContent: 'left', borderRadius: '1rem' }}>All Users</Button>
                </Box>
            </Box>
        </Box>
    )
}

export default Sidebarteams
