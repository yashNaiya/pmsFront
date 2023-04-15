import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const Battery = (props) => {
    const [total, settotal] = useState()
    const [completed, setcompleted] = useState(0)
    const [error, seterror] = useState(0)
    const [onHold, setonHold] = useState(0)
    const [working, setworking] = useState(0)
    useEffect(() => {
        if (props.group) {
            // console.log(task.status)
            let completedArray = 0
            let errorArray = 0
            let workingArray = 0
            let onHoldArray = 0
            props.group.tasks.forEach(task => {
                if (task.status === 'complete') {
                    // setcompleted(completed + 1)
                    completedArray = completedArray + 1
                } else if (task.status === 'on hold') {
                    // setonHold(onHold + 1)
                    onHoldArray = onHoldArray + 1
                } else if (task.status === 'working') {
                    // setworking(working + 1)
                    workingArray = workingArray + 1
                } else if (task.status === 'error') {
                    // seterror(error + 1)
                    errorArray = errorArray + 1
                }
            });
            setcompleted(completedArray)
            seterror(errorArray)
            setworking(workingArray)
            setonHold(onHoldArray)
            settotal(props.group.tasks.length)

        }
    }, [props])

    return (
        <Box marginY={'1rem'} display={'flex'} justifyContent='space-between' flexDirection='column' alignItems={'center'}>
            <Box width='20rem' height={'8rem'} display={'flex'} flexDirection='row'>
                <Box height={'8rem'} width={`${(100 * completed / total)}%`} bgcolor='green.main'>
                </Box>
                <Box height={'8rem'} width={`${(100 * working / total)}%`} bgcolor='orange.main'>
                </Box>
                <Box height={'8rem'} width={`${(100 * onHold / total)}%`} bgcolor='grey.main'>
                </Box>
                <Box height={'8rem'} width={`${(100 * error / total)}%`} bgcolor='red.main'>
                </Box>
            </Box>
            <Typography>{props.group.name}</Typography>
        </Box>
    )
}

export default Battery
