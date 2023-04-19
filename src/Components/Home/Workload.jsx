import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from '@mui/material'
import { ArrowDown2, ArrowRight2, Profile } from 'iconsax-react'
import React, { useContext, useEffect, useState } from 'react'
import api from '../../Api'
import AppContext from '../AppContext'
import Task from './Task'

const Workload = (props) => {
  const myContext = useContext(AppContext)
  const [show, setshow] = useState(false)
  const [users, setusers] = useState([])
  const [teams, setteams] = useState([])
  const [member, setmember] = useState()
  const [isteam, setisteam] = useState(false)
  const [completed, setcompleted] = useState(0)
  const [error, seterror] = useState(0)
  const [onHold, setonHold] = useState(0)
  const [working, setworking] = useState(0)
  const [group, setgroup] = useState(0)
  const [thisweek, setthisweek] = useState([])
  const [later, setlater] = useState([])
  const [pastdue, setpastdue] = useState([])
  const [showToday, setshowToday] = useState(true)
  const [showWeek, setshowWeek] = useState(true)
  const [today, settoday] = useState([])
  const [livetasks, setlivetasks] = useState([])
  const [completedLive, setcompletedLive] = useState(0)
  const [errorLive, seterrorLive] = useState(0)
  const [workingLive, setworkingLive] = useState(0)
  const [onHoldLive, setonHoldLive] = useState(0)
  const [groupLive, setgroupLive] = useState(0)


  const [teamAllTasks, setteamAllTasks] = useState([])
  const [teamLiveTasks, setteamLiveTasks] = useState([])
  const [teamThisWeek, setteamThisWeek] = useState([])
  const [teamToday, setteamToday] = useState([])
  const [teamCompletedTotal, setteamCompletedTotal] = useState(0)
  const [teamErrorTotal, setteamErrorTotal] = useState(0)
  const [teamWrokingTotal, setteamWrokingTotal] = useState(0)
  const [teamonHoldTotal, setteamonHoldTotal] = useState(0)
  const [teamCompletedLive, setteamCompletedLive] = useState(0)
  const [teamErrorLive, setteamErrorLive] = useState(0)
  const [teamWorkingLive, setteamWorkingLive] = useState(0)
  const [teamonHoldLive, setteamonHoldLive] = useState(0)

  useEffect(() => {
    api.post('/getmembers', props.project.members)
      .then(res => {
        setteams(res.data.teams)
        setusers(res.data.users)
      })
  }, [])
  useEffect(() => {
    if (member) {
      if (isteam) {
        handleTeamInfo(member)
      } else {
        handleUserInfo(member)

      }
    }
  }, [member])

  const handleTeamInfo = (team) => {
    let teamtasks = []
    let teamThisWeekArray = []
    let teamTodayArray = []
    let teamlivetasks = []
    var todayDate = new Date()
    var weekDate = new Date();
    let teamcompleted = []
    let teamonHold = []
    let teamworking = []
    let teamerror = []
    let teamcompletedLive = []
    let teamonholdLive = []
    let teamworkingLive = []
    let teamerrorLive = []
    weekDate.setDate(weekDate.getDate() + 7);
    props.project.groups.forEach(group => {
      group.tasks.forEach(task => {
        if (task.owner._id.toString() === team._id.toString()) {
          teamtasks.push(task)
          if (task.status === 'complete') {
            // setcompleted(completed + 1)
            teamcompleted = teamcompleted + 1
          } else if (task.status === 'on hold') {
            // setonHold(onHold + 1)
            teamonHold = teamonHold + 1
          } else if (task.status === 'working') {
            // setworking(working + 1)
            teamworking = teamworking + 1
          } else if (task.status === 'error') {
            // seterror(error + 1)
            teamerror = teamerror + 1
          }
          if (new Date(task.due) > todayDate) {
            teamlivetasks.push(task)
            if (task.status === 'complete') {
              // setcompleted(completed + 1)
              teamcompletedLive = teamcompletedLive + 1
            } else if (task.status === 'on hold') {
              // setonHold(onHold + 1)
              teamonHoldLive = teamonHoldLive + 1
            } else if (task.status === 'working') {
              // setworking(working + 1)
              teamworkingLive = teamworkingLive + 1
            } else if (task.status === 'error') {
              // seterror(error + 1)
              teamerrorLive = teamerrorLive + 1
            }
            if (new Date(task.due) > weekDate) {
              console.log("Later!!")

            } else {
              console.log("This Week!!")
              teamThisWeekArray.push(task)

            }
          } else if (new Date(task.due) < todayDate) {
            if (task.status === 'complete') {

            } else {
              console.log("Past Due!!")

            }
          }
          else {
            if (task.status === 'complete') {
              // setcompleted(completed + 1)
              teamcompletedLive = teamcompletedLive + 1
            } else if (task.status === 'on hold') {
              // setonHold(onHold + 1)
              teamonholdLive = teamonholdLive + 1
            } else if (task.status === 'working') {
              // setworking(working + 1)
              teamworkingLive = teamworkingLive + 1
            } else if (task.status === 'error') {
              // seterror(error + 1)
              teamerrorLive = teamerrorLive + 1
            }
            console.log("today!!")
            teamlivetasks.push(task)
            teamTodayArray.push(task)
          }

        }
      });
    });
    console.log(teamtasks)
    setteamAllTasks(teamtasks)
    setteamLiveTasks(teamlivetasks)
    setteamThisWeek(teamThisWeekArray)
    setteamToday(teamTodayArray)
    setteamCompletedTotal(teamcompleted)
    setteamErrorTotal(teamerror)
    setteamWrokingTotal(teamworking)
    setteamonHoldTotal(teamonHold)
    setteamCompletedLive(teamcompletedLive)
    setteamErrorLive(teamerrorLive)
    setteamWorkingLive(teamworkingLive)
    setteamonHoldLive(teamonholdLive)
  }

  const handleUserInfo = (user) => {
    let completed = 0
    let error = 0
    let working = 0
    let onHold = 0
    let group = 0
    let livetasks = []
    let todayArray = []
    let laterArray = []
    let weekArray = []
    let completedArray = []
    let pastdueArray = []
    var weekDate = new Date();
    weekDate.setDate(weekDate.getDate() + 7);
    var todayDate = new Date()
    user.work.forEach(task => {
      // console.log(task.status)
      if (new Date(task.due) > todayDate) {
        if (new Date(task.due) > weekDate) {
          console.log("Later!!")
          laterArray.push(task)
        } else {
          console.log("This Week!!")
          weekArray.push(task)
          livetasks.push(task)
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
        livetasks.push(task)
      }
      if (task.ownerType === 'team') {
        group = group + 1
      }

      if (task.status === 'complete') {
        // setcompleted(completed + 1)
        completed = completed + 1
      } else if (task.status === 'on hold') {
        // setonHold(onHold + 1)
        onHold = onHold + 1
      } else if (task.status === 'working') {
        // setworking(working + 1)
        working = working + 1
      } else if (task.status === 'error') {
        // seterror(error + 1)
        error = error + 1

      }
    });
    setcompleted(completed)
    seterror(error)
    setworking(working)
    setgroup(group)
    setonHold(onHold)
    settoday(todayArray)
    setthisweek(weekArray)
    setlater(laterArray)
    setpastdue(pastdueArray)
    setlivetasks(livetasks)
  }
  useEffect(() => {
    let completed = 0
    let error = 0
    let working = 0
    let onHold = 0
    let group = 0
    if (livetasks) {
      livetasks.forEach(task => {
        if (task.ownerType === 'team') {
          group = group + 1
        }
        if (task.status === 'complete') {
          // setcompleted(completed + 1)
          completed = completed + 1
        } else if (task.status === 'on hold') {
          // setonHold(onHold + 1)
          onHold = onHold + 1
        } else if (task.status === 'working') {
          // setworking(working + 1)
          working = working + 1
        } else if (task.status === 'error') {
          // seterror(error + 1)
          error = error + 1

        }
      });
      setcompletedLive(completed)
      seterrorLive(error)
      setworkingLive(working)
      setonHoldLive(onHold)
      setgroupLive(group)
    }
  }, [livetasks])


  useEffect(() => {
    api.post('/getmembers', props.project.members)
      .then(res => {
        setteams(res.data.teams)
        setusers(res.data.users)
      })
  }, [props.project])
  return (
    <Box flex={9} p={'1rem'}>
      <Box display='flex' justifyContent={'space-between'} flexDirection='row'>
        {member && <Box onClick={() => setshow(!show)} bgcolor='primary.main' paddingY='.8rem' paddingX={'1rem'} width={'20%'} color={'#fff'} sx={{ ":hover": { cursor: 'pointer' } }}>
          <Typography>{member.name}</Typography>
        </Box>
          ||
          <Box onClick={() => setshow(!show)} bgcolor='primary.main' paddingY='.8rem' paddingX={'1rem'} width={'20%'} color={'#fff'} sx={{ ":hover": { cursor: 'pointer' } }}>
            <Typography>Select Member</Typography>
          </Box>
        }
        {member && <Box>
          <Typography fontWeight={'bold'} fontSize={'24px'}>Efficiency :80% </Typography>
        </Box>}
      </Box>
      <Box>
        <Box
          sx={{
            boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 6px , rgba(0, 0, 0, 0.3) 0px 3px 3px",
            zIndex: '99',

            transition: "all .5s ease",
            // place it initially at -100%
            transform: show ? "translate(0)" : "translate(-108%)",
            opacity: show ? "1" : "0"
          }}
          maxHeight='70%'
          display='flex'
          flexDirection='column'
          overflow={'scroll'}
          bgcolor='#fff'
          minWidth={"18%"}
          position="absolute">
          <TextField size='small' sx={{ padding: '.5rem' }}>

          </TextField>
          <List>
            {users.map((user, index) => {
              return (
                <ListItem>
                  <ListItemButton onClick={() => { setmember(user); setshow(false); setisteam(false) }}>
                    <ListItemIcon>
                      <Profile variant='Bold' />
                    </ListItemIcon>
                    <ListItemText primary={user.name} />
                  </ListItemButton>
                </ListItem>
              )
            })}
            {teams.map((team, index) => {
              return (
                <ListItem>
                  <ListItemButton onClick={() => { setmember(team); setisteam(true); setshow(false) }}>
                    <ListItemIcon>
                      <Profile variant='Bold' />
                    </ListItemIcon>
                    <ListItemText primary={team.name} />
                  </ListItemButton>
                </ListItem>
              )
            })}
          </List>
        </Box>
        {member && (isteam === false) &&
          <Box>
            <Box color={'#fff'} paddingY='2rem' sx={{ background: "linear-gradient(to right, #232526, #414345)" }} marginY={'2rem'} width={'100%'} display='flex' justifyContent={'space-between'} paddingX='5rem' height='12rem'>
              <Box display='flex' justifyContent={'space-between'} flexDirection='column'>
                <Box display='flex' justifyContent={'space-between'} flexDirection='row'>
                  <Typography fontSize={'22px'}>Total Tasks :</Typography>
                  <Typography fontSize={'22px'}>{member.work.length}</Typography>
                </Box>
                <Box display='flex' justifyContent={'space-between'} flexDirection='row'>
                  <Typography fontSize={'22px'}>Solo Tasks :</Typography>
                  <Typography fontSize={'22px'}>{member.work.length - group}</Typography>
                </Box>
                <Box display='flex' justifyContent={'space-between'} flexDirection='row'>
                  <Typography fontSize={'22px'}>Group Tasks :</Typography>
                  <Typography fontSize={'22px'}>{group}</Typography>
                </Box>
              </Box>
              <Box display='flex' justifyContent={'space-between'} flexDirection='column'>
                <Box display='flex' justifyContent={'space-between'} flexDirection='row'>
                  <Typography fontSize={'22px'}>Live Tasks :</Typography>
                  <Typography fontSize={'22px'}>{livetasks.length}</Typography>
                </Box>
                <Box display='flex' justifyContent={'space-between'} flexDirection='row'>
                  <Typography fontSize={'22px'}>Solo Tasks :</Typography>
                  <Typography fontSize={'22px'}>{livetasks.length - groupLive}</Typography>
                </Box>
                <Box display='flex' justifyContent={'space-between'} flexDirection='row'>
                  <Typography fontSize={'22px'}>Group Tasks :</Typography>
                  <Typography fontSize={'22px'}>{groupLive}</Typography>
                </Box>
              </Box>
            </Box>
            <Box flexDirection={'column'} marginY={'2rem'} width={'100%'} display='flex' justifyContent={'space-evenly'} paddingX='5rem' height='10rem'>
              <Box><Typography>Total Tasks :</Typography></Box>
              <Box display='flex' flexDirection={'row'} justifyContent='space-evenly'>
                <Box >
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'green.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Completed : {completed}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'orange.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Working : {working}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'grey.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >On Hold : {onHold}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'red.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Error : {error}</Typography>
                  </Box>
                </Box>

              </Box>
            </Box>
            <Box flexDirection={'column'} marginY={'2rem'} width={'100%'} display='flex' justifyContent={'space-evenly'} paddingX='5rem' height='10rem'>
              <Box><Typography>Live Tasks :</Typography></Box>
              <Box display='flex' flexDirection={'row'} justifyContent='space-evenly'>
                <Box >
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'green.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Completed : {completedLive}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'orange.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Working : {workingLive}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'grey.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >On Hold : {onHoldLive}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'red.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Error : {errorLive}</Typography>
                  </Box>
                </Box>

              </Box>
            </Box>
            <Box paddingY={'2rem'}>
              <Box onClick={() => { setshowToday(!showToday) }} sx={{ color: 'black', marginBottom: '1rem', ":hover": { cursor: 'pointer' } }} display={'flex'} borderRadius='.5rem' flexDirection={'row'} paddingX={'1rem'} paddingY='.5rem' width={'100%'} bgcolor='grey.main'>
                {showToday ? <ArrowDown2 /> : <ArrowRight2 />}
                <Typography>Today</Typography>
              </Box>
              <Box display='flex' flexDirection={'row'} width='100%' flexWrap={'wrap'}>
                {showToday && today.map((task, index) => (
                  <Task project={myContext.project} Mywork={true} rootUser={props.rootUser} key={index} task={task} />
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
                  <Task project={myContext.project} Mywork={true} rootUser={props.rootUser} key={index} task={task} />
                ))}
              </Box>
            </Box>
          </Box>
          ||
          member && (isteam === true) &&
          <Box>
            <Box color={'#fff'} paddingY='2rem' sx={{ background: "linear-gradient(to right, #232526, #414345)" }} marginY={'2rem'} width={'100%'} display='flex' justifyContent={'space-between'} paddingX='5rem' height='8rem'>
              <Box display='flex' justifyContent={'space-between'} flexDirection='column'>
                <Box display='flex' justifyContent={'space-between'} flexDirection='row'>
                  <Typography fontSize={'22px'}>Total Tasks :</Typography>
                  <Typography fontSize={'22px'}>{teamAllTasks.length}</Typography>
                </Box> 
              </Box>
              <Box display='flex' justifyContent={'space-between'} flexDirection='column'>
                <Box display='flex' justifyContent={'space-between'} flexDirection='row'>
                  <Typography fontSize={'22px'}>Live Tasks :</Typography>
                  <Typography fontSize={'22px'}>{teamLiveTasks.length}</Typography>
                </Box>
              </Box>
            </Box>
            <Box flexDirection={'column'} marginY={'2rem'} width={'100%'} display='flex' justifyContent={'space-evenly'} paddingX='5rem' height='10rem'>
              <Box><Typography>Total Tasks :</Typography></Box>
              <Box display='flex' flexDirection={'row'} justifyContent='space-evenly'>
                <Box >
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'green.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Completed : {teamCompletedTotal}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'orange.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Working : {teamWrokingTotal}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'grey.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >On Hold : {teamonHoldTotal}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'red.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Error : {teamErrorTotal}</Typography>
                  </Box>
                </Box>

              </Box>
            </Box>
            <Box flexDirection={'column'} marginY={'2rem'} width={'100%'} display='flex' justifyContent={'space-evenly'} paddingX='5rem' height='10rem'>
              <Box><Typography>Live Tasks :</Typography></Box>
              <Box display='flex' flexDirection={'row'} justifyContent='space-evenly'>
                <Box >
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'green.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Completed : {teamCompletedLive}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'orange.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Working : {teamWorkingLive}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'grey.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >On Hold : {teamonHoldLive}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ ":hover": { cursor: 'pointer' } }}
                    display='flex' flexDirection={'row'}
                    justifyContent={'space-around'}
                  >
                    <Box bgcolor={'red.main'} marginX={'10px'} borderRadius={'50%'} height='18px' width='18px' ></Box>
                    <Typography m='auto' >Error : {teamErrorLive}</Typography>
                  </Box>
                </Box>

              </Box>
            </Box>
            <Box paddingY={'2rem'}>
              <Box onClick={() => { setshowToday(!showToday) }} sx={{ color: 'black', marginBottom: '1rem', ":hover": { cursor: 'pointer' } }} display={'flex'} borderRadius='.5rem' flexDirection={'row'} paddingX={'1rem'} paddingY='.5rem' width={'100%'} bgcolor='grey.main'>
                {showToday ? <ArrowDown2 /> : <ArrowRight2 />}
                <Typography>Today</Typography>
              </Box>
              <Box display='flex' flexDirection={'row'} width='100%' flexWrap={'wrap'}>
                {showToday && teamToday.map((task, index) => (
                  <Task project={myContext.project} Mywork={true} rootUser={props.rootUser} key={index} task={task} />
                ))}
              </Box>
            </Box>
            <Box paddingY={'2rem'}>
              <Box onClick={() => { setshowWeek(!showWeek) }} sx={{ color: 'black', marginBottom: '1rem', ":hover": { cursor: 'pointer' } }} width='100%' display={'flex'} borderRadius='.5rem' flexDirection={'row'} paddingX={'1rem'} paddingY='.5rem' bgcolor='grey.main'>
                {showWeek ? <ArrowDown2 /> : <ArrowRight2 />}
                <Typography>This Week</Typography>
              </Box>
              <Box display='flex' flexDirection={'row'} width='100%' flexWrap={'wrap'}>
                {showWeek && teamThisWeek.map((task, index) => (
                  <Task project={myContext.project} Mywork={true} rootUser={props.rootUser} key={index} task={task} />
                ))}
              </Box>
            </Box>
          </Box>
          ||
          <Box>
            <Box marginY={'2rem'} bgcolor={'grey.main'} width={'100%'} paddingX='5rem' height='12rem'>

            </Box>
            <Box marginY={'2rem'} bgcolor={'grey.main'} width={'100%'} paddingX='5rem' height='10rem'>

            </Box>
          </Box>
        }
      </Box>
    </Box>
  )
}

export default Workload
