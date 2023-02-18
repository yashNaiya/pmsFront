import { Box, Button, Stack, Typography } from '@mui/material'
import { Add, More, ProfileAdd } from 'iconsax-react'
import React from 'react'

const Homemain = () => {
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
            <Box flex={9}>
                
            </Box>
        </Stack>
    </Box>
  )
}

export default Homemain
