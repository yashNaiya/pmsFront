import { Stack } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Navigate from '../Navigate'
import Sidebarteams from './Sidebarteams'
import Teamsmain from './Teamsmain'

const Teams = () => {
  return (
    <Box>
        <Stack direction={'row'} justifyContent='space-between'>
          <Navigate />
          <Box flex={16}>
          <Stack direction={'row'} justifyContent='space-between'>
            <Sidebarteams/>
            <Teamsmain/>
          </Stack>
          </Box>
        </Stack>
      </Box>
  )
}

export default Teams
