import { Box, Button, IconButton, Typography } from '@mui/material'
import { CloseCircle } from 'iconsax-react'
import React from 'react'

const Message = (props) => {
    return (
        <Box width='25rem' paddingY='1rem'>
            <Box display={'flex'} flexDirection='row' justifyContent={'flex-end'}>
                <IconButton sx={{color:'black', justifyContent:'right'}}>
                    <CloseCircle />
                </IconButton>
            </Box>
            <Box color={props.color} minHeight={'3rem'} paddingX={'2rem'} paddingY='1rem' borderRadius={'.5rem'} display={'flex'} bgcolor={props.bg}>
                <Typography >{props.message.message}</Typography>
            </Box>
        </Box>
    )
}

export default Message
