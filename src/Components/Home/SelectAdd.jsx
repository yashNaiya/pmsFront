import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { Add, CloseCircle, Folder } from 'iconsax-react'
import React, { useState } from 'react'

const SelectAdd = (props) => {
    const [value, setValue] = useState('customer');
    const [add, setadd] = useState(false)
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    if (add && value === 'customer') {
        return (
            <Box>
                <Box textAlign={'right'}>
                    <IconButton onClick={() => {
                        setadd(false)
                    }}>
                        <CloseCircle />
                    </IconButton>
                </Box>
                <Typography marginLeft={'3rem'} fontWeight='bold' variant='h4' color={'primary.main'}>Add New Customer</Typography>
                <Box display='flex' marginTop={'1rem'} flexDirection='column' width='30%' marginLeft={'3rem'}>
                    <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='name'></TextField>
                    <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='location'></TextField>
                    <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='email'></TextField>
                    <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='number'></TextField>
                    <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='website'></TextField>
                </Box>
                <Box marginLeft={'3rem'}>
                    < Typography > Contacts</Typography >
                    <Box display='flex' flexDirection={'row'}>
                        <Box marginRight={'1rem'} paddingBottom={'1rem'} display='flex' marginTop={'1rem'} bgcolor={'grey.main'} paddingX='1rem' borderRadius={'.5rem'} flexDirection='column'>
                            <Box textAlign={'right'}><IconButton><CloseCircle /></IconButton></Box>
                            <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='name'></TextField>
                            <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='email'></TextField>
                            <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='number'></TextField>
                            <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='designation'></TextField>
                        </Box>
                        <Box marginRight={'1rem'} display='flex' marginTop={'1rem'} bgcolor={'grey.main'} paddingX='1rem' borderRadius={'.5rem'} flexDirection='column'>
                            <Box textAlign={'right'}><IconButton><CloseCircle /></IconButton></Box>
                            <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='name'></TextField>
                            <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='email'></TextField>
                            <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='number'></TextField>
                            <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='designation'></TextField>
                        </Box>


                    </Box>
                    <Button sx={{ textTransform: 'none', justifyContent: 'left' }}><Add />Add</Button>

                    <Box marginY={'3rem'} display='flex' flexDirection={'row'} width='30%' justifyContent={'space-between'}>
                        <Button sx={{ textTransform: 'none' }} onClick={() => { }} variant='contained'>Add</Button>
                        <Button sx={{ textTransform: 'none' }} variant='outlined'
                            onClick={() => {
                                setadd(false)
                            }}>Cancel</Button>
                    </Box>
                </Box>

            </Box>
        )


    } else if (add && value === 'project') {
        return (
            <Box>
                <Box textAlign={'right'}>
                    <IconButton onClick={() => {
                        setadd(false)
                    }}>
                        <CloseCircle />
                    </IconButton>
                </Box>
                <Box marginLeft={'3rem'}>
                    <Typography fontWeight='bold' variant='h4' color={'primary.main'}>Add New Project</Typography>
                    <Box display='flex' flexDirection='column' width='30%' marginTop={'1rem'}>
                        <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='name'></TextField>
                        <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='due date'></TextField>
                        <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='compeny person'></TextField>
                        <TextField variant='standard' sx={{ marginBottom: '1rem' }} label='project manager'></TextField>
                        <Typography sx={{ marginBottom: '1rem' }}>Requiremnets</Typography>
                        <Box marginBottom={'1rem'} display='flex' bgcolor={'grey.main'} paddingX='1rem' paddingBottom={'1rem'} borderRadius={'.5rem'} flexDirection='column'>
                            <Box textAlign={'right'}><IconButton><CloseCircle /></IconButton></Box>
                            <TextField variant='standard' label='name'></TextField>
                            <TextField variant='standard' label='desc'></TextField>
                        </Box>
                        <Box marginBottom={'1rem'} display='flex' bgcolor={'grey.main'} paddingX='1rem' paddingBottom={'1rem'} borderRadius={'.5rem'} flexDirection='column'>
                            <Box textAlign={'right'}><IconButton><CloseCircle /></IconButton></Box>
                            <TextField variant='standard' label='name'></TextField>
                            <TextField variant='standard' label='desc'></TextField>
                        </Box>
                        <Button sx={{ justifyContent: 'left', marginBottom: '1rem' }}><Add />Add</Button>
                        <Button component="label" sx={{ justifyContent: 'left', marginBottom: '1rem' }}>
                            <Folder />
                            Additional Documnet
                            <input hidden type='file' name='document' accept='.doc, .docx,.ppt, .pptx,.txt,.pdf' />
                        </Button>
                    </Box>
                    <Box marginY={'3rem'} display='flex' flexDirection={'row'} width='30%' justifyContent={'space-between'}>
                        <Button sx={{ textTransform: 'none' }} onClick={() => { }} variant='contained'>Add</Button>
                        <Button sx={{ textTransform: 'none' }} variant='outlined'
                            onClick={() => {
                                setadd(false)
                            }}>Cancel</Button>
                    </Box>
                </Box>
            </Box>
        )
    } else {

        return (
            <Box>
                <Box textAlign={'right'}>
                    <IconButton onClick={() => {
                        props.setadd(false)
                    }}>
                        <CloseCircle />
                    </IconButton>
                </Box>
                <Box margin={'4rem'}>
                    <Box display='flex' flexDirection={'column'} height='30vh' justifyContent={'space-between'}>
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                value={value}
                                onChange={handleChange}
                                name="radio-buttons-group"
                            >
                                <FormControlLabel value="customer" control={<Radio />} label="Customer" />
                                <FormControlLabel value="project" control={<Radio />} label="Project" />
                            </RadioGroup>
                        </FormControl>
                        <Box display='flex' flexDirection={'row'} width='20%' justifyContent={'space-between'}>
                            <Button sx={{ textTransform: 'none' }} onClick={() => { console.log(value); setadd(true) }} variant='contained'>Add</Button>
                            <Button sx={{ textTransform: 'none' }} variant='outlined'
                                onClick={() => {
                                    props.setadd(false)
                                }}>Cancel</Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        )
    }
}

export default SelectAdd
