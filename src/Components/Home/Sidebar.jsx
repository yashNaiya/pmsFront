import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Add, More } from 'iconsax-react'
import React from 'react'

const Sidebar = () => {
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };
    return (
        <Box flex={1} minHeight={'100vh'} bgcolor={'grey.main'}>
            <Box minHeight={'25%'} borderBottom={'1px solid black'} justifyContent={'space-between'} display={'flex'} flexDirection={'column'} marginX={'1rem'} paddingBottom={'1rem'} paddingTop={'4rem'}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography>workspace</Typography>
                    <Button sx={{ color: 'black' }}>
                        <More />
                    </Button>
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
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <Box>
                    <Button fullWidth sx={{ color: 'black', margin: 0, paddingX: 0,justifyContent:'left' }}>
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
                        <Button sx={{ margin: 0, paddingX: 0, color: 'black' }}>
                            <More />
                        </Button>
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
