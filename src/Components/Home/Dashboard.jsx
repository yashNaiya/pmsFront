import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useCountdown } from '../countdown'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Battery from './Battery';
import { Barchart } from './Barchart';
import { Piechart } from './Piechart';
import { Linechart } from './Linechart';

const Dashboard = (props) => {
    const [percentage, setpercentage] = useState()
    const [tasks, settasks] = useState([])
    const [total, settotal] = useState(0)
    const [completed, setcompleted] = useState(0)
    // console.log(days)
    useEffect(() => {
        let tasksTemp = []
        if (props.project.groups) {
            // console.log(props.groups)
            props.project.groups.forEach(group => {
                if (group.tasks.length !== 0) {
                    group.tasks.forEach(task => {
                        // settasks([...tasks, task]);
                        tasksTemp.push(task)
                        // console.log(task)
                        if (task.status === 'complete') {
                            setcompleted(completed + 1)
                        }
                    });

                }
            });
            // console.log(tasksTemp)
            settasks(tasksTemp)
            settotal(tasksTemp.length)

        }
    }, [props])
    useEffect(() => {
        setpercentage(getcompletionpercentage(total, completed))
    }, [total])

    const getcompletionpercentage = (total, completed) => {
        const percentage = ((100 * completed) / total).toFixed(2)
        // console.log(percentage)

        return percentage
    }
    const [days] = useCountdown(props.project.due);

    // console.log(percentage)
    // console.log(completed)

    return (
        <Box flex={9} p={'1rem'} bgcolor={"#e3e3e3"}>
            <Box display={'flex'} flexDirection='column'>
                <Box paddingX={'3rem'} paddingY='1rem' display={'flex'} justifyContent='space-between' flexDirection='row'>
                    <Typography color={'primary.main'} fontSize={'60px'} sx={{ fontFamily: 'Alkatra' }}>{days} Days Left</Typography>

                    <Box sx={{ width: 180, height: 180 }}>
                        <CircularProgressbar
                            styles={buildStyles({
                                // Rotation of path and trail, in number of turns (0-1)
                                rotation: 0.25,

                                // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                strokeLinecap: 'butt',

                                // Text size
                                textSize: '16px',

                                // How long animation takes to go from one percentage to another, in seconds
                                pathTransitionDuration: 0.5,

                                // Can specify path transition in more detail, or remove it entirely
                                // pathTransition: 'none',

                                // Colors
                                pathColor: `rgba(34, 53, 84)`,
                                textColor: `rgba(34, 53, 84,1)`,
                                trailColor: '#58739c',
                                backgroundColor: '#3e98c7',
                            })}
                            value={percentage} text={`${percentage}%`} />
                    </Box>
                </Box>
                <Box paddingY={'2rem'} display={'flex'} justifyContent='space-between' flexDirection='row'>
                    <Box bgcolor={'#fff'} width='30rem' sx={{ boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 6px , rgba(0, 0, 0, 0.3) 0px 3px 3px" }} padding='3rem' display={'flex'} flexDirection='column'>
                        {props.project.groups.map(group =>
                            <Battery group={group} />
                        )}
                    </Box>
                    <Box width='50%' alignItems={'center'} display='flex' flexDirection={'column'}>
                        <Box>
                            <Box m='1rem' p='1rem' color={'#fff'} width='20rem' height={'8rem'} sx={{ boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 12px , rgba(0, 0, 0, 0.3) 0px 3px 12px" ,background: "linear-gradient(to right, #283048, #859398)"}}>
                                <Typography fontSize={'36px'}>Groups : {props.project.groups.length}</Typography>
                            </Box>
                            <Box m='1rem' p='1rem' sx={{ boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 6px , rgba(0, 0, 0, 0.3) 0px 3px 3px" ,background:"linear-gradient(to right, #24c6dc, #514a9d)"}} color={'#fff'} width='20rem' height={'8rem'} >
                                <Typography fontSize={'36px'}>Tasks : {total}</Typography>
                            </Box>

                        </Box>
                        <Box p='1rem' bgcolor={'#fff'} marginRight={'2rem'} sx={{boxShadow:" rgba(50, 50, 93, 0.25) 0px 6px 6px , rgba(0, 0, 0, 0.3) 0px 3px 3px"}} marginTop={'2rem'} width={'100%'}>
                            <Barchart />
                        </Box>
                        <Box p='1rem' bgcolor={'#fff'} marginRight={'2rem'} sx={{boxShadow:" rgba(50, 50, 93, 0.25) 0px 6px 6px , rgba(0, 0, 0, 0.3) 0px 3px 3px"}} marginTop={'2rem'} width={'100%'}>
                            <Linechart/>
                        </Box>
                    </Box>
                </Box>
                <Box m='auto' sx={{ boxShadow: " rgba(50, 50, 93, 0.25) 0px 6px 6px , rgba(0, 0, 0, 0.3) 0px 3px 3px" }}>
                    <Piechart project={props.project} />
                </Box>
                
            </Box>
        </Box>
    )
}

export default Dashboard
