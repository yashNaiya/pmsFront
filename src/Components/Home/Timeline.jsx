import { Box } from '@mui/material'
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

const Timeline = (props) => {
    const [tasks, settasks] = useState([])
    const locales = {
        "en-IN": require("date-fns/locale/en-IN"),
    };
    const [selected, setSelected] = useState();

    const handleSelected = (event) => {
        setSelected(event);
        console.info('[handleSelected - event]', event);
    };
    useEffect(() => {
        let tasksTemp = []
        if (props.groups) {
            // console.log(props.groups)
            props.groups.forEach(group => {
                if (group.tasks.length !== 0) {
                    group.tasks.forEach(task => {
                        // settasks([...tasks, task]);
                        tasksTemp.push(task)
                    });
                    
                }
            });
            // console.log(tasksTemp)
            settasks(tasksTemp)
        }
    }, [props])

    const localizer = dateFnsLocalizer({
        format,
        parse,
        startOfWeek,
        getDay,
        locales,
    });

    return (
        <Box flex={9} margin={'1rem'}>
            <Calendar
                eventPropGetter={(event) => {
                    let backgroundColor = ''
                    if (event.status === 'error') {
                        backgroundColor = '#FD8A8A'
                    } else if (event.status === 'complete') {
                        backgroundColor = '#B6E2A1'
                    } else if (event.status === 'on hold') {
                        backgroundColor = '#D9D9D9'
                    } else if (event.status === 'working') {
                        backgroundColor = '#FEBE8C'
                    }
                    return { style: { backgroundColor } }
                }}
                selected={selected}
                onSelectEvent={handleSelected}
                titleAccessor={"name"} localizer={localizer} events={tasks}
                startAccessor={(event) => { return new Date(event.start) }}
                endAccessor={(event) => { return new Date(event.due) }}
                style={{ height: 500, margin: "50px" }} />
        </Box>
    )
}

export default Timeline
