import { Box, Button, Typography } from '@mui/material'
import { CloseCircle } from 'iconsax-react'
import React from 'react'

const Message = () => {
    return (
        <Box width='25rem' paddingY='1rem'>
            <Box display={'flex'} flexDirection='row' justifyContent={'flex-end'}>
                <Button sx={{color:'black', justifyContent:'right'}}>
                    <CloseCircle />
                </Button>
            </Box>
            <Box minHeight={'3rem'} paddingX={'2rem'} paddingY='1rem' borderRadius={'.5rem'} display={'flex'} bgcolor={'grey.main'}>
                <Typography >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati cupiditate nam libero deserunt dolorem aut perferendis, iste repudiandae nemo saepe cum. Necessitatibus nostrum eos itaque!</Typography>
            </Box>
        </Box>
    )
}

export default Message
