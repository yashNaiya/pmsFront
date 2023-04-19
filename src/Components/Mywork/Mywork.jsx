import { Box, Button, Checkbox, IconButton, Stack, Typography } from '@mui/material'
import { ArrowDown2, ArrowRight2, Message, Stop } from 'iconsax-react'
import Localimage from '../../Assets/man.png'
import React, { useEffect, useState } from 'react'
import Navigate from '../Navigate'
import api from '../../Api'
import Task from '../Home/Task'
import AppContext from './../AppContext'
import { useContext } from 'react'
const Mywork = () => {
    const myContext = useContext(AppContext)
    const [rootUser, setrootUser] = useState()
    const [completed, setcompleted] = useState([])
    const [today, settoday] = useState([])
    const [tasks, settasks] = useState([])
    const [thisweek, setthisweek] = useState([])
    const [later, setlater] = useState([])
    const [pastdue, setpastdue] = useState([])
    const [showWeek, setshowWeek] = useState(true)
    const [showToday, setshowToday] = useState(true)
    const [showPD, setshowPD] = useState(true)
    const [showlater, setshowlater] = useState(true)
    
    useEffect(() => {
        api.get("/profile", { withCredentials: true })
            .then(res => {
                setrootUser(res.data.rootUser)
                console.log("hii")
                console.log(res.data.rootUser)
               
                    api.post('/gettasksforworkspace',{workspaceId:localStorage.getItem('ws') ,work:res.data.rootUser.work})
                    .then(res=>settasks(res.data))
                
            })
    }, [])

    useEffect(() => {
        // console.log(myContext.workspace)
        if (rootUser && myContext.workspace) {
            console.log(rootUser)
            gettasks()
        }
    }, [rootUser])
    
    useEffect(() => {
      if(tasks.length!==0){
        fillarrays()
      }
    }, [tasks])
    
    const gettasks = () =>{
        let tasksTemp = []
        
        // api.post('/gettasksforworkspace',{workspaceId:myContext.workspace._id,work:rootUser.work})
        // .then(res=>settasks(res.data))
    }
    const fillarrays = () => {
            let todayArray = []
            let laterArray = []
            let weekArray = []
            let completedArray = []
            let pastdueArray = []
            var weekDate = new Date();
            weekDate.setDate(weekDate.getDate() + 7);
            var todayDate = new Date()

           tasks.forEach(task => {

                if (new Date(task.due) > todayDate) {
                    if (new Date(task.due) > weekDate) {
                        console.log("Later!!")
                        laterArray.push(task)
                    } else {
                        console.log("This Week!!")
                        weekArray.push(task)
                    }
                } else if (new Date(task.due) < todayDate) {
                    if (task.status === 'complete') {
                        completedArray.push(task)
                    } else {
                        console.log("Past Due!!")
                        pastdueArray.push(task)
                    }
                }
                else {
                    console.log("today!!")
                    todayArray.push(task)
                }
            });
            settoday(todayArray)
            setthisweek(weekArray)
            setlater(laterArray)
            setcompleted(completedArray)
            setpastdue(pastdueArray)
        

    }

    if (rootUser) {
        console.log(myContext.project)
        return (
            <Box>
                <Stack direction={'row'} justifyContent='space-between'>
                    <Navigate />
                    <Box flex={16}>
                        <Box paddingY='2rem'>
                            <Box paddingY={'2rem'}>
                                <Box onClick={() => { setshowPD(!showPD) }} sx={{ color: 'black', marginBottom: '1rem', ":hover": { cursor: 'pointer' } }} display={'flex'} borderRadius='.5rem' flexDirection={'row'} paddingX={'1rem'} paddingY='.5rem' width={'100%'} bgcolor='grey.main'>
                                    {showPD ? <ArrowDown2 /> : <ArrowRight2 />}
                                    <Typography>Past Dates</Typography>
                                </Box>
                                <Box display='flex' flexDirection={'row'} width='100%' flexWrap={'wrap'}>
                                    {showPD && pastdue.map((task, index) => (
                                        <Task project={myContext.project} Mywork={true} rootUser={rootUser} key={index} task={task} />
                                    ))}
                                </Box>
                            </Box>
                            <Box paddingY={'2rem'}>
                                <Box onClick={() => { setshowToday(!showToday) }} sx={{ color: 'black', marginBottom: '1rem', ":hover": { cursor: 'pointer' } }} display={'flex'} borderRadius='.5rem' flexDirection={'row'} paddingX={'1rem'} paddingY='.5rem' width={'100%'} bgcolor='grey.main'>
                                    {showToday ? <ArrowDown2 /> : <ArrowRight2 />}
                                    <Typography>Today</Typography>
                                </Box>
                                <Box display='flex' flexDirection={'row'} width='100%' flexWrap={'wrap'}>
                                    {showToday && today.map((task, index) => (
                                        <Task project={myContext.project} Mywork={true} rootUser={rootUser} key={index} task={task} />
                                    ))}
                                </Box>
                            </Box>
                            <Box paddingY={'2rem'}>
                                <Box onClick={() => { setshowWeek(!showWeek) }} sx={{ color: 'black', marginBottom: '1rem', ":hover": { cursor: 'pointer' } }} width='100%' display={'flex'} borderRadius='.5rem' flexDirection={'row'} paddingX={'1rem'} paddingY='.5rem' bgcolor='grey.main'>
                                    {showWeek ? <ArrowDown2 /> : <ArrowRight2 />}
                                    <Typography>This Week</Typography>
                                </Box>
                                <Box display='flex' flexDirection={'row'} width='100%' flexWrap={'wrap'}>
                                    {showWeek && thisweek.map((task, index) => (
                                        <Task project={myContext.project} Mywork={true} rootUser={rootUser} key={index} task={task} />
                                    ))}
                                </Box>
                            </Box>
                            <Box paddingY={'2rem'}>
                                <Box onClick={() => { setshowlater(!showlater) }} sx={{ color: 'black', marginBottom: '1rem', ":hover": { cursor: 'pointer' } }} display={'flex'} borderRadius='.5rem' flexDirection={'row'} paddingX={'1rem'} paddingY='.5rem' width={'100%'} bgcolor='grey.main'>

                                    {showlater ? <ArrowDown2 /> : <ArrowRight2 />}
                                    <Typography>Later</Typography>
                                </Box>
                                <Box display='flex' flexDirection={'row'} width='100%' flexWrap={'wrap'}>
                                    {showlater && later.map((task, index) => (
                                        <Task project={myContext.project} Mywork={true} rootUser={rootUser} key={index} task={task} />
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Stack >
            </Box >
        )
    }
}

export default Mywork
