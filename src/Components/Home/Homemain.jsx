import { Box, Button, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import { Add, More, ProfileAdd, SearchNormal } from 'iconsax-react'
import React, { useState } from 'react'
import Group from './Group'
import SelectAdd from './SelectAdd'

const Homemain = (props) => {
    const [search, setsearch] = useState()
    const handleChange = (e)=>{
        setsearch(e.target.value)
    }
   
    if(props.add){
        return(
            <Box flex={5}>
                <SelectAdd setaddcustomer={props.setaddcustomer} setaddproject={props.setaddproject}  setadd={props.setadd}/>
            </Box>
        )
    }
  
    else{
        return (
          <Box flex={5}>
              <Stack minHeight={'100vh'} direction={'column'} justifyContent='space-between'>
                  <Box display={'flex'} justifyContent={'space-between'} flexDirection={'column'} flex={.5} paddingX={'1rem'} borderBottom={'1px solid black'}>
                      <Box marginTop={'4rem'} display={'flex'} justifyContent={'space-between'} flexDirection={'row'}>
                          <Typography variant='h5'>Main Table</Typography>
                          <Box>
                              <Button variant='outlined' sx={{color:'black'}}><ProfileAdd/>invite</Button>
                              <Button sx={{color:'black'}}><More/></Button>
                          </Box>
                      </Box>
                      <Box>
                         <Button sx={{color:'black'}}>Main Table</Button>
                         <Button sx={{color:'black'}}>Timeline</Button>
                         <Button sx={{color:'black'}}><Add/></Button>
                      </Box>
                  </Box>
                  <Box flex={9} margin={'1rem'}>
                      <Box display='flex' width='40%' justifyContent={'space-between'}>
                          <Button variant='contained'>add group</Button>
                          <TextField
                              value={search}
                              onChange={handleChange}
                              variant='standard'
                              size='small'
                              placeholder='search'
                              sx={{ marginBottom: '5px', backgroundColor: 'grey.main', paddingX: '.5rem', paddingY: '.2rem', borderRadius: '.5rem' }}
                              InputProps={{
                                  disableUnderline: true,
                                  startAdornment: <InputAdornment position="start"><SearchNormal /></InputAdornment>,
                              }}
                          />
                      </Box>
                      <Box>
                          <Group/>
                          <Group/>
                      </Box>
                  </Box>
              </Stack>
          </Box>
        )
    }
}

export default Homemain
